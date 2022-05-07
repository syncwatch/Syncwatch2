import { api_endpoints } from 'src/environments/environment';
import { db } from "./db";

async function getMovieStream(event: FetchEvent, url: URL): Promise<Response | undefined> {
    const movie_id = url.searchParams.get('id');
    if (movie_id === null) return;
    const movie = await db.movies.get(movie_id);
    if (movie === undefined || movie.downloaded_size! < movie.file_size!) return;

    const rangeRequest = event.request.headers.get('range') || '';
    const byteRanges = rangeRequest.match(/bytes=(?<from>[0-9]+)?-(?<to>[0-9]+)?/);
    const rangeFrom = (byteRanges && byteRanges.groups && byteRanges.groups['from']) ? Number(byteRanges.groups['from']) : 0;
    let rangeTo = (byteRanges && byteRanges.groups && byteRanges.groups['to']) ? Number(byteRanges.groups['to']) : rangeFrom + 10000000;

    let fragments = await db.movie_fragments.where('movie_id').equals(movie_id).sortBy('start');
    if (fragments.length === 0) return;

    let startI = 0;
    while (startI < fragments.length - 2) {
        if (fragments[startI + 1].start > rangeFrom) break;
        startI++;
    }

    let endI = startI;
    while (endI < fragments.length - 1) {
        if (fragments[endI].end >= rangeTo) break;
        endI++;
    }

    const responseStart = fragments[startI].start;
    const responseEnd = fragments[endI].end;

    fragments = fragments.splice(startI, endI - startI + 1);

    let i = 0;
    while (i < fragments.length - 2) {
        if (fragments[i].end !== fragments[i + 1].start) {
            await db.movies.update(movie_id, { corrupt: true });
            console.error('mismatched movie data');
            return;
        }
        i++;
    }

    const blob = new Blob(<ArrayBuffer[]>await db.buffers.bulkGet(fragments.map(v => v.data_id)), { type: movie.mime_type! });

    const responseOpts: any = {
        status: responseEnd < movie.file_size! ? 206 : 200,
        statusText: responseEnd < movie.file_size! ? 'Partial Content' : 'OK',
        headers: {
            'Accept-Ranges': 'bytes',
            'Content-Disposition': 'inline',
            'Content-Type': movie.mime_type,
            'Content-Length': responseEnd - responseStart,
        },
    };
    if (rangeRequest) {
        responseOpts.headers['Content-Range'] = `bytes ${responseStart}-${responseEnd - 1}/${movie.file_size!}`;
    }

    return new Response(
        blob.stream(),
        responseOpts,
    );
}

async function getThumbnail(event: FetchEvent, url: URL): Promise<Response | undefined> {
    const thumbnail_id = url.searchParams.get('id');
    if (thumbnail_id === null) return;
    const thumbnail = await db.thumbnails.get(thumbnail_id);
    if (thumbnail === undefined) return;
    const responseOpts: any = {
        status: 200,
        statusText: 'OK',
        headers: {
            'Content-Type': thumbnail.blob.type,
            'Content-Length': thumbnail.blob.size,
        },
    };
    return new Response(
        thumbnail.blob.stream(),
        responseOpts,
    );
}

const MAPPED_REQUESTS = {
    [api_endpoints.MOVIE_STREAM_URL]: getMovieStream,
    [api_endpoints.THUMBNAIL_URL]: getThumbnail,
};

addEventListener('fetch', (event: any) => {
    const url = new URL(event.request.url);
    if (url.pathname in MAPPED_REQUESTS) {
        const getResponse = async () => {
            const res = await MAPPED_REQUESTS[url.pathname](event, url);
            if (res) return res;
            return await fetch(event.request);
        };
        event.respondWith(getResponse());
    }
});

// Import angular serviceworker
importScripts('ngsw-worker.js');

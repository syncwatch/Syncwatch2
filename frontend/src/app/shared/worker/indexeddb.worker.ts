/// <reference lib="webworker" />

import { MovieMeta } from "../movie/movie-meta";
import { MovieFragment } from "../movie/movie-fragment";
import { Thumbnail } from "../movie/thumbnail";
import { db } from "./db";

async function putMovie(movie: MovieMeta): Promise<any> {
    return await db.movies.put(movie, movie.id);
}

async function putMovieFragment(fragment: MovieFragment): Promise<number> {
    const movieFragmentSlices = 2000000;
    if (fragment.data.byteLength < movieFragmentSlices) {
        const data_id = await db.buffers.put(fragment.data);
        return await db.movie_fragments.put({
            data_id: data_id,
            movie_id: fragment.movie_id,
            start: fragment.start,
            end: fragment.end,
        });
    }
    let put = 0;
    let currentOffset = 0;
    let remainingBytes = fragment.data.byteLength;
    while (remainingBytes > 0) {
        const slicedByteLength = Math.min(remainingBytes, movieFragmentSlices);
        const data_id = await db.buffers.put(fragment.data.slice(currentOffset, currentOffset + movieFragmentSlices));
        put += await db.movie_fragments.put({
            movie_id: fragment.movie_id,
            data_id: data_id,
            start: fragment.start + currentOffset,
            end: fragment.start + currentOffset + slicedByteLength,
        });
        currentOffset += slicedByteLength;
        remainingBytes -= slicedByteLength;
    }
    return put;
}

async function putThumbnail(thumbnail: Thumbnail): Promise<string> {
    return await db.thumbnails.put(thumbnail, thumbnail.id);
}

async function getMovies(): Promise<MovieMeta[]> {
    return await db.movies.toArray();
}

async function getMovie(id: string): Promise<MovieMeta | undefined> {
    return await db.movies.get(id);
}

async function deleteMovieAndFragments(movie_id: string): Promise<void> {
    for (let fragment of await (await db.movie_fragments.where("movie_id").equals(movie_id).sortBy('start')).reverse()) {
        await db.buffers.delete(fragment.data_id);
        await db.movie_fragments.delete(fragment.id!);
        await db.movies.update(movie_id, { downloaded_length: fragment.start });
    }
    await db.movies.delete(movie_id);
}

async function deleteThumbnail(thumbnail_id: string): Promise<void> {
    await db.thumbnails.delete(thumbnail_id);
}

const eventFunctions: { [K: string]: Function } = {
    'putMovie': putMovie,
    'getMovies': getMovies,
    'getMovie': getMovie,
    'putMovieFragment': putMovieFragment,
    'putThumbnail': putThumbnail,
    'deleteMovieAndFragments': deleteMovieAndFragments,
    'deleteThumbnail': deleteThumbnail,
};

addEventListener('message', async ({ data }) => {
    if (!data || data.counter === undefined || data.event === undefined || !eventFunctions[data.event]) {
        console.log(data);
        console.error('message has no counter or event invalid');
        return;
    }

    try {
        postMessage({ counter: data.counter, data: await eventFunctions[data.event](data.data) });
    } catch (e: any) {
        if (e instanceof Error) {
            postMessage({ counter: data.counter, error: e.message });
        } else {
            postMessage({ counter: data.counter, error: 'unknown error' });
        }
    }
});

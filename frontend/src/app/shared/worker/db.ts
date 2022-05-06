import Dexie, { Table } from 'dexie';
import { Movie } from '../movie/movie';
import { MovieFragmentIndex } from '../movie/movie-fragment';
import { Thumbnail } from '../movie/thumbnail';

export class AppDB extends Dexie {
    buffers!: Table<ArrayBuffer, number>;
    movies!: Table<Movie, string>;
    movie_fragments!: Table<MovieFragmentIndex, number>;
    thumbnails!: Table<Thumbnail, string>;

    constructor() {
        super('syncwatch');
        this.version(1).stores({
            buffers: '++id',
            movies: 'id',
            movie_fragments: '++id, movie_id, data_id',
            thumbnails: 'id',
        });
    }
}

export const db = new AppDB();

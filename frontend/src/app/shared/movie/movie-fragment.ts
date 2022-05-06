export interface MovieFragment {
    id?: number;
    movie_id: string;
    data: ArrayBuffer;
    start: number;
    end: number;
}

export interface MovieFragmentIndex {
    id?: number;
    movie_id: string;
    data_id: number;
    start: number;
    end: number;
}

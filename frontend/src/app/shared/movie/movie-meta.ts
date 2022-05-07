import { MovieInfo } from "./movie-info";

export interface MovieMeta {
    id: string;
    hash: string | null;
    corrupt?: boolean;
    downloaded_size?: number;
    title: string;
    mime_type: string | null;
    file_size: number | null;
    thumbnail_id: string | null;
    series_id: string | null;
    season_id: string | null;
    episode_id: string | null;
    sw_type: string;
    info: MovieInfo | null;
}

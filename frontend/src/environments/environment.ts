const API_BASE_URL = '/fap';

export const api_endpoints = {
    BASE_URL: API_BASE_URL,
    LOGIN_URL: `${API_BASE_URL}/login`,
    LOGOUT_URL: `${API_BASE_URL}/logout`,
    SESSIONS_URL: `${API_BASE_URL}/sessions`,
    DELETE_SESSIONS_URL: `${API_BASE_URL}/delete-sessions`,
    THUMBNAIL_URL: `${API_BASE_URL}/thumbnail`,
    MOVIE_URL: `${API_BASE_URL}/movie`,
    MOVIES_URL: `${API_BASE_URL}/movies`,
    MOVIE_STREAM_URL: `${API_BASE_URL}/stream`,
    MOVIE_SUBTITLE_URL: `${API_BASE_URL}/subtitle`,
};

export const environment = {
    production: false,
    mock_http: false,
    deactivate_auth_guard: false,
    router_use_hash: false,
};

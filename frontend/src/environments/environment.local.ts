const API_BASE_URL = 'about:now';

export const api_endpoints = {
    BASE_URL: API_BASE_URL,
    LOGIN_URL: `${API_BASE_URL}/login`,
    LOGOUT_URL: `${API_BASE_URL}/logout`,
    SESSIONS_URL: `${API_BASE_URL}/sessions`,
    DELETE_SESSIONS_URL: `${API_BASE_URL}/delete-sessions`,
    THUMBNAIL_URL: `https://static.wikia.nocookie.net/overgeared/images/e/ea/GridWebtoon2020.png`,
    MOVIE_URL: `${API_BASE_URL}/movie`,
    MOVIES_URL: `${API_BASE_URL}/movies`,
    MOVIE_STREAM_URL: `https://dl8.webmfiles.org/big-buck-bunny_trailer.webm`,
};

export const environment = {
    production: false,
    mock_http: true,
    deactivate_auth_guard: true,
    router_use_hash: true,
};

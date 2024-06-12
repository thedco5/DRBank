const API_BASE_URL = 'http://localhost:8080';

const API_ROUTES = {
    USER_CREATE: `${API_BASE_URL}/user/create`,
    USER_AUTH: `${API_BASE_URL}/user/auth`,
    TEST: `${API_BASE_URL}/test`,
    TRANSFER_CREATE: `${API_BASE_URL}/transfer/create`
};

export { API_ROUTES };
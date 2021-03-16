export function storeToken(param) {
    localStorage.setItem('token', param);
}

export function getToken() {
    const token = localStorage.getItem('token');
    return token;
}

export function clearToken() {
    localStorage.removeItem('token');
}
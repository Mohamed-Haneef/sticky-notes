export const api = (endpoint, method = 'GET', body) => {
    const token = localStorage.getItem('token');
    return fetch(endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
    }).then(response => response.json());
};
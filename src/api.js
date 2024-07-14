const url = 'https://notezard.selfmade.social';
export const api = async (endpoint, method = 'GET', body) => {
    const token = localStorage.getItem('token');
    const response = await fetch(url + endpoint, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
        const errorText = await response.text();
        return errorText;
    }

    try {
        return await response.json();
    } catch (error) {
        return null;
    }
};
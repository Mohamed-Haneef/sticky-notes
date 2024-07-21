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
        try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.token_failure) {
                localStorage.removeItem('token');
            }
        } catch (error) {
            return { error: errorText };
        }

        return { error: errorText };
    }

    try {
        const responseMsg = await response.json();
        return { success: responseMsg };
    } catch (error) {
        return null;
    }
};

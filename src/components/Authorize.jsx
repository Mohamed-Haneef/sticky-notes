import React from 'react';
import { api } from './../api'

const Authorize = async ({ setToken }) => {
    const verification = await api('/api/verification');
    if (!verification.ok) {
        setToken('token', null)
    }
}

export default Authorize;
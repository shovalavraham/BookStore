import environments from "../environments/environments";

export const adminSignup = async (token, data) => {
    const response = await fetch(`${environments.API_URL}/admins/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if(response.status !== 201) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};

export const adminLogin = async (data) => {
    const response = await fetch(`${environments.API_URL}/admins/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if(!response.status) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};

export const adminLogout = async (token) => {
    const response = await fetch(`${environments.API_URL}/admins/logout`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if(response.status !== 200) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};
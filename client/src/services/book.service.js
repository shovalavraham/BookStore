import environments from "../environments/environments";

export const getAllBooks = async () => {
    const response = await fetch(`${environments.API_URL}/books`);

    if(!response.status) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};

export const getBookByID = async (id) => {
    const response = await fetch(`${environments.API_URL}/books/${id}`);
    
    if(!response.status) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};

export const createBook = async (token, data) => {
    const response = await fetch(`${environments.API_URL}/books/new`, {
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

export const updateBook = async (token, data) => {
    const response = await fetch(`${environments.API_URL}/books/${data._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if(response.status !== 202) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};

export const deleteBook = async (token, id) => {
    const response = await fetch(`${environments.API_URL}/books/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    
    if(!response.status) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};
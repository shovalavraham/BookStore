import environments from "../environments/environments";

export const getCart = async (token) => {
    const response = await fetch(`${environments.API_URL}/cart`, {
        headers : {
            'Authorization': `Bearer ${token}`, 
        },
    });

    if(!response.status) {
        throw new Error();
    }
    const responseObj = await response.json();

    return responseObj;
};

export const updateCart = async (token, bookID) => {
    const response = await fetch(`${environments.API_URL}/cart`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            'bookID': bookID
        }),
   });
    
   if(response.status !== 202) {
        throw new Error();
   }

   const responseObj = await response.json();

    return responseObj;
};

export const addBookToCart = async (token, bookID, quantity) => {
    const response = await fetch(`${environments.API_URL}/cart/add-to-cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            'bookID': bookID,
            'quantity': quantity,
        }),
    });

    if(!response.status) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};

export const checkout = async (token) => {
    const response = await fetch(`${environments.API_URL}/cart/checkout`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });

    if(response.status !== 202) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};

export const updateQuantity = async (token, bookID, quantity) => {
    const response = await fetch(`${environments.API_URL}/cart/update-quantity`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            bookID: bookID,
            quantity: quantity,
        }),
    });

    if(response.status !== 202) {
        throw new Error();
    }

    const responseObj = await response.json();

    return responseObj;
};
const cartActionTypes = {
    INIT_CART: 'INIT_CART',
    UPDATE_CART: 'UPDATE_CART',
    CHECKOUT_CART: 'CHECKOUT_CART',
    UPDATE_PRICE: 'UPDATE_PRICE',
};

export const initCartAction = (cart) => {
    const action = {
        type: cartActionTypes.INIT_CART,
        payload: {
            cart,
        }
    };

    return action;
};

export const updateCartAction = (cart, price, bookPrice , bookQuantity) => {
    const action = {
        type: cartActionTypes.UPDATE_CART,
        payload: {
            cart,
            price,
            bookPrice,
            bookQuantity,
        }
    };

    return action;
};

export const checkoutCartAction = (cart) => {
    const action = {
        type: cartActionTypes.CHECKOUT_CART,
        payload: {
            cart,
        }
    };

    return action;
};

export const updatePriceAction = (cart, bookID, quantity, sign) => {
    const action = {
        type: cartActionTypes.UPDATE_PRICE,
        payload: {
            cart,
            bookID,
            quantity,
            sign,
        }
    };

    return action;
};

export default cartActionTypes;
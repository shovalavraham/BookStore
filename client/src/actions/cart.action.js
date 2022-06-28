const cartActionTypes = {
    INIT_CART: 'INIT_CART',
    UPDATE_CART: 'UPDATE_CART',
    CHECKOUT_CART: 'CHECKOUT_CART',
    UPDATE_PRICE: 'UPDATE_PRICE',
};

export const initCart = (cart) => {
    const action = {
        type: cartActionTypes.INIT_CART,
        payload: {
            cart: cart,
        }
    };

    return action;
};

export const updateCart = (cart, price, bookPrice , bookQuantity) => {
    const action = {
        type: cartActionTypes.UPDATE_CART,
        payload: {
            cart: cart,
            price: price,
            bookPrice: bookPrice,
            bookQuantity: bookQuantity,
        }
    };

    return action;
};

export const checkoutCart = (cart) => {
    const action = {
        type: cartActionTypes.CHECKOUT_CART,
        payload: {
            cart: cart,
        }
    };

    return action;
};

export const updatePrice = (cart, bookID, quantity, sign) => {
    const action = {
        type: cartActionTypes.UPDATE_PRICE,
        payload: {
            cart: cart,
            bookID: bookID,
            quantity: quantity,
            sign: sign,
        }
    };

    return action;
};

export default cartActionTypes;
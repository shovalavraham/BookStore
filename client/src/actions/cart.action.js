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

export const updateCart = (cart, price, bookPrice) => {
    const action = {
        type: cartActionTypes.UPDATE_CART,
        payload: {
            cart: cart,
            price: price,
            bookPrice: bookPrice,
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

export const updatePrice = (cart, bookPrice, sign) => {
    const action = {
        type: cartActionTypes.UPDATE_PRICE,
        payload: {
            cart: cart,
            bookPrice: bookPrice,
            sign: sign,
        }
    };

    return action;
};

export default cartActionTypes;
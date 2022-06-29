const bookActionTypes  = {
    LOAD_BOOK: 'LOAD_BOOK',
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_AUTHOR: 'UPDATE_AUTHOR',
    UPDATE_BOOK_COVER: 'UPDATE_BOOK_COVER',
    UPDATE_DESCRIPTION: 'UPDATE_DESCRIPTION',
    UPDATE_PAGE: 'UPDATE_PAGE',
    UPDATE_PRICE: 'UPDATE_PRICE',
    RESET_BOOK: 'RESET_BOOK',
};

export const loadBookAction = (value) => {
    const action = {
        type: bookActionTypes.LOAD_BOOK,
        payload: {
            value: value,
        },
    };

    return action;
};

export const updateAction = (type, value, isValid, message) => {
    const action = {
        type: type,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        },
    };

    return action;
};

export const resetBookAction = () => {
    const action = {
        type: bookActionTypes.RESET_BOOK,
        payload: {},
    };

    return action;
};

export default bookActionTypes;
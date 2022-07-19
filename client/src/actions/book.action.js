const bookActionTypes  = {
    LOAD_BOOK: 'LOAD_BOOK',
    UPDATE_FORM_FIELD: 'UPDATE_FORM_FIELD',
    RESET_BOOK: 'RESET_BOOK',
};

export const loadBookAction = (value) => {
    const action = {
        type: bookActionTypes.LOAD_BOOK,
        payload: {
            value,
        },
    };

    return action;
};

export const updateAction = (value, isValid, message, field) => {
    const action = {
        type: bookActionTypes.UPDATE_FORM_FIELD,
        payload: {
            value,
            isValid,
            message,
            field
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
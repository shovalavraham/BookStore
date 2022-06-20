const signupActionTypes  = {
    UPDATE_FIRSTNAME: 'UPDATE_FIRSTNAME',
    UPDATE_LASTNAME: 'UPDATE_LASTNAME',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_REPEAT_PASSWORD: 'UPDATE_REPEAT_PASSWORD',
};

export const updateFirstname = (value, isValid, message) => {
    const action = {
        type: signupActionTypes.UPDATE_FIRSTNAME,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        },
    };

    return action;
};

export const updateLastname = (value, isValid, message) => {
    const action = {
        type: signupActionTypes.UPDATE_LASTNAME,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        },
    };

    return action;
};

export const updateEmail = (value, isValid, message) => {
    const action = {
        type: signupActionTypes.UPDATE_EMAIL,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        },
    };

    return action;
};

export const updatePassword = (value, isValid, message) => {
    const action = {
        type: signupActionTypes.UPDATE_PASSWORD,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        },
    };

    return action;
};

export const updateRepeatPassword = (value, isValid, message) => {
    const action = {
        type: signupActionTypes.UPDATE_REPEAT_PASSWORD,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        },
    };

    return action;
};

export default signupActionTypes;
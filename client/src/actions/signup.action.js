const signupActionTypes  = {
    UPDATE_FIRSTNAME: 'UPDATE_FIRSTNAME',
    UPDATE_LASTNAME: 'UPDATE_LASTNAME',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
    UPDATE_REPEAT_PASSWORD: 'UPDATE_REPEAT_PASSWORD',
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

export default signupActionTypes;
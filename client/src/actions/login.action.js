const loginActionTypes = {
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
};

export const updateAction = (type, value, isValid, message) => {
    const action = {
        type: type,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        }
    };

    return action;
};

export default loginActionTypes;
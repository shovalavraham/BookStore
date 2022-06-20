const loginActionTypes = {
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_PASSWORD: 'UPDATE_PASSWORD',
};

export const updateEmail = (value, isValid, message) => {
    const action = {
        type: loginActionTypes.UPDATE_EMAIL,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        }
    };

    return action;
};

export const updatePassword = (value, isValid, message) => {
    const action = {
        type: loginActionTypes.UPDATE_PASSWORD,
        payload: {
            value: value,
            isValid: isValid,
            message: message,
        }
    };

    return action;
}

export default loginActionTypes;
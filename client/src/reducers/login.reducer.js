import loginActionTypes from "../actions/login.action";

export const LOGIN_STATE_INIT = {
    values: {
        email: '',
        password: '',
    },
    validities: {
        email: true,
        password: true,
    },
    messages: {
        email: '',
        password: '',
    },
};

const loginReducer = (state, action) => {
    let key = '';

    switch (action.type) {
        case loginActionTypes.UPDATE_EMAIL: {
            key = 'email';
            break;
        }
        case loginActionTypes.UPDATE_PASSWORD: {
            key = 'password';
            break;
        }
        default:
            return state;
    }

    const updatedValues = {...state.values, [key]: action.payload.value};
    const updatedValiditeis = {...state.validities, [key]: action.payload.isValid};
    const updatedMessages = {...state.messages, [key]: action.payload.message};

    const updatedState = {
        values: updatedValues,
        validities: updatedValiditeis,
        messages: updatedMessages,
    }

    return updatedState;
};

export default loginReducer;
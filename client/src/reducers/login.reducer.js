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
    switch (action.type) {
        case loginActionTypes.UPDATE_EMAIL: {
            const updatedValues = {...state.values, email: action.payload.value};
            const updatedValiditeis = {...state.validities, email: action.payload.isValid};
            const updatedMessages = {...state.messages, email: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }

            return updatedState;
        }
        case loginActionTypes.UPDATE_PASSWORD: {
            const updatedValues = {...state.values, password: action.payload.value};
            const updatedValiditeis = {...state.validities, password: action.payload.isValid};
            const updatedMessages = {...state.messages, password: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }

            return updatedState;
        }
        default:
            return state;
    }
};

export default loginReducer;
import signupActionTypes from "../actions/signup.action";

export const SIGNUP_STATE_INIT = {
    values: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
    },
    validities: {
        firstname: true,
        lastname: true,
        email: true,
        password: true,
        repeatPassword: true,
    },
    messages: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
    },
};

const signupReducer = (state, action) => {
    switch (action.type) {
        case signupActionTypes.UPDATE_FIRSTNAME: {
            const updatedValues = {...state.values, firstname: action.payload.value};
            const updatedValiditeis = {...state.validities, firstname: action.payload.isValid};
            const updatedMessages = {...state.messages, firstname: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }
            
            return updatedState;
        }
        case signupActionTypes.UPDATE_LASTNAME: {
            const updatedValues = {...state.values, lastname: action.payload.value};
            const updatedValiditeis = {...state.validities, lastname: action.payload.isValid};
            const updatedMessages = {...state.messages, lastname: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }

            return updatedState;
        }
        case signupActionTypes.UPDATE_EMAIL: {
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
        case signupActionTypes.UPDATE_PASSWORD: {
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
        case signupActionTypes.UPDATE_REPEAT_PASSWORD: {
            const updatedValues = {...state.values, repeatPassword: action.payload.value};
            const updatedValiditeis = {...state.validities, repeatPassword: action.payload.isValid};
            const updatedMessages = {...state.messages, repeatPassword: action.payload.message};

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

export default signupReducer;
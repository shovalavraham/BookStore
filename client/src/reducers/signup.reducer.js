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
    let key = '';
    
    switch (action.type) {
        case signupActionTypes.UPDATE_FIRSTNAME: {
            key = 'firstname';
            break;
        }
        case signupActionTypes.UPDATE_LASTNAME: {
            key = 'lastname';
            break;
        }
        case signupActionTypes.UPDATE_EMAIL: {
            key = 'email';
            break;
        }
        case signupActionTypes.UPDATE_PASSWORD: {
            key = 'password';
            break;
        }
        case signupActionTypes.UPDATE_REPEAT_PASSWORD: {
            key = 'repeatPassword';
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

export default signupReducer;
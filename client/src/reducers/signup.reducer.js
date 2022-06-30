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
        case signupActionTypes.UPDATE_FORM_FIELD: {
            const {field} = action.payload;
            
            const updatedValues = {...state.values, [field]: action.payload.value};
            const updatedValiditeis = {...state.validities, [field]: action.payload.isValid};
            const updatedMessages = {...state.messages, [field]: action.payload.message};
            
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
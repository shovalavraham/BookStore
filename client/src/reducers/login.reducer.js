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
        case loginActionTypes.UPDATE_FORM_FIELD: {
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

export default loginReducer;
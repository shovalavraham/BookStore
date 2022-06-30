import bookActionTypes from "../actions/book.action";

export const BOOK_STATE_INIT = {
    values: {
        title: '',
        author: '',
        bookCover: '',
        description: '',
        pages: 1,
        price: 0,
    },
    validities: {
        title: true,
        author: true,
        bookCover: true,
        description: true,
        pages: true,
        price: true,
    },
    messages: {
        title: '',
        author: '',
        bookCover: '',
        description: '',
        pages: '',
        price: '',
    },
};

const bookReducer = (state, action) => {
    switch (action.type) {
        case bookActionTypes.LOAD_BOOK: {
            
            const updatedState = {
                values: action.payload.value,
                validities: state.validities,
                messages: state.messages,
            }
            
            return updatedState;
        }
        case bookActionTypes.UPDATE_FORM_FIELD: {
            const {value, isValid, message, field} = action.payload;

            const updatedValues = {...state.values, [field]: value};
            const updatedValiditeis = {...state.validities, [field]: isValid};
            const updatedMessages = {...state.messages, [field]: message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }
            
            return updatedState;
        }
        case bookActionTypes.RESET_BOOK: {
            return BOOK_STATE_INIT;
        } 
        default:
            return state;
    }
};

export default bookReducer;
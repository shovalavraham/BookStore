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
        case bookActionTypes.UPDATE_TITLE: {
            const updatedValues = {...state.values, title: action.payload.value};
            const updatedValiditeis = {...state.validities, title: action.payload.isValid};
            const updatedMessages = {...state.messages, title: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }
            
            return updatedState;
        }
        case bookActionTypes.UPDATE_AUTHOR: {
            const updatedValues = {...state.values, author: action.payload.value};
            const updatedValiditeis = {...state.validities, author: action.payload.isValid};
            const updatedMessages = {...state.messages, author: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }
            
            return updatedState;
        }
        case bookActionTypes.UPDATE_BOOK_COVER: {
            const updatedValues = {...state.values, bookCover: action.payload.value};
            const updatedValiditeis = {...state.validities, bookCover: action.payload.isValid};
            const updatedMessages = {...state.messages, bookCover: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }
            
            return updatedState;
        }
        case bookActionTypes.UPDATE_DESCRIPTION: {
            const updatedValues = {...state.values, description: action.payload.value};
            const updatedValiditeis = {...state.validities, description: action.payload.isValid};
            const updatedMessages = {...state.messages, description: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }
            
            return updatedState;
        }
        case bookActionTypes.UPDATE_PAGE: {
            const updatedValues = {...state.values, pages: action.payload.value};
            const updatedValiditeis = {...state.validities, pages: action.payload.isValid};
            const updatedMessages = {...state.messages, pages: action.payload.message};

            const updatedState = {
                values: updatedValues,
                validities: updatedValiditeis,
                messages: updatedMessages,
            }
            
            return updatedState;
        }
        case bookActionTypes.UPDATE_PRICE: {
            const updatedValues = {...state.values, price: action.payload.value};
            const updatedValiditeis = {...state.validities, price: action.payload.isValid};
            const updatedMessages = {...state.messages, price: action.payload.message};

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
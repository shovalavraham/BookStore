import booksActionTypes from "../actions/books.action";

export const BOOKS_INITIAL_STATE = {
    books: [],
};

const booksReducer = (state, action) => {
    switch (action.type) {
        case booksActionTypes.INIT_BOOKS: {
            const updatedState = action.payload;
            
            return updatedState;
        }
        default:
            return state;
    }
};

export default booksReducer;
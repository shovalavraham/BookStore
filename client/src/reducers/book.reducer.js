import bookActionTypes from "../actions/book.action";

export const BOOK_INITIAL_STATE = {
    title: '',
    author: '',
    bookCover: '',
    description: '',
    pages: 0,
    price: 0,
};

const bookReducer = (state, action) => {
    switch (action.type) {
        case bookActionTypes.INIT_BOOK: {
            const updatedState = action.payload;

            return updatedState;
        }
        default:
            return state;
    }
};

export default bookReducer;
const booksActionTypes = {
    INIT_BOOKS: 'INIT_BOOKS',
};

export const initBooks = (books) => {
    const action = {
        type: booksActionTypes.INIT_BOOKS,
        payload: {
            books: books,
        },
    };

    return action;
};

export default booksActionTypes;
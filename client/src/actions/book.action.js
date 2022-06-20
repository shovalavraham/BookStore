const bookActionTypes = {
    INIT_BOOK: 'INIT_BOOK',
};

export const initBook = (book) => {
    const action = {
        type: bookActionTypes.INIT_BOOK,
        payload: book,
    };

    return action;
}

export default bookActionTypes;
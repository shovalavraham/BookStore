import Book from "../models/book.model.js";

export const getBookByID = async (req, res ,next) => {
    const bookID = req.params.bookID;

    try {
        const book = await Book.findById(bookID);

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: book,
            message: "",
        });

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};

export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: books,
            message: "",
        });

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};

export const createBook = async (req, res, next) => {
    const data = req.body;
    const book = new Book(data);

    try {
        await book.save();

        res.status(201).send({
            status: 201,
            statusText: 'Created',
            data: book,
            message: "Book was created successfully",
        });
    } catch (error) {
        error.status = 400;
        error.statusText = 'Bad request';
        error.message = '';
        next(error);
    }
};

export const updateBook = async (req, res, next) => {
    const bookID = req.params.bookID;
    const data = req.body;

    try {
        await Book.findByIdAndUpdate(bookID, {...data});

        res.status(202).send({
            status: 202,
            statusText: 'Accepted',
            data: {},
            message: 'Book was updated successfully',
        });

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    const bookID = req.params.bookID;

    try {
        await Book.findByIdAndDelete(bookID);

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: {},
            message: 'Book was deleted successfully',
        });

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};
import Book from "../models/book.model.js";

export const getBookByID = async (req, res) => {
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
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: books,
            message: "",
        });

    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: "Internal Server Error",
            message: "",
        });
    }
};

export const createBook = async (req, res) => {
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
        res.status(400).send({
            status: 400,
            statusText: 'Bad request',
            message: '',
        })
    }
};

export const updateBook = async (req, res) => {
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
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: '',
        });
    }
};
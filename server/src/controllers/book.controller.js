import Book from "../models/book.model.js";
import { SuccessResponse } from '../models/response.model.js';

export const getBookByID = async (req, res ,next) => {
    const bookID = req.params.bookID;

    try {
        const book = await Book.findById(bookID);

        res.status(200).send(new SuccessResponse(200, 'Ok', "", book));

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

        res.status(200).send(new SuccessResponse(200, 'Ok', "", books));

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
        if(!book) throw new Error();
        await book.save();

        res.status(201).send(new SuccessResponse(200, 'Created', "Book was created successfully", book));

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
        if(!bookID || !data) throw new Error();
        
        await Book.findByIdAndUpdate(bookID, data);

        res.status(202).send(new SuccessResponse(200, 'Accepted', "Book was updated successfully", {}));

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

        res.status(200).send(new SuccessResponse(200, 'Ok', "Book was deleted successfully", {}));

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};
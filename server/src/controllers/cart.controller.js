import Cart from "../models/cart.model.js";
import { SuccessResponse } from '../models/response.model.js';

export const getCart = async (req, res, next) => {
    const userID = req.user._id;

    try {
        const cart = await Cart.findOne({ownerID: userID});
        if (!cart) throw new Error();

        await cart.populate('books.bookID');

        res.status(200).send(new SuccessResponse(200, 'Ok', "", cart));

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    const bookID = req.body.bookID;
    const userID = req.user._id;

    try {
        const cart = await Cart.findOne({ownerID: userID});
        const bookObj = cart.books.find(book => book.bookID.toString() === bookID);
        cart.books = cart.books.filter(bookDoc => bookDoc._id !== bookObj._id);

        await cart.populate('books.bookID');

        await cart.save();

        res.status(202).send(new SuccessResponse(202, 'Accepted', "Cart was update successfully", cart));
        
    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};

export const addBookToCart = async (req, res, next) => {
    const {bookID, quantity} = req.body;
    const user = req.user;
    
    try {
        const cart = await Cart.findOne({ownerID: user._id});
        cart.books.push({bookID: bookID, quantity: quantity});

        await cart.populate('books.bookID');

        await cart.save();

        res.status(200).send(new SuccessResponse(200, 'Ok', "Book added", cart));
        
    } catch (error) {
        error.status = 400;
        error.statusText = 'Bad request';
        error.message = '';
        next(error);
    }
};

export const buyCart = async (req, res, next) => {
    const userID = req.user._id;

    try {
        const cart = await Cart.findOne({ownerID: userID});
        cart.books = [];
        await cart.save();

        res.status(202).send(new SuccessResponse(200, 'Accepted', "The purchase was made successfully", cart));

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};

export const updateQuantity = async (req, res, next) => {
    const userID = req.user._id;
    const {bookID, quantity} = req.body;

    try {
        const cart = await Cart.findOne({ownerID: userID});
        const book = cart.books.find(book => book.bookID.toString() === bookID);
        book.quantity = quantity;

        await cart.save();

        res.status(202).send(new SuccessResponse(200, 'Accepted', "Book quantity was update successfully", cart));

    } catch (error) {
        error.status = 500;
        error.statusText = 'Internal Server Error';
        error.message = '';
        next(error);
    }
};
import Cart from "../models/cart.model.js";
import Book from "../models/book.model.js";

export const getCart = async (req, res) => {
    const userID = req.user._id;

    try {
        const cart = await Cart.findOne({ownerID: userID});
        if (!cart) throw new Error();

        await cart.populate('books.bookID');

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: cart,
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

export const updateCart = async (req, res) => {
    const bookID = req.body.bookID;
    const userID = req.user._id;

    try {
        const cart = await Cart.findOne({ownerID: userID});
        const bookObj = cart.books.find(book => book.bookID.toString() === bookID);
        cart.books = cart.books.filter(bookDoc => bookDoc._id !== bookObj._id);

        await cart.populate('books.bookID');

        await cart.save();

        res.status(202).send({
            status: 202,
            statusText: "Accepted",
            data: cart,
            message: "Cart was update successfully",
        });
        
    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: "",
        });
    }
};

export const addBookToCart = async (req, res) => {
    const bookID = req.body.bookID;
    const user = req.user;
    
    try {
        const cart = await Cart.findOne({ownerID: user._id});
        cart.books.push({bookID: bookID});

        await cart.populate('books.bookID');

        await cart.save();

        res.status(200).send({
            status: 200,
            statusText: 'Ok',
            data: cart,
            message: 'Book added',
        })
        
    } catch (error) {
        res.status(400).send({
            status: 400,
            statusText: 'Bad request',
            message: "",
        })
    }
};

export const buyCart = async (req, res) => {
    const userID = req.user._id;

    try {
        const cart = await Cart.findOne({ownerID: userID});
        cart.books = [];
        await cart.save();

        res.status(202).send({
            status: 202,
            statusText: "Accepted",
            data: cart,
            message: "The purchase was made successfully",
        });

    } catch (error) {
        res.status(500).send({
            status: 500,
            statusText: 'Internal Server Error',
            message: "",
        });
    }
};
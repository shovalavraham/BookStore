import mongoose from "mongoose";
import isURL from "validator/lib/isurl.js";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: 1,
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        minlength: 1,
    },
    bookCover: {
        type: String,
        required: [true, 'BookCover is required'],
        validate(value){
            if (!isURL(value)) {
                throw new Error('URL is invalid');
            }
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: 1,
    },
    pages: {
        type: Number,
        required: [true, 'Pages is required'],
        min: 1,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0,
    },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
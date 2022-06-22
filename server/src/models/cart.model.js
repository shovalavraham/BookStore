import mongoose from "mongoose";
import Book from "./book.model.js";

const cartSchema = new mongoose.Schema({
    ownerID: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    books: [
        {
            bookID: {
                type: mongoose.SchemaTypes.ObjectId,
                required: true,
                ref: Book,
            },
            quantity: {
                type: Number,
                required: true,
                trim: true,
                min: 1,
                max: 10,
            }
        }
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
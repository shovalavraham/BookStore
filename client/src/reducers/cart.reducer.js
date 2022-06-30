import cartActionTypes from "../actions/cart.action";

export const CART_INITIAL_STATE = {
    books: [],
    price: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case cartActionTypes.INIT_CART:  {
            const cart = action.payload.cart;
            let price = 0;
            
            cart.books.map((book) => {
                price += book.bookID.price * book.quantity;
            });

            const updatedState = {
                books: cart.books,
                price: price.toFixed(2),
            };

            return updatedState;
        }
        case cartActionTypes.UPDATE_CART: {
            const {cart, bookPrice, bookQuantity} = action.payload;
            
            const price = action.payload.price - (bookPrice * bookQuantity);

            const updatedState = {
                books: cart.books,
                price: price.toFixed(2),
            };

            return updatedState;
        }
        case cartActionTypes.CHECKOUT_CART: {
            const cart = action.payload.cart;

            const updatedState = {
                books: cart.books,
                price: 0,
            };

            return updatedState;
        }
        case cartActionTypes.UPDATE_PRICE: {
            const {cart, bookID, quantity, sign} = action.payload;
  
            const book = cart.books.find(book => book.bookID._id === bookID);
            const bookPrice = book.bookID.price;

            let price = +cart.price;

            if(sign === '+') {
                price += bookPrice;
            }
            else {
                price -= bookPrice;
            }

            book.quantity = quantity;
        
            const updatedState = {
                books: cart.books,
                price: price.toFixed(2),
            };

            return updatedState;
        }
        default:
            return state;
    }
};

export default cartReducer;
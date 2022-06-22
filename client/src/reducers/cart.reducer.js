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
            const cart = action.payload.cart;
            const price = action.payload.price - action.payload.bookPrice;

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
            const cart = action.payload.cart;
            const bookPrice = action.payload.bookPrice;
            const sign = action.payload.sign;
            let price = +cart.price;

            if(sign === '+') {
                price += bookPrice;
            }
            else {
                price -= bookPrice;
            }
        
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
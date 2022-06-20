import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { initCart, updateCart } from "../../../actions/cart.action.js";
import { AuthContext } from "../../../contexts/Auth.context.js";
import { CartContext } from "../../../contexts/Cart.context.js";
import './cart-container.styles.css';

const CartContainer = () => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    useEffect(() => {
        const token = authContextValue.userToken;

        const getCart = async () => {
            try {
                const response = await fetch('http://localhost:3000/cart', {
                    method: 'GET',
                    headers : {
                        'Authorization': token, 
                    },
                });

                if(!response.status) {
                    throw new Error();
                }
                const responseObj = await response.json();
                const cart = responseObj.data;

                cartContextValue.dispatchCartState(initCart(cart));
                
            } catch (error) {
                alert("Something went wrong!");
            }
        };

        getCart();
        
    }, []);

    const handleRemove = async (event) => {
        const eventAttributes = event.target.attributes;
        const bookID = eventAttributes.getNamedItem('bookID').value;
        const bookPrice = eventAttributes.getNamedItem('bookPrice').value;
        const token = authContextValue.userToken;

        try {
           const response = await fetch('http://localhost:3000/cart', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    'bookID': bookID
                }),
           });
            
           if(response.status !== 202) {
                throw new Error();
           }

           const responseObj = await response.json();
           const cart = responseObj.data;

           const price = cartContextValue.cartState.price;
           cartContextValue.dispatchCartState(updateCart(cart, price, bookPrice));

        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className="cart-container">
            {cartContextValue.cartState.cart.books.map((book) => {
                return (
                    <div className="cart-book-container">
                        <div className="books-details">
                            <img src={book.bookID.bookCover} alt="book cover" width="90" height="120"/>

                            <div className="title-author">
                                <h2 className="cart-book-title">{book.bookID.title}</h2>
                                <h3 className="cart-book-author">{book.bookID.author}</h3>
                            </div>
                        </div>

                        <div className="price-remove">
                            <span className="cart-book-price">{`${book.bookID.price}$`}</span>
                            <button className="btn-design remove-btn" bookID={book.bookID._id} bookPrice={book.bookID.price} onClick={handleRemove}>Remove</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartContainer;
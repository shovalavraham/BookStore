import React from "react";
import { useEffect, useState, useContext } from "react";
import { initCart, updateCart } from "../../../actions/cart.action.js";
import Loader from "../../../components/shared/loader/Loader.component.jsx";
import { AuthContext } from "../../../contexts/Auth.context.js";
import { CartContext } from "../../../contexts/Cart.context.js";
import environments from '../../../environments/environments.js'
import QuantityBtn from "../../../components/quantity-btn/QuantityBtn.component";
import BookDetails from "./book-details/BookDetails.component.jsx";
import './cart-container.styles.css';

const CartContainer = () => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = authContextValue.userToken;

        const getCart = async () => {
            try {
                const response = await fetch(`${environments.API_URL}/cart`, {
                    headers : {
                        'Authorization': `Bearer ${token}`, 
                    },
                });

                if(!response.status) {
                    throw new Error();
                }
                const responseObj = await response.json();
                const cart = responseObj.data;

                cartContextValue.dispatchCartState(initCart(cart));
                
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
                
            } catch (error) {
                alert("Something went wrong!");
            }
        };

        getCart();
        
    }, []);

    const handleRemove = async (event) => {
        const eventAttributes = event.target.attributes;
        const bookID = eventAttributes.getNamedItem('bookid').value;
        const bookPrice = eventAttributes.getNamedItem('bookprice').value;
        const bookQuantity = eventAttributes.getNamedItem('quantity').value;
        const token = authContextValue.userToken;

        try {
           const response = await fetch(`${environments.API_URL}/cart`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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
           cartContextValue.dispatchCartState(updateCart(cart, price, bookPrice, bookQuantity));

        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const updateQuantity = async (bookID, quantity) => {
        const token = authContextValue.userToken;

        try {
            const response = await fetch(`${environments.API_URL}/cart/update-quantity`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    bookID: bookID,
                    quantity: quantity,
                }),
            });

            if(response.status !== 202) {
                throw new Error();
            }

        } catch (error) {
            alert("Something went wrong!");
        }
    }

    return isLoading ? (
        <Loader/>
    ) : (
        <div className="cart-container">
            {cartContextValue.cartState.books.map((book) => {
                return (
                    <div className="cart-book-container" key={book.bookID._id}>
                        <BookDetails id={book.bookID._id} title={book.bookID.title} author={book.bookID.author} bookCover={book.bookID.bookCover}/>

                        <div className="price-remove">
                            <div className="cart-book-price">{`${book.bookID.price}$`}</div>
                            <QuantityBtn value={book.quantity} bookID={book.bookID._id} updateQuantity={updateQuantity}/>
                            <button className="btn-design red-btn" bookid={book.bookID._id} bookprice={book.bookID.price} quantity={book.quantity} onClick={handleRemove}>Remove</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CartContainer;
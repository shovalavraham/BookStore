import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../../components/shared/loader/Loader.component";
import { AuthContext } from '../../contexts/Auth.context.js';
import { CartContext } from '../../contexts/Cart.context';
import './book-page.styles.css';
import environments from '../../environments/environments.js'
import { initCartAction } from "../../actions/cart.action";
import QuantityBtn from "../../components/quantity-btn/QuantityBtn.component";
import { LOADER_TIMEOUT } from '../../constants/constants.js';

const BookPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const [isLoading, setIsLoading] = useState(true);
    const [bookState, setBookState] = useState(null);
    const [quantityState, setQuantityState] = useState(1);

    const {id} = useParams();

    useEffect(() => {

        const getBook = async () => {
            try {
                const response = await fetch(`${environments.API_URL}/books/${id}`);
    
                if(!response.status) {
                    throw new Error();
                }
    
                const responseObj = await response.json();
                const book = responseObj.data;

                if(!book) {
                    throw new Error();
                }
    
                setBookState(book);
    
            } catch (error) {
                navigate('*');
            }
        };

        getBook();

        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);

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

                cartContextValue.dispatchCartState(initCartAction(cart));
                
            } catch (error) {
                alert("Something went wrong!");
            }
        };

        if(token) {
            getCart();
        }

    }, [cartContextValue.cartState]);

    const updateQuantity = async (token, bookID, quantity) => {

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

    const handleAddToCart = async () => {
        const token = authContextValue.userToken;

        if(!token) {
            alert("You need to login first!");
            return;
        }

        let updatedQuantity = quantityState;

        const cart = cartContextValue.cartState;
        const book = cart.books.find(book => book.bookID._id === id);

        if(book) {
            updatedQuantity += book.quantity;

            if(updatedQuantity > 10) {
                alert(`You can't have more then 10 copies!`);
                return;
            }

            updateQuantity(token, book.bookID._id, updatedQuantity);
            alert('Book was added successfully!');
            return;
        }
        
        try {
            const response = await fetch(`${environments.API_URL}/cart/add-to-cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    'bookID': id,
                    'quantity': updatedQuantity,
                }),
            });

            if(!response.status) {
                throw new Error();
            }

            alert('Book was added successfully!');

        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return isLoading ? (
            <Loader/>
    ) : (
        <main className="book-page">
            <div className="book-container">
                <img src={bookState.bookCover} alt='book cover' width="300" height="500"/>
                <div className="details">
                    <h1 className="book-title">{bookState.title}</h1>

                    <div className="author-pages">
                        <h2 className="book-author">{bookState.author}</h2>
                        <div className="book-pages">{`${bookState.pages} pages`}</div>
                    </div>

                    <div className="cart-price">
                        <div className="add-to-cart-container">
                            <QuantityBtn value={1} bookid={id} page={'book'} setQuantityState={setQuantityState}/>
                            <button className="btn-design add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>
                        </div>
        
                        <div  className="book-price">{`${bookState.price}$`}</div>
                    </div>

                    <p>{bookState.description}</p>
                </div>
            </div>
        </main>
    );
};

export default BookPage;
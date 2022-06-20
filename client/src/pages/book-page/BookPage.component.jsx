import React from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { initBook } from "../../actions/book.action";
import Loader from "../../components/shared/loader/Loader.component";
import bookReducer, { BOOK_INITIAL_STATE } from "../../reducers/book.reducer";
import { AuthContext } from '../../contexts/Auth.context.js';
import './book-page.styles.css';
import { useContext } from "react";

const BookPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);
    const [bookState, dispatchBookState] = useReducer(bookReducer, BOOK_INITIAL_STATE);

    const {id} = useParams();

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await fetch(`http://localhost:3000/books/${id}`, {
                    method: 'GET',
                });
    
                if(!response.status) {
                    throw new Error();
                }
    
                const responseObj = await response.json();
                const book = responseObj.data;

                if(!book) {
                    throw new Error();
                }
    
                dispatchBookState(initBook(book));
    
            } catch (error) {
                navigate('*');
            }
        };

        getBook();

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    const handleAddToCart = async () => {
        const token = authContextValue.userToken;

        if(!token) {
            alert("You need to login first!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/cart/add-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({
                    'bookID': id,
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
                    <h1>{bookState.title}</h1>

                    <div className="author-pages">
                        <h2 className="book-author">{bookState.author}</h2>
                        <div className="book-pages">{`${bookState.pages} pages`}</div>
                    </div>

                    <div className="cart-price">
                        <button className="btn-design add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>
                        <div  className="book-price">{`${bookState.price}$`}</div>
                    </div>

                    <p>{bookState.description}</p>
                </div>
            </div>
        </main>
    );
};

export default BookPage;
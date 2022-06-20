import React, { useEffect, useState, useReducer } from 'react';
import { initBooks } from '../../actions/books.action';
import BookCard from '../../components/book-card/BookCard.component';
import Loader from '../../components/shared/loader/Loader.component';
import booksReducer, { BOOKS_INITIAL_STATE } from '../../reducers/books.reducer';
import './home-page.styles.css';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [booksState, dispatchBooksState] = useReducer(booksReducer, BOOKS_INITIAL_STATE);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch('http://localhost:3000/books', {
                    method: 'GET',
                });

                if(!response.status) {
                    throw new Error();
                }

                const responseObj = await response.json();
                dispatchBooksState(initBooks(responseObj.data));
    
            } catch (error) {
                alert("Something went wrong!");
            }
        };

        getBooks();

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='home-page'>
            <div className='books-container'>
                {booksState.books.map((book) => {
                    return (
                        <BookCard title={book.title} author={book.author} bookCover={book.bookCover} id={book._id}/>
                    );
                })}
            </div>
        </main>
    );
};

export default HomePage;
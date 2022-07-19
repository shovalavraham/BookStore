import React, { useEffect, useState } from 'react';
import BookCard from '../../components/book-card/BookCard.component';
import Loader from '../../components/shared/loader/Loader.component';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './home-page.styles.css';
import { getAllBooks } from '../../services/book.service';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [booksState, setBooksState] = useState(null);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await getAllBooks();
                setBooksState(response.data);

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
    
            } catch (error) {
                alert("Something went wrong!");
            }
        };   

        getBooks();

    }, []);

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='home-page'>
            <div className='home-page-container'>
                <h2 className="books-title">Books</h2>

                <hr />

                <div className='books-container'>
                    {booksState.map((book) => {
                        const {_id: id, title, author, bookCover} = book;
                        return (
                            <BookCard key={id} title={title} author={author} bookCover={bookCover} id={id}/>
                        );
                    })}
                </div>
            </div>
        </main>
    );
};

export default HomePage;
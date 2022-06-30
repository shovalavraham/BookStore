import React, { useEffect, useState } from 'react';
import BookCard from '../../components/book-card/BookCard.component';
import Loader from '../../components/shared/loader/Loader.component';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './home-page.styles.css';
import { getAllBooks } from '../../services/book.service';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [booksState, setBooksState] = useState(null);
    //const [filterdBooksState, setFilterdBooksState] = useState(null);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await getAllBooks();
                setBooksState(response.data);
                //setFilterdBooksState(responseObj.data);

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
    
            } catch (error) {
                alert("Something went wrong!");
            }
        };

        getBooks();

    }, []);

    {/*const handleFilter = (event) => {
        const title = event.target.value.trim().toLowerCase();
        const filterdBooks = booksState.filter(book => book.title.toLowerCase().includes(title));
        setFilterdBooksState(filterdBooks);
    }*/}

    return isLoading ? (
        <Loader/>
    ) : (
        <main className='home-page'>
            {/*<input className="form-input" onInput={handleFilter}/>*/}
            
            <div className='books-container'>
                {booksState.map((book) => {
                    const {_id: id, title, author, bookCover} = book;
                    return (
                        <BookCard key={id} title={title} author={author} bookCover={bookCover} id={id}/>
                    );
                })}
            </div>
        </main>
    );
};

export default HomePage;
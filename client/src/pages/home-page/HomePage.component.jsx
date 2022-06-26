import React, { useEffect, useState } from 'react';
import BookCard from '../../components/book-card/BookCard.component';
import Loader from '../../components/shared/loader/Loader.component';
import environments from '../../environments/environments';
import './home-page.styles.css';

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [booksState, setBooksState] = useState(null);
    //const [filterdBooksState, setFilterdBooksState] = useState(null);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const response = await fetch(`${environments.API_URL}/books`);

                if(!response.status) {
                    throw new Error();
                }

                const responseObj = await response.json();
                setBooksState(responseObj.data);
                //setFilterdBooksState(responseObj.data);

                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
    
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
                    return (
                        <BookCard key={book._id} title={book.title} author={book.author} bookCover={book.bookCover} id={book._id}/>
                    );
                })}
            </div>
        </main>
    );
};

export default HomePage;
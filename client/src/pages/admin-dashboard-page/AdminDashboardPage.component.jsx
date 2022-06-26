import React from "react";
import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/shared/loader/Loader.component";
import environments from "../../environments/environments";
import './admin-dashboard-page.styles.css';
import bookReducer, { BOOK_STATE_INIT } from "../../reducers/book.reducer";
import { loadBook, resetBook } from "../../actions/book.action";
import BookModal from "../../components/book-modal/BookModal.component";
import { AdminAuthContext } from '../../contexts/AdminAuth.context';

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const adminAuthContextValue = useContext(AdminAuthContext);
    
    const [isLoading, setIsLoading] = useState(true);
    const [booksState, setBooksState] = useState(null);
    const [bookState, dispatchBookState] = useReducer(bookReducer, BOOK_STATE_INIT);
    const [editState, setEditState] = useState(false);
    const [createBookState, setCreateBookState] = useState(false);
    const [isModalLoading, setIsMoadlLoading] = useState(false);

    useEffect(() => {
        if(!localStorage.getItem('admin-token')) {
            navigate("*");
        }

        getBooks();

    }, []);

    const getBooks = async () => {
        try {
            const response = await fetch(`${environments.API_URL}/books`);

            if(!response.status) {
                throw new Error();
            }

            const responseObj = await response.json();
            setBooksState(responseObj.data);

            setTimeout(() => {
                setIsLoading(false);
            }, 2000);

        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleBookClick = (e, book) => {
        setEditState(true);
        dispatchBookState(loadBook(book));
    };

    const handleCreateBookClick = () => {
        setCreateBookState(true);
    }

    const handleClose = () => {
        setEditState(false);
        setCreateBookState(false);
        dispatchBookState(resetBook());
    };

    const updateBook = async () => {
        const token = adminAuthContextValue.adminToken;
        const data = bookState.values;
        const validities = bookState.validities;
        
        if(validities.title &&
            validities.author &&
            validities.bookCover &&
            validities.description &&
            validities.pages &&
            validities.price) {
            setIsMoadlLoading(true);

            try {
                const response = await fetch(`${environments.API_URL}/books/${data._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });
    
                if(response.status !== 202) {
                    throw new Error();
                }
    
                getBooks();

                setTimeout(() => {
                    setIsMoadlLoading(false);
                }, 1000);
                
                handleClose();
            } catch (error) {
                alert("Something went wrong!");
            }
        }
    };

    const createBook = async () => {
        const token = adminAuthContextValue.adminToken;
        const data = bookState.values;
        const validities = bookState.validities;

        if(validities.title &&
            validities.author &&
            validities.bookCover &&
            validities.description &&
            validities.pages &&
            validities.price) {
            setIsMoadlLoading(true);

            try {
                const response = await fetch(`${environments.API_URL}/books/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });

                if(response.status !== 201) {
                    throw new Error();
                }
                
                getBooks();

                setTimeout(() => {
                    setIsMoadlLoading(false);
                }, 1000);

                handleClose();

            } catch (error) {
                alert("Something went wrong!");
            }
        }
        
    };

    const deleteBook = async () => {
        setIsMoadlLoading(true);

        const token = adminAuthContextValue.adminToken;
        const bookID = bookState.values._id;

        try {
            const response = await fetch(`${environments.API_URL}/books/${bookID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            if(!response.status) {
                throw new Error();
            }
            
            getBooks();

            setTimeout(() => {
                setIsMoadlLoading(false);
            }, 1000);

            handleClose();

        } catch (error) {
            alert("Something went wrong!");
        }
    };
    
    return isLoading ? (
        <Loader/>
    ) : (
        <main className='admin-dashboard-page'>
            <h1 className="dashboard-title">Admin Dashboard</h1>

            <button className="btn-design create-book-btn" onClick={handleCreateBookClick}>Create New Book</button>

            <div className='dashboard-books-container'>
                {booksState.map((book) => {
                    return (
                        <button className='dashboard-book-card' key={book._id} onClick={((e) => handleBookClick(e, book))} >
                            <img src={book.bookCover} alt='book cover' width="150" height="230"/>
                            <div className='dashboard-book-title'>{book.title}</div>
                            <div className='dashboard-book-author'>{book.author}</div>
                        </button>
                    );
                })}
            </div>

            {editState &&
                <BookModal {...bookState} dispatchBookState={dispatchBookState} handleClose={handleClose} updateBook={updateBook} deleteBook={deleteBook} header="Edit Book" isModalLoading={isModalLoading} deleteVisible={'visible'}/>
            }

            {createBookState &&
                <BookModal {...bookState} dispatchBookState={dispatchBookState} handleClose={handleClose} createBook={createBook} header="Create New Book" isModalLoading={isModalLoading} deleteVisible={'not-visible'}/>
            }
        </main>
    );
};

export default AdminDashboardPage;
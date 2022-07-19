import React from "react";
import { useState, useEffect, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/shared/loader/Loader.component";
import './admin-dashboard-page.styles.css';
import bookReducer, { BOOK_STATE_INIT } from "../../reducers/book.reducer";
import { loadBookAction, resetBookAction } from "../../actions/book.action";
import BookModal from "../../components/book-modal/BookModal.component";
import { AdminAuthContext } from '../../contexts/AdminAuth.context';
import { FaPlus } from 'react-icons/fa';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import { createBook, deleteBook, getAllBooks, updateBook } from "../../services/book.service";
import AdminDashboardHeader from "./admin-dashboard-header/AdminDashboardHeader.component";

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const adminAuthContextValue = useContext(AdminAuthContext);
    
    const [isLoading, setIsLoading] = useState(true);
    const [booksState, setBooksState] = useState(null);
    const [bookState, dispatchBookState] = useReducer(bookReducer, BOOK_STATE_INIT);
    const [editState, setEditState] = useState(false);
    const [createBookState, setCreateBookState] = useState(false);
    const [isModalLoading, setIsMoadlLoading] = useState(false);
    const [originalBookState, setOriginalBookState] = useState(null);

    useEffect(() => {
        if(!localStorage.getItem('admin-token')) {
            navigate("/*");
        }

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

    const handleBookClick = (e, book) => {
        dispatchBookState(loadBookAction(book));
        setOriginalBookState(book);
        setEditState(true);
    };

    const handleCreateBookClick = () => {
        setCreateBookState(true);
    }

    const handleClose = () => {
        dispatchBookState(resetBookAction());
        setEditState(false);
        setCreateBookState(false);
    };

    const handleUpdateBook = async () => {
        const token = adminAuthContextValue.adminToken;
        const bookStateValues = bookState.values;
        const validities = bookState.validities;
        
        const data = {_id: bookStateValues._id};
        for (let keys in originalBookState) {
            if (originalBookState[keys] !== bookStateValues[keys]) {
              data[keys] = bookStateValues[keys];
            }
        }

        if(Object.keys(data).length === 1) {
            handleClose();
            return;
        }
        
        if(validities.title &&
            validities.author &&
            validities.bookCover &&
            validities.description &&
            validities.pages &&
            validities.price) {
            setIsMoadlLoading(true);

            try {
                await updateBook(token, data);
                
                const updatedBooks = booksState.map(book => {
                    if(book._id === bookStateValues._id)
                        return bookStateValues;
                    return book;
                });
                setBooksState(updatedBooks);

                setTimeout(() => {
                    setIsMoadlLoading(false);
                }, LOADER_TIMEOUT);
                
                handleClose();
            } catch (error) {
                setIsMoadlLoading(false);
                alert("Something went wrong!");
            }
        }
    };

    const handleCreateBook = async () => {
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
                const response = await createBook(token, data);
                setBooksState(booksState => [...booksState, response.data]);

                setTimeout(() => {
                    setIsMoadlLoading(false);
                }, LOADER_TIMEOUT);

                handleClose();

            } catch (error) {
                setIsMoadlLoading(false);
                alert("Something went wrong!");
            }
        }
        
    };

    const handleDeleteBook = async () => {
        setIsMoadlLoading(true);

        const token = adminAuthContextValue.adminToken;
        const bookID = bookState.values._id;

        try {
            await deleteBook(token, bookID);
            
            setBooksState(booksState.filter(book => (book._id !== bookID)));

            setTimeout(() => {
                setIsMoadlLoading(false);
            }, LOADER_TIMEOUT);

            handleClose();

        } catch (error) {
            setIsMoadlLoading(false);
            alert("Something went wrong!");
        }
    };
    
    return isLoading ? (
        <Loader/>
    ) : (
        <main className='admin-dashboard-page'>
            <AdminDashboardHeader/>

            <div className='dashboard-container'>
                <div className="dashboard-books-header">
                    <h2 className="dashboard-books-title">Books</h2>
                    <button className="btn-design create-book-btn" onClick={handleCreateBookClick}><FaPlus className="plus-icon"/>Add Book</button>
                </div>

                <hr />

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
            </div>

            {editState &&
                <BookModal {...bookState} dispatchBookState={dispatchBookState} handleClose={handleClose} updateBook={handleUpdateBook} deleteBook={handleDeleteBook} header="Edit Book" isModalLoading={isModalLoading} deleteVisible={'visible'}/>
            }

            {createBookState &&
                <BookModal {...bookState} dispatchBookState={dispatchBookState} handleClose={handleClose} createBook={handleCreateBook} header="Create New Book" isModalLoading={isModalLoading} deleteVisible={'not-visible'}/>
            }
        </main>
    );
};

export default AdminDashboardPage;
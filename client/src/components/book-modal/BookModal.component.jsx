import React from "react";
import BookForm from "./book-form/BookForm.component";
import './book-modal.styles.css';
import ModalLoader from "./modal-loader/ModalLoader.component";

const BookModal = ({values: book, validities, messages, dispatchBookState, header, updateBook, createBook, handleClose, deleteBook, deleteVisible, isModalLoading}) => {

    const handleSave = () => {
        header === 'Edit Book' ? updateBook() : createBook();
    }

    return (
        <div className="book-modal">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{header}</h2>
                    <button className="close-btn" onClick={handleClose}>x</button>
                </div>

                <BookForm book={book} validities={validities} messages={messages} dispatchBookState={dispatchBookState}/>

                <div className="modal-btns">
                    <button className="btn-design blue-btn" onClick={handleSave}>Save</button>
                    <button className={`${deleteVisible} btn-design red-btn`} onClick={deleteBook}>Delete</button>
                </div>
            </div>
            
            {isModalLoading && <ModalLoader/>}
        </div> 
    );
};

export default BookModal;
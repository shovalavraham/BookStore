import React from "react";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import bookActionTypes, { updateAction } from "../../actions/book.action";
import FormInput from "../form-input/FormInput.component";
import './book-modal.styles.css';
import ModalLoader from "./modal-loader/ModalLoader.component";

const BookModal = (props) => {
    const book = props.values;
    const validities = props.validities;
    const messages = props.messages;
    const dispatchBookState = props.dispatchBookState;

    const [descriptionState, setDescriptionState] = useState(book.description);
    
    const handleDescriptionChange = (event) => {
        setDescriptionState(event.target.value);
    };
    
    const handleTitleInput = (event) => {
        const title = event.target.value.trim();

        if(title === '') {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_TITLE, title, false, "Title must have at least 1 char"));
            return;
        }

        dispatchBookState(updateAction(bookActionTypes.UPDATE_TITLE, title, true, ""));
    };

    const handleAuthorInput = (event) => {
        const author = event.target.value.trim();

        if(author === '') {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_AUTHOR, author, false, "Author must have at least 1 char"));
            return;
        }

        dispatchBookState(updateAction(bookActionTypes.UPDATE_AUTHOR, author, true, ""));
    };

    const handleBookCoverInput = (event) => {
        const bookCover = event.target.value.trim();

        if(bookCover === '') {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_BOOK_COVER, bookCover, false, "Please enter book cover"));
            return;
        }

        if(!isURL(bookCover)) {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_BOOK_COVER, bookCover, false, "URL is not valid"));
            return;
        }

        dispatchBookState(updateAction(bookActionTypes.UPDATE_BOOK_COVER, bookCover, true, ""));
    };

    const handleDescriptionInput = (event) => {
        const description = event.target.value.trim();

        if(description === '') {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_DESCRIPTION, description, false, "Description must have at least 1 char"));
            return;
        }

        dispatchBookState(updateAction(bookActionTypes.UPDATE_DESCRIPTION, description, true, ""));
    };

    const handlePagesInput = (event) => {
        const pages = event.target.value;

        if(!pages) {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_PAGE, pages, false, "Please enter pages"));
            return;
        }

        if(pages < 1) {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_PAGE, pages, false, "There must be at least one page"));
            return;
        }
        
        if(!Number.isInteger(+pages)) {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_PAGE, pages, false, "Pages must be an integer"));
            return;
        }

        dispatchBookState(updateAction(bookActionTypes.UPDATE_PAGE, pages, true, ""));
    };

    const handlePriceInput = (event) => {
        const price = event.target.value.trim();

        if(!price) {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_PRICE, price, false, "Please enter price"));
            return;
        }

        if(price < 0) {
            dispatchBookState(updateAction(bookActionTypes.UPDATE_PRICE, price, false, "The price should be at least 0"));
            return;
        }

        dispatchBookState(updateAction(bookActionTypes.UPDATE_PRICE, price, true, ""));
    };

    const handleSave = () => {
        props.header === 'Edit Book' ? props.updateBook() : props.createBook();
    }

    return (
        <div className="book-modal">
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{props.header}</h2>
                    <button className="close-btn" onClick={props.handleClose}>x</button>
                </div>

                <form className="book-form">
                    <FormInput label="Title:" id={"titleInput"} type="String" handleInput={handleTitleInput} message={messages.title} isVisible={validities.title} value={book.title}/>
                    <FormInput label="Author:" id={"authorInput"} type="String" handleInput={handleAuthorInput} message={messages.author} isVisible={validities.author} value={book.author}/>
                    <FormInput label="Book Cover:" id={"bookCoverInput"} type="String" handleInput={handleBookCoverInput} message={messages.bookCover} isVisible={validities.bookCover} value={book.bookCover}/>
                    <div className="description-container">
                        <label className="description-label" htmlFor="description-input">Description:</label>
                        <textarea className="description-input" rows="7" cols="35" id="descriptionInput" onInput={handleDescriptionInput} type="String" value={descriptionState} onChange={handleDescriptionChange} required></textarea> 
                        {!validities.description &&
                        <div className="error-message">{messages.description}</div>}
                    </div>
                    <FormInput label="Pages:" id={"pagesInput"} type="Number" handleInput={handlePagesInput} message={messages.pages} isVisible={validities.pages} value={book.pages}/>
                    <FormInput label="Price:" id={"priceInput"} type="Number" handleInput={handlePriceInput} message={messages.price} isVisible={validities.price} value={book.price}/>
                </form>

                <div className="modal-btns">
                    <button className="btn-design" onClick={handleSave}>Save</button>
                    <button className={`${props.deleteVisible} btn-design delete-btn`} onClick={props.deleteBook}>Delete</button>
                </div>
            </div>
            
            {props.isModalLoading && <ModalLoader/>}
        </div> 
    );
};

export default BookModal;
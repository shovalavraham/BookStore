import React from "react";
import { useState } from "react";
import isURL from "validator/lib/isURL";
import { updateAction } from "../../../actions/book.action";
import FormInput from "../../form-input/FormInput.component";
import './book-form.styles.css';

const BookForm = ({book, validities, messages, dispatchBookState}) => {
    const [descriptionState, setDescriptionState] = useState(book.description);
    
    const handleDescriptionChange = (event) => {
        setDescriptionState(event.target.value);
    };
    
    const handleTitleInput = (event) => {
        const title = event.target.value.trim();

        if(title === '') {
            dispatchBookState(updateAction(title, false, "Title must have at least 1 char", 'title'));
            return;
        }

        dispatchBookState(updateAction(title, true, "", 'title'));
    };

    const handleAuthorInput = (event) => {
        const author = event.target.value.trim();

        if(author === '') {
            dispatchBookState(updateAction(author, false, "Author must have at least 1 char", 'author'));
            return;
        }

        dispatchBookState(updateAction(author, true, "", 'author'));
    };

    const handleBookCoverInput = (event) => {
        const bookCover = event.target.value.trim();

        if(bookCover === '') {
            dispatchBookState(updateAction(bookCover, false, "Please enter book cover", 'bookCover'));
            return;
        }

        if(!isURL(bookCover)) {
            dispatchBookState(updateAction(bookCover, false, "URL is not valid", 'bookCover'));
            return;
        }

        dispatchBookState(updateAction(bookCover, true, "", 'bookCover'));
    };

    const handleDescriptionInput = (event) => {
        const description = event.target.value.trim();

        if(description === '') {
            dispatchBookState(updateAction(description, false, "Description must have at least 1 char", 'description'));
            return;
        }

        dispatchBookState(updateAction(description, true, "", 'description'));
    };

    const handlePagesInput = (event) => {
        const pages = event.target.value;

        if(!pages) {
            dispatchBookState(updateAction(pages, false, "Please enter pages", 'pages'));
            return;
        }

        if(pages < 1) {
            dispatchBookState(updateAction(pages, false, "There must be at least one page", 'pages'));
            return;
        }
        
        if(!Number.isInteger(+pages)) {
            dispatchBookState(updateAction(pages, false, "Pages must be an integer", 'pages'));
            return;
        }

        dispatchBookState(updateAction(pages, true, "", 'pages'));
    };

    const handlePriceInput = (event) => {
        const price = event.target.value.trim();

        if(!price) {
            dispatchBookState(updateAction(price, false, "Please enter price", 'price'));
            return;
        }

        if(price < 0) {
            dispatchBookState(updateAction(price, false, "The price should be at least 0", 'price'));
            return;
        }

        dispatchBookState(updateAction(price, true, "", 'price'));
    };

    return (
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
    );
};

export default BookForm;
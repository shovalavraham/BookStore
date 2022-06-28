import React from "react";
import { useNavigate } from "react-router-dom";
import './book-details.styles.css';

const BookDetails = (props) => {
    const navigate = useNavigate();

    const handleBookClick = (event) => {
        navigate(`/books/${props.id}`);
    };

    return (
        <button className="books-details" onClick={handleBookClick}>
            <img src={props.bookCover} alt="book cover" width="90" height="120"/>

            <div className="title-author">
                <h2 className="cart-book-title">{props.title}</h2>
                <h3 className="cart-book-author">{props.author}</h3>
            </div>
        </button>
    );
};

export default BookDetails;
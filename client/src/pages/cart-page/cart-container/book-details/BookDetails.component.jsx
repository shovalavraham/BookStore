import React from "react";
import { useNavigate } from "react-router-dom";
import './book-details.styles.css';

const BookDetails = ({id, title, author, bookCover}) => {
    const navigate = useNavigate();

    const handleBookClick = (event) => {
        navigate(`/books/${id}`);
    };

    return (
        <button className="books-details" onClick={handleBookClick}>
            <img src={bookCover} alt="book cover" width="90" height="120"/>

            <div className="title-author">
                <h2 className="cart-book-title">{title}</h2>
                <h3 className="cart-book-author">{author}</h3>
            </div>
        </button>
    );
};

export default BookDetails;
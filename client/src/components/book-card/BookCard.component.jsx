import React from "react";
import { useNavigate } from "react-router-dom";
import './book-card.styles.css';

const BookCard = ({id, title, author, bookCover}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`books/${id}`);
    };

    return (
        <button className='book-card' onClick={handleClick} >
            <img src={bookCover} alt='book cover' width="150" height="230"/>
            <div className='home-book-title'>{title}</div>
            <div className='home-book-author'>{author}</div>
        </button>
    );
};

export default BookCard;
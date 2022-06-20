import React from "react";
import { useNavigate } from "react-router-dom";
import './book-card.styles.css';

const BookCard = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const id = props.id;

        navigate(`books/${id}`);
    };

    return (
        <button className='book-card' onClick={handleClick} >
            <img src={props.bookCover} alt='book cover' width="150" height="230"/>
            <div className='home-book-title'>{props.title}</div>
            <div className='home-book-author'>{props.author}</div>
        </button>
    );
};

export default BookCard;
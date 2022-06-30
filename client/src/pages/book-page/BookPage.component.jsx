import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../../components/shared/loader/Loader.component";
import { AuthContext } from '../../contexts/Auth.context.js';
import { CartContext } from '../../contexts/Cart.context';
import './book-page.styles.css';
import { initCartAction } from "../../actions/cart.action";
import QuantityBtn from "../../components/quantity-btn/QuantityBtn.component";
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import { getBookByID } from "../../services/book.service";
import { addBookToCart, getCart, updateQuantity } from "../../services/cart.service";

const BookPage = () => {
    const navigate = useNavigate();
    const {userToken} = useContext(AuthContext);
    const {cartState, dispatchCartState} = useContext(CartContext);

    const [isLoading, setIsLoading] = useState(true);
    const [bookState, setBookState] = useState(null);
    const [quantityState, setQuantityState] = useState(1);

    const {id} = useParams();

    useEffect(() => {

        const getBook = async () => {
            try {
                const response = await getBookByID(id);
                const book = response.data;
                
                if(!book) {
                    throw new Error();
                }
    
                setBookState(book);
    
            } catch (error) {
                navigate('/*');
            }
        };

        getBook();

        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);

    useEffect(() => {
        const geUsertCart = async () => {
            try {
                const response = await getCart(userToken);
                const cart = response.data;

                dispatchCartState(initCartAction(cart));
                
            } catch (error) {
                alert("Something went wrong!");
            }
        };

        if(userToken) {
            geUsertCart();
        }

    }, [cartState]);

    const handleUpdateQuantity = async (token, bookID, quantity) => {

        try {
            await updateQuantity(token, bookID, quantity);

        } catch (error) {
            alert("Something went wrong!");
        }
    }

    const handleAddToCart = async () => {
        if(!userToken) {
            alert("You need to login first!");
            return;
        }

        let updatedQuantity = quantityState;

        const book = cartState.books.find(book => book.bookID._id === id);

        if(book) {
            updatedQuantity += book.quantity;

            if(updatedQuantity > 10) {
                alert(`You can't have more then 10 copies!`);
                return;
            }

            handleUpdateQuantity(userToken, book.bookID._id, updatedQuantity);
            alert('Book was added successfully!');
            return;
        }
        
        try {
            await addBookToCart(userToken, id, updatedQuantity);

            alert('Book was added successfully!');

        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return isLoading ? (
            <Loader/>
    ) : (
        <main className="book-page">
            <div className="book-container">
                <img src={bookState.bookCover} alt='book cover' width="300" height="500"/>
                
                <div className="details">
                    <h1 className="book-title">{bookState.title}</h1>

                    <div className="author-pages">
                        <h2 className="book-author">{bookState.author}</h2>
                        <div className="book-pages">{`${bookState.pages} pages`}</div>
                    </div>

                    <div className="cart-price">
                        <div className="add-to-cart-container">
                            <QuantityBtn value={1} bookid={id} page={'book'} setQuantityState={setQuantityState}/>
                            <button className="btn-design add-to-cart-btn" onClick={handleAddToCart}>Add to cart</button>
                        </div>
        
                        <div  className="book-price">{`${bookState.price}$`}</div>
                    </div>

                    <p>{bookState.description}</p>
                </div>
            </div>
        </main>
    );
};

export default BookPage;
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { updatePriceAction } from "../../actions/cart.action";
import { CartContext } from "../../contexts/Cart.context";
import './quantity-btn.styles.css';

const QuantityBtn = (props) => {
    const cartContextValue = useContext(CartContext);
    const [quantityState, setQuantityState] = useState(props.value);

    const bookPageSetQuantityState = props.setQuantityState;

    const handleIncrement = () => {
        const quantity = quantityState + 1;

        if(props.page === 'book') {
            if(quantity <= 10) {
                setQuantityState(quantity);
                bookPageSetQuantityState(quantity);
            }
            return;
        }

        const cart = cartContextValue.cartState;
        const bookID = props.bookID;

        if(quantity <= 10) {
            setQuantityState(quantity);
            cartContextValue.dispatchCartState(updatePriceAction(cart, bookID, quantity, '+'));
            props.updateQuantity(bookID, quantity);
        }
    };

    const handleDecrement = () => {
        const quantity = quantityState - 1;

        if(props.page === 'book') {
            if(quantity >= 1) {
                setQuantityState(quantity);
                bookPageSetQuantityState(quantity);
            }
            return;
        }

        const cart = cartContextValue.cartState;
        const bookID = props.bookID;

        if(quantity >= 1) {
            setQuantityState(quantity);
            cartContextValue.dispatchCartState(updatePriceAction(cart, bookID, quantity, '-'));
            props.updateQuantity(bookID, quantity);
        }
    };

    return (
        <div className="quantity-btn-container">
            <button className="quantity-btn" onClick={handleDecrement}>-</button>
            <div className="quantity-display">{quantityState}</div>
            <button className="quantity-btn" onClick={handleIncrement}>+</button>
        </div>
    );
};

export default QuantityBtn;
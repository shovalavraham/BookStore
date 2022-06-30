import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { updatePriceAction } from "../../actions/cart.action";
import { CartContext } from "../../contexts/Cart.context";
import './quantity-btn.styles.css';

const QuantityBtn = ({value, bookID, page, updateQuantity, setQuantityState: bookPageSetQuantityState}) => {
    const {cartState: cart, dispatchCartState} = useContext(CartContext);
    const [quantityState, setQuantityState] = useState(value);

    const handleIncrement = () => {
        const quantity = quantityState + 1;

        if(page === 'book') {
            if(quantity <= 10) {
                setQuantityState(quantity);
                bookPageSetQuantityState(quantity);
            }
            return;
        }

        if(quantity <= 10) {
            setQuantityState(quantity);
            dispatchCartState(updatePriceAction(cart, bookID, quantity, '+'));
            updateQuantity(bookID, quantity);
        }
    };

    const handleDecrement = () => {
        const quantity = quantityState - 1;

        if(page === 'book') {
            if(quantity >= 1) {
                setQuantityState(quantity);
                bookPageSetQuantityState(quantity);
            }
            return;
        }

        if(quantity >= 1) {
            setQuantityState(quantity);
            dispatchCartState(updatePriceAction(cart, bookID, quantity, '-'));
            updateQuantity(bookID, quantity);
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
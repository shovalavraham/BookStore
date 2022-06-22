import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { updatePrice } from "../../../actions/cart.action";
import { CartContext } from "../../../contexts/Cart.context";
import './quantity-btn.styles.css';

const QuantityBtn = (props) => {
    const cartContextValue = useContext(CartContext);
    const [quantityState, setQuantityState] = useState(props.value);

    const handleIncrement = () => {
        const quantity = quantityState + 1;
        const cart = cartContextValue.cartState;
        const bookPrice = props.price;

        if(quantity <= 10) {
            setQuantityState(quantity);
            cartContextValue.dispatchCartState(updatePrice(cart, bookPrice, '+'));
            props.updateQuantity(props.bookID, quantity);
        }
    };

    const handleDecrement = () => {
        const quantity = quantityState - 1;
        const cart = cartContextValue.cartState;
        const bookPrice = props.price;

        if(quantity >= 1) {
            setQuantityState(quantity);
            cartContextValue.dispatchCartState(updatePrice(cart, bookPrice, '-'));
            props.updateQuantity(props.bookID, quantity);
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
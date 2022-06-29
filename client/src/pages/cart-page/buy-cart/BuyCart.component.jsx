import React from "react";
import { useContext } from "react";
import { checkoutCartAction } from "../../../actions/cart.action";
import { AuthContext } from "../../../contexts/Auth.context";
import { CartContext } from "../../../contexts/Cart.context";
import environments from "../../../environments/environments";
import { checkout } from "../../../services/cart.service";
import './buy-cart.styles.css';

const BuyCart = () => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handleCheckout = async () => {
        const token = authContextValue.userToken;

        try {
            const response = await checkout(token);
            const cart = response.data;

            cartContextValue.dispatchCartState(checkoutCartAction(cart));
            alert('Checkout was done successfully!');

        } catch (error) {
            alert("Something went wrong!");
        }
    }

    return (
        <div className="buy-cart-container">
            <button className="btn-design checkout blue-btn" onClick={handleCheckout}>Checkout</button>
            <div className="total-price">{`${cartContextValue.cartState.price}$`}</div>
        </div>
    );
};

export default BuyCart;
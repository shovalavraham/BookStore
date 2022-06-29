import React from "react";
import { useContext } from "react";
import { checkoutCartAction } from "../../../actions/cart.action";
import { AuthContext } from "../../../contexts/Auth.context";
import { CartContext } from "../../../contexts/Cart.context";
import environments from "../../../environments/environments";
import './buy-cart.styles.css';

const BuyCart = () => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handleCheckout = async () => {
        const token = authContextValue.userToken;

        try {
            const response = await fetch(`${environments.API_URL}/cart/checkout`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if(response.status !== 202) {
                throw new Error();
            }

            const responseObj = await response.json();
            const cart = responseObj.data;

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
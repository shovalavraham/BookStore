import React from "react";
import { useContext } from "react";
import { checkoutCart } from "../../../actions/cart.action";
import { AuthContext } from "../../../contexts/Auth.context";
import { CartContext } from "../../../contexts/Cart.context";
import './buy-cart.styles.css';

const BuyCart = () => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const handleCheckout = async () => {
        const token = authContextValue.userToken;

        try {
            const response = await fetch('http://localhost:3000/cart/checkout', {
                method: 'PATCH',
                headers: {
                    'Authorization': token,
                }
            });

            if(response.status !== 202) {
                throw new Error();
            }

            const responseObj = await response.json();
            const cart = responseObj.data;

            cartContextValue.dispatchCartState(checkoutCart(cart));
            alert('Checkout was done successfully!');

        } catch (error) {
            alert("Something went wrong!");
        }
    }

    return (
        <div className="buy-cart-container">
            <button className="btn-design checkout" onClick={handleCheckout}>Checkout</button>
            <span className="total-price">{`${cartContextValue.cartState.price}$`}</span>
        </div>
    );
};

export default BuyCart;
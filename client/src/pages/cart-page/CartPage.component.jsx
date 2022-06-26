import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context.js';
import BuyCart from './buy-cart/BuyCart.component';
import CartContainer from './cart-container/CartContainer.component';
import { CartContext } from '../../contexts/Cart.context.js';
import './cart-page.styles.css';

const CartPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const cartContextValue= useContext(CartContext);

    useEffect(() => {
        const token = authContextValue.userToken;

        if(!token) {
            navigate('/login');
        }

    }, []);


    return (
        <main className='cart-page'>
            <CartContainer/>
            {cartContextValue.cartState.books.length === 0 ? (
                <h1>Your cart is empty</h1>
            ) : (
                <BuyCart/>
            )}
        </main>
    );
};

export default CartPage;
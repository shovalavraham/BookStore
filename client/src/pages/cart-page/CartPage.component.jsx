import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/shared/loader/Loader.component';
import { AuthContext } from '../../contexts/Auth.context.js';
import BuyCart from './buy-cart/BuyCart.component';
import CartContainer from './cart-container/CartContainer.component';
import { CartContext } from '../../contexts/Cart.context.js';
import './cart-page.styles.css';

const CartPage = () => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const cartContextValue= useContext(CartContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = authContextValue.userToken;

        if(!token) {
            navigate('/login');
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);


    return isLoading ? (
        <Loader/>
    ) : (
        <main className='cart-page'>
            <CartContainer/>
            {cartContextValue.cartState.cart.books.length === 0 ? (
                <h1>Your cart is empty</h1>
            ) : (
                <BuyCart/>
            )}
        </main>
    );
};

export default CartPage;
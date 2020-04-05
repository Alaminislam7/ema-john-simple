import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const auth = useAuth();
    const handlePlaceOrder = () => {
        setCart([]);
        setOrderPlaced(true)
        processOrder();
    }
    const removeProduct = (productKey) => {
        console.log('clicked', productKey);
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        const cartProducts =  productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
        
    }, []);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>;
    }
    
    return (
        <div className='twin-container'>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems 
                        key ={pd.key}
                        removeProduct = {removeProduct}
                        product={pd}
                    ></ReviewItems>)
                }
                {thankYou}
                {
                    !cart.length && <h2>Your cart is empty <a href="/Shop">Keep shopping</a></h2>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='shipment'>
                        {
                            auth.user ? 
                            <button className='btn'>Procced to shipment</button>
                            :
                            <button className='btn'>Login to Procced</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
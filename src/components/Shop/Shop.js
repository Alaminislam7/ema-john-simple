import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';


const Shop = () => {
    const first10 = fakeData.slice(0,10)
    const [products, setProducts] = useState(first10)
    const [cart, setCourt] = useState([])

    useEffect( ()=> {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        const previewsCart = productKey.map( existingKey =>{
            const product = fakeData.find(pd => pd.key ===existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        } )
        setCourt(previewsCart);

    }, [])

    const handleAddProduct = (product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd=>pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCourt(newCart)

        addToDatabaseCart(product.key, count);
    }

    

    return (
        <div className='twin-container'>

            <div className="product-container">
                {
                    products.map(product => <Product
                        key = {product.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product = {product}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart= {cart}>
                    <Link to='review'>
                        <button className='btn'>Review Order</button>
                    </Link>
                </Cart>
                
            </div>

        </div>
    );
};

export default Shop;
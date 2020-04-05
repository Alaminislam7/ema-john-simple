import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product
    return (
        <div className='product-items'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className='product-name'>
                <h4><Link to={"/"+key}>{name}</Link></h4>
                <p>By: {seller}</p>
                <p>Price: {price}</p>
                <p>Only {stock} left in stock</p>
                { props.showAddToCart === true && <button className = 'btn' 
                onClick={ () => props.handleAddProduct(props.product) }
                ><FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>
        </div>
    );
};

export default Product;
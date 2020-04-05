import React from 'react';
import Cart from '../Cart/Cart';
import './ReviewItems.css';

const ReviewItems = (props) => {
    const {name, quantity, img, key, price} = props.product;
    return (
        <div className='reviewitem'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4>{name}</h4>
                <h5>Quantity: {quantity}</h5>
                <p>
                    <smal> Price: {price} </smal>
                </p>
                <button className='btn'
                    onClick={ ()=> props.removeProduct(key)}
                >Remove </button>
            </div>
        </div>
    );
};

export default ReviewItems;
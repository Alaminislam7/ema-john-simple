import React from 'react';
import Product from '../Product/Product';
import { useAuth } from '../Login/useAuth';

const Cart = (props) => {
    const cart = props.cart
    const total = cart.reduce((total, product) => total + product.price * product.quantity , 0)
    const auth = useAuth();

    let shipping = 0;
    if(total > 35){
        shipping = 0
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99
    }
    const tax = (total/10);
    const grandTotal = ( total + shipping + parseFloat(tax) ).toFixed(2);

    const formatNumbar = num => {
        const precision = num.toFixed(2);
        return Number(precision)
    }

    return (
        <div>
            <h3>Cart</h3>
            {<h4>Order Summary: { cart.length }</h4>}
            <p>Total Price: ${ formatNumbar(total) }</p>
            <p>
            <small>Shipping Cost: ${ shipping }</small>
            </p>
            <p>
                <small> Vat + Tax ${ formatNumbar(tax) } </small>
            </p>
            <p>Total Price: ${ grandTotal }</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
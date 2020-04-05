import React, { useContext, useState, useRef, useEffect } from 'react';
import logo from '../images/logo.png';
import './Header.css'
import { useAuth } from './Login/useAuth';

const usePreviews = value => {
    const prev = useRef();
    useEffect(() =>{
        prev.current = value;
    },[value])
    return prev.current;
}



const Header = () => {
    const [count, setCount] = useState(0);
    const prevCount = usePreviews(count);

    const auth = useAuth();
    console.log(auth.user);
    return (
        <div className='header'>

            <h4>count: {count} Previews:{prevCount} </h4>
            <button onClick={()=>setCount(count+1)}>+</button>
            <button onClick={()=>setCount(count-1)}>-</button>

            <div className="nav">
                <a href="Shop">Shop</a>
                <a href="review">Order Review</a>
                <a href="inventory">Manage Inventory</a>
                {
                    auth.user && <span style={{color: 'yellow'}}>Welcome {auth.user.name} </span>
                }
                {
                    auth.user ? <a href='/login'>Sign out</a>
                    : <a href='/login'>Sign in</a>
                }
            </div>
        </div>
    );
};

export default Header;
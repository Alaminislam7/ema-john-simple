import React from 'react';
import Auth from './useAuth';
const Login = () => {
    const auth = Auth();
    const handleSignIn = () =>{
        auth.signInWithGoogle()
        .then(res =>{
            window.location.pathname = '/review'
        })
    }
    const handleSignOut = () => {
        auth.SignOut()
        .then(res => {
            window.location.pathname = '/Shop'
        })
    }

    return (
        <div>
            <h2>Login form</h2>
            {
                auth.user ? <button onClick = {handleSignOut}>Sign out</button> :
                <button onClick = {handleSignIn}>SignIn With Google</button>
            }
        </div>
    );
};

export default Login;

import React, { useContext, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState, createContext } from "react";
import { Route, Redirect } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);
/* import { Route,Redirect } from 'react-router-dom'; */

const AuthContext = createContext();

export const AuthContextProvider = (props) =>{
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

const getUser = user =>{
    const {displayName, email, photoURL} = user;
    return {name: displayName, email, photo: photoURL}
}

//Private Route
export function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }



const Auth = () => {
    const [user, setUser] = useState(null);

     //Sign In for User In google
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)

        .then(res => {
            const singInUser = getUser(res.user)
            setUser(singInUser);
            return res.user;
        }).catch(err => {
            console.log(err);
            setUser(null)
            return err.message;
        });
    }

    //Sign Out for User In google
    const SignOut = () =>{
        return firebase.auth().signOut()
        .then(res => {
        // Sign-out successful.
        /* const signOutUser = {
            isSignIn: false,
            name: '',
            email: '',
            photo: ''
        } */
        setUser(null);

        }).catch(error => {
        // An error happened.
        });
        
    }

    useEffect( ()=> {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              const currUser = getUser(user);
              setUser(currUser);
            } else {
              // No user is signed in.
            }
          });
          
    },[] )

    return {
        user,
        signInWithGoogle,
        SignOut
    }

    
}

export default Auth;


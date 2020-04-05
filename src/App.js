import React from 'react';
import './App.css';
import Header from './components/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from './components/Login/useAuth';
import Shipment from './components/Shipment/Shipment';


function App() {
  return (
    
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
              <Route path="/shop">
                <Shop></Shop>
              </Route>
              <Route path="/review">
                <Review></Review>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/inventory">
                <Inventory></Inventory>
              </Route>
              <PrivateRoute path='/shipment'>
                <Shipment></Shipment>
              </PrivateRoute>
              <Route path="/:productKey">
                <ProductDetails></ProductDetails>
              </Route>
              <Route exact path="/">
                <Shop></Shop>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import {Switch,Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './components/Home.js';
import Cart from './components/Cart.js';
import Checkout from './components/Checkout.js';


class App extends Component {
  render() {
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/cart/add/:id' component={Cart} />
          <Route exact path='/checkout' component={Checkout} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';
import Modal from './components/Modal';



class App extends Component {
  render() {
    return (
      /* react.fragment sera converti en section ou div */
    <React.Fragment>
      <Navbar />
      {/* balise de rootage */}
      <Switch >
        {/* link du path a son composant */}
        {/* exact sert ici a ne pas ecraser les autres requetes
            qui contiennent d'abord des / avant le param */}
        <Route exact path="/" component={ProductList} />
        <Route path="/details" component={Details} />
        <Route path="/cart" component={Cart} />
        <Route component={Default} />
      </Switch>
      <Modal/>
    </React.Fragment>

      );
    }
}

export default App;

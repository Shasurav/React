import React from 'react';
import {Route} from 'react-router-dom'
import Layout from './component/Layout/Layout';
import BurgerBuilder from './container/BurgeBuilder/Burgerbuilder';
import Checkout from './container/Checkout/Checkout';
import Orders from './container/Orders/Orders';


function App() {
  return (
    <div >
      <Layout>
        <Route path='/' exact component={BurgerBuilder}/>
        <Route path='/checkout' component={Checkout}/>
        <Route path='/orders' component={Orders}/>
      </Layout>
    </div>
  );  
}

export default App;
 
import React from 'react';
 
import Layout from './component/Layout/Layout';
import BurgerBuilder from './container/BurgeBuilder/Burgerbuilder';
function App() {
  return (
    <div >
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );  
}

export default App;
 
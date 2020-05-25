import React ,{Component}from 'react';
import {Route} from 'react-router-dom'
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummay';
import Contact from './Contact/Contact'; 

class Checkout extends Component {

    state = {
        ingredients:null,
        totalPrice: 0
    }
    componentWillMount() {
         const query = new URLSearchParams(this.props.location.search);
         const ingredients = {};
         let price = 0;
         
         for( let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1]
            }
            else {
                ingredients[param[0]] = +param[1]
            }
         }
         this.setState({ingredients: ingredients , totalPrice: price})
    }
    chechkoutCancelHandler = () =>{
        this.props.history.goBack();
    }
    chechkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact');
    }
    render() {
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.chechkoutCancelHandler}
                    checkoutContinue={this.chechkoutContinueHandler}/>
                <Route path={this.props.match.path + '/contact'} 
                       render={(props)=> (<Contact ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>    
            </div>
        );
    }
}

export default Checkout; 


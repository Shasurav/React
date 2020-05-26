import React ,{Component}from 'react';
import {Route , Redirect} from 'react-router-dom'
import { connect} from 'react-redux';

import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummay';
import Contact from './Contact/Contact'; 

class Checkout extends Component {

    chechkoutCancelHandler = () =>{
        this.props.history.goBack();
    }
    chechkoutContinueHandler = () =>{
        this.props.history.replace('/checkout/contact');
    }
    render() {
        let summary = <Redirect to='/'/>

        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null ;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ings}
                        checkoutCancel={this.chechkoutCancelHandler}
                        checkoutContinue={this.chechkoutContinueHandler}/>
                    <Route path={this.props.match.path + '/contact'} 
                            component={Contact}/>    
                </div>
            );
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout); 


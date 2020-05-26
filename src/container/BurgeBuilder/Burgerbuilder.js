import React, {Component} from 'react';
import { connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {


    state = {
        purchasing : false,
        loading:false
    }
    componentDidMount() {
        this.props.onInitIngredients();
    }
    updatePurchaseState (updatedState) {

        const sum = Object.keys(updatedState)
            .map((igkey => {
                return updatedState[igkey];
            }))
            .reduce((sum , el) => {
                return sum+el
            },0);

            return sum > 0;

    }

    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing : false});

    }
    purchaseContinueHandler =() =>{
        this.props.onPurchaseInit();
        this.props.history.push('/checkout')
    }
    render(){
        let orderSummary = null;
       
        
        let burger = this.props.error ? <p>Ingredients can't be loaded!!</p> : <Spinner />
        if(this.props.ings){
            
            burger = (
                <Aux>
                    <Burger ingredients= {this.props.ings}/>
                    <BuildControls 
                    ingredientAdded= {this.props.onIngredientAdded} 
                    ingredientRemove= {this.props.onIngredientRemoved}
                    price={this.props.price}
                    clicked= {this.purchaseHandler}
                    purchasable={this.updatePurchaseState(this.props.ings)}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients= {this.props.ings}
            price={this.props.price}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}/>
        } 
        if(this.state.loading){
            orderSummary = <Spinner />
        }   
        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    hide= {this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatcToProps = dispatch => {
    return {
        onIngredientAdded:(ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()) 
    }
}


export default connect(mapStateToProps,mapDispatcToProps)(errorHandler(BurgerBuilder,axios));
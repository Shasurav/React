import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad :0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component {


    state = {
        ingredients : {
            salad : 0,
            meat : 0,
            cheese : 0,
            bacon : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    }

    UpdatePurchaseState (updatedState) {

        const sum = Object.keys(updatedState)
            .map((igkey => {
                return updatedState[igkey];
            }))
            .reduce((sum , el) => {
                return sum+el
            },0);

            this.setState({purchasable : sum > 0})

    }

    addIngredientHandler = (type) => {
        const UpdateCount = this.state.ingredients[type] + 1;
        const UpdateIngredients = {
            ...this.state.ingredients
        }
        UpdateIngredients[type] = UpdateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;

        this.setState({ingredients: UpdateIngredients, totalPrice: newPrice } );
        this.UpdatePurchaseState(UpdateIngredients);
    }

    removeIngredientHandler = (type) => {
        if(this.state.ingredients[type] <= 0){
            return;
        }
        const UpdateCount = this.state.ingredients[type] - 1;
        const UpdateIngredients = {
            ...this.state.ingredients
        }
        UpdateIngredients[type] = UpdateCount;
        const priceDedudction = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice - priceDedudction;

        this.setState({ingredients: UpdateIngredients, totalPrice: newPrice } );
        this.UpdatePurchaseState(UpdateIngredients);

    }
    modalStateHandler = () =>{
        this.setState({purchasing : true});
    }
    modalHideHandler = () => {
        this.setState({purchasing : false});

    }
    render(){
        return(
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    hide= {this.modalHideHandler}> 
                    <OrderSummary ingredients= {this.state.ingredients}/>
                </Modal>
                <Burger ingredients= {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded= {this.addIngredientHandler} 
                    ingredientRemove= {this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    clicked= {this.modalStateHandler}
                    purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
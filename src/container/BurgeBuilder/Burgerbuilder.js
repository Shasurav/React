import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';


const INGREDIENT_PRICES = {
    salad :0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
}
class BurgerBuilder extends Component {


    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading:false,
        error: false
    }
    componentDidMount() {
        axios.get( 'https://myreact-burger-e2514.firebaseio.com/ingredients.json')
            .then(response => this.setState({ingredients : response.data}))
            .catch(error => {
                this.setState({error : true})
            })
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
    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing : false});

    }
    purchaseContinueHandler =() =>{
    //   alert('continue prchasing !!');
    this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name:'Shashank',
                email:'test@test.com',
                address:{
                    street:'test street',
                    pincode:'123455',
                    country:'India'
                },
                deliveryMethod:'fastest'
            }
        }
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false , purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false , purchasing: false});
            });
    }
    render(){
        let orderSummary = null;
       
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!!</p> : <Spinner />
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients= {this.state.ingredients}/>
                    <BuildControls 
                    ingredientAdded= {this.addIngredientHandler} 
                    ingredientRemove= {this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    clicked= {this.purchaseHandler}
                    purchasable={this.state.purchasable}/>
                </Aux>
            );
            orderSummary = <OrderSummary 
            ingredients= {this.state.ingredients}
            price={this.state.totalPrice}
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

export default errorHandler(BurgerBuilder,axios);
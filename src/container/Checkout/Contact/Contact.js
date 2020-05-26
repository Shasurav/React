import React  ,{ Component} from 'react';
import { connect} from 'react-redux';

import classes from './Contact.css';
import Button from '../../../component/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';
import errorHandler from '../../../hoc/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../../store/actions/index';

class Contact extends Component {
        state = {
            orderForm:{
                    name:{
                        elementType:'input',
                        elementConfig: {
                            type: 'text',
                            placeholder:' your name'
                        },
                        value:''
                    },
                    email:{
                        elementType:'input',
                        elementConfig: {
                            type: 'email',
                            placeholder:' your email'
                        },
                        value:''
                    },
                        street:{
                            elementType:'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'street'
                            },
                            value:''
                        },
                        pincode:{
                            elementType:'input',
                            elementConfig: {
                                type: 'text',
                                placeholder:'pincode'
                            },
                            value:''
                        },
                        country:{
                            elementType:'input',
                            elementConfig: {
                                type: 'text',
                                placeholder:'Country'
                            },
                            value:''
                        },
                        deliveryMethod:{
                            elementType:'select',
                            elementConfig: {
                                options: [
                                    {value:'fastest',displayValue:'Fastest'},
                                    {value:'cheapest',displayValue:'Cheapest'}
                                ]
                            },
                            value:'fastest'
                        }
            },
            loading: false
        }
        OrderHandler = (event)=> {
            event.preventDefault();
            this.setState({loading: true});
            let formElementData = {};
            for(let formElement in this.state.orderForm){
                formElementData[formElement] = this.state.orderForm[formElement].value
            }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer:formElementData
        }
        this.props.onOrderBurger(order);
        
        }
        inputEventHandler = (event , identifier) =>{
            const updatedrderForm = {
                ...this.state.orderForm
            }
            const updatedFormElement = {
                ...updatedrderForm[identifier]
            }
            updatedFormElement.value = event.target.value;
            updatedrderForm[identifier] = updatedFormElement
            this.setState({orderForm: updatedrderForm})
        }
        render(){
            const formElementArray = [];
            for(let key in this.state.orderForm){
                formElementArray.push({
                    id:key,
                    config:this.state.orderForm[key]
                })
            }
            let form = (
                <form onSubmit={this.OrderHandler}>
                            {formElementArray.map(formElement => (
                                <Input 
                                    key={formElement.id}
                                    changed={(event)=>this.inputEventHandler(event,formElement.id)}
                                    elementType={formElement.config.elementType}
                                    elementConfig={formElement.config.elementConfig}
                                    value={formElement.config.value}/>
                            ))}
                        <Button btnType='Success'> Order</Button>
                    </form>
            );
            if(this.props.loading){

                form = <Spinner />
            }
            return(
                <div className={classes.Contact}>
                    <h4>Your contact!!</h4>
                    {form }
                </div>
            );
        }
}

const mapStateToProps = state => {
    return{
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData) => dispatch(actionTypes.purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Contact,axios));

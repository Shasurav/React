import React  ,{ Component} from 'react';
import classes from './Contact.css';
import Button from '../../../component/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';

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
                            value:''
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
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:formElementData
        }
        axios.post('/orders.json',order)
            .then(response => {
                this.setState({loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
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
            if(this.state.loading){

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

export default Contact

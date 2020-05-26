import React ,{Component} from 'react';
import { connect} from 'react-redux';

import Order from '../../component/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actionTypes from '../../store/actions/index';
import Spinner from '../../component/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount(){
       this.props.onFetchOrders(); 
    }
    render(){
        let order = <Spinner />
        if(this.props.orders){
            order =(
                this.props.orders.map(order =>(
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                ))
            )
        }
        return(
            <div>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        orders : state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onFetchOrders: () => dispatch(actionTypes.fetchOrder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axios));
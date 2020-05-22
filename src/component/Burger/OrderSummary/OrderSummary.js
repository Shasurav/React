import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igkey => {
            return (
                <li key={igkey}>
                    <span style={{textTransform:"capitalize"}}>{igkey}</span> : {props.ingredients[igkey]}
                    </li>
            );
        })
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with follwoing Ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price}</strong></p>
            <Button clicked={props.purchaseCancel} btnType={'Danger'}>Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType={'Success'}>Continue</Button>
        </Aux>
    );
}

export default orderSummary
import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:"Salad", type:'salad'},
    {label:"Meat", type:'meat'},
    {label:"Cheese", type:'cheese'},
    {label:"Bacon", type:'bacon'},
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Total Price is: {props.price.toFixed(2)}</p>
        {controls.map((ctrl) => (
            <BuildControl 
                key={ctrl.label}
                label={ctrl.label}
                added = {()=>props.ingredientAdded(ctrl.type)}
                remove= {()=>props.ingredientRemove(ctrl.type)}/>
        ))}
        <button 
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.clicked}>Order Now</button>
    </div>
);

export default buildControls;
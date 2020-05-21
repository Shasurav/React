import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';


const burger = (props) => {
    let updatedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            // creating array with the ingredient name and quantity "props.ingredients[igkey] " gives the quantity
            return [...Array(props.ingredients[igkey])].map( (_,i) => {
                return <BurgerIngredient key={igkey + i} type={igkey}/>
            });
        })
        .reduce((arr , el) => {
            return arr.concat(el)
        },[]);
    if(updatedIngredients.length === 0){
        updatedIngredients = <p>Please add ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {updatedIngredients}
            <BurgerIngredient type='bread-bottom'/>

        </div>
    );
}

export default burger;
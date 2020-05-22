import React from 'react';
import classes from './NavigationItems.css';

const navigationItems = () =>(

    <ul className={classes.NavigationItems}>
        <li><a className={classes.active}>Burger Builder</a></li>
        <li><a>Checkout</a></li>

    </ul>

);

export default navigationItems;
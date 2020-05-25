import React from 'react';
import classes from './NavigationItems.css';
import {NavLink} from 'react-router-dom'

const navigationItems = () =>(

    <ul className={classes.NavigationItems}>
        <li><NavLink to='/' exact>Burger Builder</NavLink></li>
        <li><NavLink to='/orders'>Orders</NavLink></li>

    </ul>

);

export default navigationItems;
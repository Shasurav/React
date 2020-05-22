import React from 'react';
import classes from './Sidebar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sidebar = (props) => {
    let updateClass = [classes.Sidebar , classes.Close]
    if(props.open){
        updateClass = [classes.Sidebar , classes.Open]
    }
    return (
        <Aux>
            <Backdrop clicked={props.closed} show={props.open}/>
            <div className={updateClass.join(' ')}>
                <div style={{height: '11%' , marginBottom: '32px'}}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    );
};

export default sidebar;
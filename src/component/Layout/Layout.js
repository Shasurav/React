import React , {Component} from 'react' ;

import Aux from '../../hoc/Aux' ;
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidebar from '../Navigation/Sidebar/Sidebar';

class Layout extends Component {
    
    state = {
        showSideBar : true
    }
    sideBarClosedHandler = ()=> {
        this.setState({showSideBar : false})
    }
    sideBarToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideBar: ! prevState.showSideBar}
        })
    }
    render() {
        return(  <Aux>
            <Toolbar toggleSidebar={this.sideBarToggleHandler}/>
            <Sidebar  open={this.state.showSideBar} closed={this.sideBarClosedHandler}/>
            <main className={classes.Content}>
                {this. props.children}
            </main>
        </Aux>)
    }
}

export default Layout; 
import { Button, withStyles } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import React from 'react';
import './App.css';
import Cart from './components/Cart.js';
import NavBar from './components/NavBar.js';
import Product from './components/Products.js';

const drawerHeight = "100pc";

const styles = (theme) => ({
  drawer: {
    height: drawerHeight,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    height: drawerHeight,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowY: 'hidden',
    height: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      height: theme.spacing(6) + 1,
    },
  }
})

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      beerSelection: "Pizza",
      cartOpen: false
    }
  }

  setBeerSelection(beerSelection) {
    this.setState({beerSelection: beerSelection})
  }

  toggleDrawer(event, open) {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({cartOpen: open});
  };

  render() {
    const { classes } = this.props
    return (
      <div>
        <NavBar beerSelection={this.state.beerSelection} setBeerSelection={(beerSelection) => this.setBeerSelection(beerSelection)} />
        <Product beerSelection={this.state.beerSelection} setBeerSelection={(beerSelection) => this.setBeerSelection(beerSelection)} />
        <SwipeableDrawer
            variant="permanent"
            anchor="bottom"
            open={this.state.cartOpen}
            onClose={(event) => this.toggleDrawer(event, false)}
            onOpen={(event) => this.toggleDrawer(event, true)}
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: this.state.cartOpen,
              [classes.drawerClose]: !this.state.cartOpen,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: this.state.cartOpen,
                [classes.drawerClose]: !this.state.cartOpen,
              })
            }}
          >
            <Button onClick={() => this.setState({cartOpen: !this.state.cartOpen})}>
              {this.state.cartOpen ? "Close" : "Cart" }
              </Button>
            <Cart open={this.state.cartOpen}/>
          </SwipeableDrawer>
      </div>
    );
  }
}

export default withStyles(styles)(App);

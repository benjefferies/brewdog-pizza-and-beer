import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { AppBar } from '@material-ui/core';

const useStyles = makeStyles({
  navBar: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    height: 50
  },
});

function NavBar(props) {
  const { setBeerSelection, beerSelection } = props;
  const classes = useStyles();
  return (
    <AppBar position="fixed">
      <BottomNavigation
        value={beerSelection}
        onChange={(_, beerSelection) => {
          setBeerSelection(beerSelection)
        }}
        showLabels
        className={classes.navBar}
      >
        <BottomNavigationAction label="Pizza" value="Pizza" icon={<LocalPizzaIcon />} />
        <BottomNavigationAction label="Steak" value="Steak" icon={<FastfoodIcon />} />
        <BottomNavigationAction label="All" value="All" icon={<AllInclusiveIcon />} />
      </BottomNavigation>
    </AppBar>
  );
}
const beers = [
  "Pizza", "Steak", "All"
]
export { NavBar as default, beers };
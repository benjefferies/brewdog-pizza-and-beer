import { AppBar } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';
import React from 'react';

const useStyles = makeStyles({
  navBar: {
    width: '100%',
    height: 50
  },
});

function NavBar(props) {
  const { setBeerSelection, beerSelection } = props;
  const classes = useStyles();
  return (
    <AppBar position="static">
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

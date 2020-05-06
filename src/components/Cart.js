import { Grid, Paper, Typography, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import Beer from "./Beer";

const styles = (theme) => ({
  deleteButton: {
    marginRight: theme.spacing(2),
  },
  checkoutCart: {
    padding: theme.spacing(2),
    maxHeight: "70vh",
    overflow: "auto",
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(20),
    },
  }
});

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      beers: [],
    };
  }

  getCart() {
    let beers = JSON.parse(localStorage.getItem("cart"));
    if (!beers) {
      beers = [];
    }
    return beers;
  }

  deleteBeer(beer) {
    let beers = JSON.parse(localStorage.getItem("cart"));
    if (beers) {
      let indexToDelete = -1;
      for (let i = 0; i < beers.length; i++) {
        if (beer["id"] === beers[i]["id"]) {
          indexToDelete = i;
          break;
        }
      }
      if (indexToDelete > -1) {
        beers.splice(indexToDelete, 1);
      }
    }
    localStorage.setItem("cart", JSON.stringify(beers));
    this.setState({ beers: beers });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      let beers = JSON.parse(localStorage.getItem("cart"));
      this.setState({ beers: beers });
    }
  }

  render() {
    const classes = this.props.classes;
    const beers = this.state.beers.map((beer, i) => (
      <Grid key={i + "beer"} item xs={6} md={3} className={classes.product}>
        <Beer beer={beer} />
        <IconButton
          edge="start"
          className={classes.deleteButton}
          color="inherit"
          aria-label="menu"
          onClick={() => this.deleteBeer(beer)}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    ));
    const total = this.state.beers
      .map((b) => b.abv)
      .reduce((b1, b2) => b1 + b2, 0);
    const body = (
      <Paper className={classes.checkoutCart}>
        <Grid container alignItems={"flex-end"}>
          {beers}
          <Grid item xs={12}>
          <Typography>Total: £{total}</Typography>
          </Grid>
          <Grid item xs={6}>
          <Button color="primary">Checkout</Button>
          </Grid>
        </Grid>
      </Paper>
    );

    return (
      <Paper>
          {body}
      </Paper>
    );
  }
}
export default withStyles(styles)(Cart);

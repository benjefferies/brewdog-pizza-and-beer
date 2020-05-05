import { Grid, withStyles, Paper, Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import Toolbar from "@material-ui/core/Toolbar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import Beer from "./Beer";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  deleteButton: {
    marginRight: theme.spacing(2),
  },
  media: {
    height: 140,
    width: "auto",
    margin: "auto",
  },
  description: {
    textAlign: "center",
  },
  checkoutCart: {
    padding: theme.spacing(2),
    maxHeight: "70vh",
    overflow: "auto",
  },
  modalStyle: {
    position: "absolute",
    top: "10%",
    left: "10%",
    overflow: "scroll",
    height: "100%",
    display: "block",
  },
  modelImage: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: 140,
  },
});

class CartNavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
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
    let open = true;
    if (beers.length === 0) {
      open = false;
    }
    this.setState({ beers: beers, open: open });
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
          <Grid item xs={6}>
          <Button
            onClick={() => this.setState({ open: false })}
            color="secondary"
          >
            Close
          </Button>
          </Grid>
        </Grid>
      </Paper>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.cartButton}
              color="inherit"
              aria-label="menu"
              onClick={() =>
                this.setState({ open: true, beers: this.getCart() })
              }
            >
              <ShoppingCartIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Modal
          open={this.state.open}
          onClose={() => console.log("")}
          className={classes.modalStyle}
        >
          {body}
        </Modal>
      </div>
    );
  }
}
export default withStyles(styles)(CartNavBar);

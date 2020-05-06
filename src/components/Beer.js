import { Button, Card, Grid, withStyles } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import React from "react";

const styles = (theme) => ({
  media: {
    height: 140,
    width: "auto",
    margin: "auto",
  },
  description: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    maxHeight: "70vh",
    overflow: 'auto'
  },
  text: {
    textAlign: "center"
  },
  modalStyle:{
    position:'absolute',
    top:'10%',
    left:'10%',
    overflow:'scroll',
    height:'100%',
    display:'block',
    [theme.breakpoints.up('lg')]: {
      paddingLeft: "25%",
      width: "50%",
    },
  },
  modelImage: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    height: 140,
  },
  product: {
    padding: theme.spacing(1),
  },
});

class Beer extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  getCart() {
    let beers = JSON.parse(localStorage.getItem("cart"))
    if (!beers) {
      beers = []
    }
    return beers
  }

  addBeer(beer) {
    let beers = this.getCart()
    beers.push(beer)
    localStorage.setItem("cart", JSON.stringify(beers));
  }

  render() {
    const { classes, beer } = this.props;
    const { image_url, name, abv, description, tagline, food_pairing } = beer;
    const body = (
      <Paper className={classes.paper}>
        <Grid container alignContent="center">
          <Grid item xs={4}/>
          <Grid item xs={4}>
            <img className={classes.modelImage} src={image_url} alt={name}/>
          </Grid>
          <Grid className={classes.text} item xs={12}>
            <h2>{name}</h2>
            <h4>{abv}% abv</h4>
          </Grid>
          <Grid className={classes.text} item xs={2}></Grid>
          <Grid item xs={8}>
            <p>{tagline}</p>
            <p>Food pairing</p>
            <ul>
            {food_pairing.map((f) => (
              <li key={f}>{f}</li>
            ))}
            </ul>
            <p>{description}</p>
          </Grid>
          <Grid item xs={6} md={4}>
          <Button color="primary" onClick={() => {
            this.addBeer(beer)
            this.setState({open: false})
          }}>
            Add
          </Button>
          </Grid>
          <Grid item xs={6} md={4}>
          <Button onClick={() => this.setState({open: false})} color="secondary">
            Close
          </Button>
          </Grid>
        </Grid>
      </Paper>
    );
    return (
      <div>
        <Card className={classes.root}>
          <CardActionArea onClick={() => this.setState({ open: true })}>
            <CardMedia
              className={classes.media}
              image={image_url}
              title={name}
              component="img"
            />
            <CardContent className={classes.description}>
              <Typography variant="body1" color="textSecondary" component="p">
                {name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {abv}% abv
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Modal
          open={this.state.open}
          onClose={() => console.log("")}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className={classes.modalStyle}
        >
          {body}
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(Beer);

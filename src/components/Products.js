import React from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Grid from "@material-ui/core/Grid";
import Beer from "./Beer";
import { beers } from "./NavBar";
import { withStyles } from "@material-ui/core";
import { Swipeable } from 'react-swipeable'

const styles = (theme) => ({
  product: {
    padding: theme.spacing(1)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(20),
      paddingRight: theme.spacing(20),
    },
  }
});

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      beers: [],
      page: 1,
      hasMore: true
    };
  }

  fetchData() {
    this.fetchDataByPage(1);
  }

  fetchDataByPage(page) {
    let queryParams =
      this.props.beerSelection === "" ||
      this.props.beerSelection === "All"
        ? {}
        : { food: this.props.beerSelection };
    queryParams = {...queryParams, per_page: 25, page: page}
    axios
      .get("https://api.punkapi.com/v2/beers", { params: queryParams })
      .then((response) => {
        let beers = this.state.beers
        let newBeers = response.data
        let hasMore = true;
        if (newBeers.length < queryParams.per_page || beers.includes(newBeers[newBeers.length - 1])) {
          hasMore = false;
        }
        if (beers.length === 0) {
          beers = beers.concat(newBeers)
        } else if (newBeers.length > 0 && !beers.includes(newBeers[newBeers.length - 1])) {
          beers = beers.concat(newBeers)
        }
        this.setState({ beers: beers, hasMore: hasMore, page: page });
      });
  }

  refresh() {}

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.beerSelection !== this.props.beerSelection) {
      this.setState({
        beers: [],
        page: 1,
        hasMore: true
      })
      this.fetchData();
    }
  }

  swipe(eventData) {
    const allBeerTypes = beers
    if (eventData.dir === "Right") { 
      const isFirst = allBeerTypes[0] === this.props.beerSelection
      if (!isFirst) {
        this.props.setBeerSelection(allBeerTypes[allBeerTypes.indexOf(this.props.beerSelection) - 1])
      }
    } else if (eventData.dir === "Left") {
      const isLast = allBeerTypes[allBeerTypes.length - 1] === this.props.beerSelection
      if (!isLast) {
        this.props.setBeerSelection(allBeerTypes[allBeerTypes.indexOf(this.props.beerSelection) + 1])
      }
    }
  }

  render() {
    const { classes } = this.props;
    const beers = this.state.beers.map((beer) => (
      <Grid key={beer.name} item xs={6} md={3} className={classes.product}>
        <Beer
          beer={beer}
        />
      </Grid>
    ));
    return (
      <Swipeable onSwiped={(eventData) => this.swipe(eventData)} >
        <InfiniteScroll
          dataLength={this.state.beers.length} //This is important field to render the next data
          next={() => this.fetchDataByPage(this.state.page + 1)}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
        >
          <Grid container alignItems={"flex-end"} className={classes.container}>
            {beers}
          </Grid>
        </InfiniteScroll>
      </Swipeable>
    );
  }
}

export default withStyles(styles)(Product);

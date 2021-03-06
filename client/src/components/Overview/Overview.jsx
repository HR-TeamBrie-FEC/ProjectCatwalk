import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ProductDetails from './ProductDetails.jsx'
import ImageGallery from './ImageGallery.jsx'

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles({
  root: {
    margin: '20px 0 20px 0'
  },

  prodOverview: {
    padding: "20px",
  },

  featureList: {
    padding: "20px",
    borderLeft: "solid 3px black"
  }
});


const Overview = ({ handleClick, product, productMeta }) => {
  const classes = useStyles();
  const [styles, setStyles] = useState([]);
  const [styleIndex, setStyleIndex] = useState(0);

  useEffect(() => {
    axios.get(`/api/products/${product.id}/styles`)
    .then(({ data }) => {
      setStyles(data.results);
      setStyleIndex(0);
    }).catch((err) => {
      console.log('Unable to retireve product details')
    });
  }, [product])


  if ( !styles?.length || !styles[styleIndex]?.photos ) {
    return <CircularProgress />
  }

  const showDetails = () => {
    let { slogan, description, features } = product;

    if (!!slogan || !!description || !!features ) {
      return (
        <Grid container className={classes.root}>
          <Grid item xs={12} lg={7} className={classes.prodOverview}>
            <Typography variant="h5" gutterBottom>
              {slogan}
            </Typography>
            <Typography variant="body1">
              {description}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={5} className={classes.featureList}>
            <List component="nav">
              {features.map(({ feature, value }, featureIndex) => {
                return (
                  <ListItem key={featureIndex}>
                    <ListItemIcon>
                      <i className="material-icons">done</i>
                    </ListItemIcon>
                    <ListItemText primary={`The ${feature} are ${value}`}/>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      )
    } else {
      return null
    }
  };

  return (
      <Grid
        onClick={(e) => handleClick(e, 'Overview')}
        container
        alignItems="flex-start"
      >
        <Grid item xs={12} lg={7}>
          <ImageGallery
          photos={styles[styleIndex].photos}
          />
        </Grid>
        <Grid item xs={12} lg={5}>
          <ProductDetails
            product={product}
            productMeta={productMeta}
            styles={styles}
            styleIndex={styleIndex}
            setStyleIndex={setStyleIndex}
          />
        </Grid>
        {showDetails()}
      </Grid>
  )
}

export default Overview;
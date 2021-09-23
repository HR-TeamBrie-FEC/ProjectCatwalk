import React, { useState } from 'react';
import { Typography, Grid, Slider, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AverageRating from '../AverageRating.jsx';

const useStyles = makeStyles({
  caption: {
    padding: '3px 0px',
    'text-align': 'center'
  }
});

const RatingsBreakdown = ({ productMeta, filterReviews }) => {
  const [totalRatings, setTotalRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const classes = useStyles();

  const handleClick = rating => {
    filterReviews(rating);
  };

  const recommendPercentage =
    totalRatings > 0
      ? Math.ceil((Number(productMeta.recommended.true) / totalRatings) * 100)
      : null;

  const totalRatingsAtValue = rating => {
    if (!productMeta.ratings[rating]) {
      return <Typography variant='caption'>{`(0)`}</Typography>;
    } else {
      return (
        <Typography variant='caption'>{`(${productMeta.ratings[rating]})`}</Typography>
      );
    }
  };

  return (
    <Grid container direction='column'>
      <Grid item xs={12} container>
        <Grid item xs={12} md={3}>
          <Typography variant='h3'>{avgRating}</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <AverageRating
            productMeta={productMeta}
            totalRatingsSetter={setTotalRatings}
            averageRatingSetter={setAvgRating}
          />
        </Grid>
        <Grid className={classes.caption} item xs={12}>
          <Typography
            variant='body2'
            gutterBottom
          >{`${recommendPercentage}% of reviews recommend this product`}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid className={classes.caption} item xs={3}>
          <Typography variant='caption'>
            <Link
              component='button'
              underline='always'
              color='inherit'
              onClick={() => handleClick(5)}
            >
              5 Stars
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={Number(productMeta.ratings['5'])}
            min={1}
            max={totalRatings}
            disabled
          />
        </Grid>
        <Grid className={classes.caption} item xs={2}>
          {totalRatingsAtValue(5)}
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid className={classes.caption} item xs={3}>
          <Typography variant='caption'>
            <Link
              component='button'
              underline='always'
              color='inherit'
              onClick={() => handleClick(4)}
            >
              4 Stars
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={Number(productMeta.ratings['4'])}
            min={1}
            max={totalRatings}
            disabled
          />
        </Grid>
        <Grid className={classes.caption} item xs={2}>
          {totalRatingsAtValue(4)}
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid className={classes.caption} item xs={3}>
          <Typography variant='caption'>
            <Link
              component='button'
              underline='always'
              color='inherit'
              onClick={() => handleClick(3)}
            >
              3 Stars
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={Number(productMeta.ratings['3'])}
            min={1}
            max={totalRatings}
            disabled
          />
        </Grid>
        <Grid className={classes.caption} item xs={2}>
          {totalRatingsAtValue(3)}
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid className={classes.caption} item xs={3}>
          <Typography variant='caption'>
            <Link
              component='button'
              underline='always'
              color='inherit'
              onClick={() => handleClick(2)}
            >
              2 Stars
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={Number(productMeta.ratings['2'])}
            min={1}
            max={totalRatings}
            disabled
          />
        </Grid>
        <Grid className={classes.caption} item xs={2}>
          {totalRatingsAtValue(2)}
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid className={classes.caption} item xs={3}>
          <Typography variant='caption'>
            <Link
              component='button'
              underline='always'
              color='inherit'
              onClick={() => handleClick(1)}
            >
              1 Star
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Slider
            value={Number(productMeta.ratings['1'])}
            min={1}
            max={totalRatings}
            disabled
          />
        </Grid>
        <Grid className={classes.caption} item xs={2}>
          {totalRatingsAtValue(1)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RatingsBreakdown;

import React, { useState } from 'react';
import axios from 'axios';

import Cart from './Cart.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import { FacebookShareButton, PinterestShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, PinterestIcon, TwitterIcon } from 'react-share';

const useStyles = makeStyles({
  cartButton: {
    cursor: 'pointer'
  }
})

const SocialMediaShare = ({ productName, photoUrl }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartData, setCartData] = useState(['Empty Cart'])
  const classes = useStyles();
  const iconSize = 32;
  const productURL = 'http://localhost:3000';
  const message = `Check out this ${productName}`

  const openShoppingCart = () => {
    axios.get('/api/cart')
    .then(({ data }) => {
      setCartData(data)
      setCartOpen(true)
    }).catch((err) => {
      console.log('Unable to retrieve cart data')
    })
  }

  const closeShoppingCart = () => {
    setCartOpen(false)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3} className={classes.cartButton} onClick={openShoppingCart}>
        <i className="material-icons" style={{ fontSize: `${iconSize}px`}}>shopping_cart</i>
      </Grid>
      <Grid item xs={12} md={3}>
        <FacebookShareButton quote={message} hashtag="#ProjectCatwalk" url={productURL}>
          <FacebookIcon size={iconSize} round={true} />
        </FacebookShareButton>
      </Grid>
      <Grid item xs={12} md={3}>
        <TwitterShareButton title={message} hashtags={["ProjectCatwalk"]} url={productURL}>
          <TwitterIcon size={iconSize} round={true} />
        </TwitterShareButton>
      </Grid>
      <Grid item xs={12} md={3}>
      <PinterestShareButton media={photoUrl} description={`${message} from Project Catwalk`} url={productURL}>
        <PinterestIcon size={iconSize} round={true} />
      </PinterestShareButton>
      </Grid>
      <Modal open={cartOpen} onClose={closeShoppingCart}>
        <Cart cartData={cartData}/>
      </Modal>
    </Grid>
  )
};


export default SocialMediaShare;
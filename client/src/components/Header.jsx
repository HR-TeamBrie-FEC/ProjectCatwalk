import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "rgb(63, 81, 181)",
    width: '100vw',
  },
  logo: {
    fontFamily: "'Special Elite', cursive",
    fontWeight: 600,
    fontSize: "40px",
    color: "white",
    textAlign: "left",
    letterSpacing: "1px"
  },
}));

const Header = ({ handleClick }) => {
  const classes = useStyles();

  const klosetLogo = (
    <h1 className={classes.logo}>
      BDKloset
    </h1>
  );

  return (
    <header onClick={(e) => handleClick(e, 'Header')}>
      <AppBar position="sticky" className={classes.header}>
        <Toolbar>{klosetLogo}</Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
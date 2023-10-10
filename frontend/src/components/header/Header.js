import React from 'react';
import styles from './Header.module.css';
import {Typography} from "@mui/material";

const Header = () => {
  return (
    <div className={styles.main}>
      <Typography
        fontSize={'var(--font-size-md)'}
        fontWeight={'bold'}
        color={'var(--text-secondary-color)'}
        pl={'var(--space-md)'}
      >
        Stickernizer
      </Typography>
    </div>
  );
}

export default Header;
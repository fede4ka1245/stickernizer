import React from 'react';
import styles from './ListItem.module.css';
import {Grid, Typography} from "@mui/material";

const ListItem = ({ image, text, endListContent }) => {
  return (
    <div className={styles.main}>
      {image && <Grid width={'42px'} height={'42px'}>
        <img src={image} alt={'list-image'} className={styles.image} />
      </Grid>}
      {!image && <Grid width={'42px'} height={'42px'} bgcolor={'var(--hint-color)'} borderRadius={'var(--border-radius-sm)'}/>}
      <Grid flex={1} ml={'var(--space-sm)'}>
        <Typography color={'var(--hint-color)'} fontWeight={'bold'}>
          {text}
        </Typography>
      </Grid>
      <Grid height={'42px'}>
        {endListContent}
      </Grid>
    </div>
  );
};

export default ListItem;
import React, {useMemo} from 'react';
import ListItem from "../../../../../ui/listItem/ListItem";
import {Grid} from "@mui/material";
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import styles from './Layer.module.css';

const Layer = ({ layer }) => {
  const label = useMemo(() => {
    if (layer.name) {
      return layer.name;
    }

    if (layer.text) {
      return `Layer "${layer.text}"`;
    }

    return "Default Layer";
  }, [layer]);

  return (
    <>
      <ListItem
        text={label}
        endListContent={<>
          <Grid display={'flex'} height={'inherit'}>
            <Grid
              className={styles.tappable}
              display={'flex'}
              alignItems={'center'}
              border={'var(--element-border)'}
              borderRadius={'var(--border-radius-md)'}
              mr={'var(--space-sm)'}
            >
              <MoreVertRoundedIcon
                fontSize={'medium'}
                sx={{
                  color: 'var(--primary-color)'
                }}
              />
            </Grid>
            <Grid
              className={styles.tappable}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              border={'var(--element-border)'}
              borderRadius={'var(--border-radius-md)'}
              width={'42px'}
              height={'42pxs'}
            >
              <ReorderRoundedIcon
                fontSize={'medium'}
                sx={{
                  color: 'var(--primary-color)'
                }}
              />
            </Grid>
          </Grid>
        </>}
      />
    </>
  );
};

export default Layer;
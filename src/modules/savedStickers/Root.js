import React from 'react';
import {Grid, Typography} from "@mui/material";
import ButtonBackPanel from "../../components/buttonBackPanel/ButtonBackPanel";

const Root = () => {
  return (
    <>
      <ButtonBackPanel>
        <Typography
          fontSize={'var(--font-size-md)'}
          fontWeight={'bold'}
          color={'var(--text-secondary-color)'}
          pl={'var(--space-sm)'}
        >
          Saved Stickers
        </Typography>
      </ButtonBackPanel>
    </>
  );
};

export default Root;
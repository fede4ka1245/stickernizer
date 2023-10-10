import React, {useCallback} from 'react';
import {useNavigate} from "react-router-dom";
import {Grid} from "@mui/material";
import ButtonBack from "../../ui/buttonBack/ButtonBack";

const ButtonBackPanel = ({ onButtonBackClick, children }) => {
  const navigate = useNavigate();

  const onBackClick = useCallback(() => {
    if (onButtonBackClick) {
      onButtonBackClick();
    } else {
      navigate(-1);
    }
  }, [onButtonBackClick]);

  return (
    <>
      <Grid
        position={'sticky'}
        left={0}
        top={0}
        display={'flex'}
        alignItems={'center'}
        ml={'var(--space-sm)'}
        mr={'var(--space-sm)'}
        pt={'var(--space-md)'}
        mb={'var(--space-md)'}
      >
        <Grid mr={'var(--space-sm)'}>
          <ButtonBack onClick={onBackClick} />
        </Grid>
        {children}
      </Grid>
    </>
  );
};

export default ButtonBackPanel;
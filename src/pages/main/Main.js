import React, {useCallback} from 'react';
import {Grid, Typography} from "@mui/material";
import Tappable from "../../ui/tappable/Tappable";
import {useNavigate} from "react-router-dom";
import {routes} from "../../routes";
import Logo from "../../ui/logo/Logo";

const Main = () => {
  const navigate = useNavigate();

  const onAboutClick = useCallback(() => {
    window.open('https://bragin-f.notion.site/Stickernizer-ca9ceff586aa41f39dc1bc9f92ce4075?pvs=4');
  }, []);

  const onSavedStickersClick = useCallback(() => {
    navigate(routes.savedStickers)
  }, []);

  const onStickersEditorClick = useCallback(() => {
    navigate(routes.stickerEditor)
  }, []);

  return (
    <>
      <Grid
        m={'var(--space-sm)'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        height={'250px'}
      >
        <Logo />
      </Grid>
      <Tappable onClick={onStickersEditorClick}>
        <Grid
          m={'var(--space-sm)'}
          display={'flex'}
          justifyContent={'center'}
          borderRadius={'var(--border-radius-lg)'}
          backgroundColor={'var(--bg-color)'}
          border={'var(--element-border)'}
          flexDirection={'column'}
          p={'var(--space-md)'}
        >
          <Typography
            fontSize={'var(--font-size-md)'}
            lineHeight={'var(--font-size-lg)'}
            color={'var(--text-primary-color)'}
          >
            Create sticker
          </Typography>
        </Grid>
      </Tappable>
      <Tappable onClick={onSavedStickersClick}>
        <Grid
          m={'var(--space-sm)'}
          display={'flex'}
          justifyContent={'center'}
          borderRadius={'var(--border-radius-lg)'}
          backgroundColor={'var(--bg-color)'}
          border={'var(--element-border)'}
          flexDirection={'column'}
          p={'var(--space-md)'}
        >
          <Typography
            fontSize={'var(--font-size-md)'}
            lineHeight={'var(--font-size-lg)'}
            color={'var(--text-primary-color)'}
          >
            Saved stickers
          </Typography>
        </Grid>
      </Tappable>
      <Tappable onClick={onAboutClick}>
        <Grid
          m={'var(--space-sm)'}
          display={'flex'}
          justifyContent={'center'}
          borderRadius={'var(--border-radius-lg)'}
          backgroundColor={'var(--bg-color)'}
          border={'var(--element-border)'}
          flexDirection={'column'}
          p={'var(--space-md)'}
        >
          <Typography
            fontSize={'var(--font-size-md)'}
            lineHeight={'var(--font-size-lg)'}
            color={'var(--text-primary-color)'}
          >
            About
          </Typography>
        </Grid>
      </Tappable>
    </>
  );
};

export default Main;
import React from 'react';
import {Grid} from "@mui/material";
import styles from "./Player.module.css";
import PlayerSlider from "../../../../components/playerSlider/PlayerSlider";

const Player = ({ initStickerEditor, progress, isPaused, setIsPaused, onProgressChange, isSmall }) => {
  if (isSmall) {
    return (
      <Grid display={'flex'}>
        <Grid
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={'var(--border-radius-lg)'}
          backgroundColor={'var(--bg-color)'}
          border={'var(--element-border)'}
          mr={'var(--space-sm)'}
        >
          <canvas
            ref={initStickerEditor}
            className={styles.smallCanvas}
          />
        </Grid>
        <Grid
          flex={1}
          border={'var(--element-border)'}
          backgroundColor={'var(--bg-color)'}
          p={'var(--space-md)'}
          borderRadius={'var(--border-radius-lg)'}
        >
          <PlayerSlider
            progress={progress}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            setProgress={onProgressChange}
            showProgress={false}
            size="small"
          />
        </Grid>
      </Grid>
    );
  }


  return (
    <>
      <Grid
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={'var(--border-radius-lg)'}
        mb={'var(--space-sm)'}
        backgroundColor={'var(--bg-color)'}
        border={'var(--element-border)'}
      >
        <canvas
          ref={initStickerEditor}
          className={styles.canvas}
        />
      </Grid>
      <Grid
        border={'var(--element-border)'}
        backgroundColor={'var(--bg-color)'}
        mb={'var(--space-sm)'}
        p={'var(--space-md)'}
        borderRadius={'var(--border-radius-lg)'}
      >
        <PlayerSlider
          progress={progress}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          setProgress={onProgressChange}
          size="small"
        />
      </Grid>
    </>
  );
};

export default Player;
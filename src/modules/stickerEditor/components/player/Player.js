import React from 'react';
import {Grid} from "@mui/material";
import styles from "./Player.module.css";
import PlayerSlider from "../../../../components/playerSlider/PlayerSlider";
import classNames from "classnames";

const Player = ({ initStickerEditor, progress, isPaused, setIsPaused, onProgressChange, isSmall }) => {
  return (
    <>
      <Grid
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mb={'var(--space-sm)'}
        backgroundColor={'var(--bg-color)'}
        borderTop={'var(--element-border)'}
        borderBottom={'var(--element-border)'}
        position={'relative'}
      >
        <canvas
          ref={initStickerEditor}
          className={classNames(styles.canvas, { [styles.smallCanvas]: isSmall })}
        />
        <Grid
          position={'absolute'}
          width={'100%'}
          pl={'var(--space-sm)'}
          pr={'var(--space-sm)'}
          bottom={'0'}
        >
          <PlayerSlider
            progress={progress}
            isPaused={isPaused}
            setIsPaused={setIsPaused}
            setProgress={onProgressChange}
            size="small"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Player;
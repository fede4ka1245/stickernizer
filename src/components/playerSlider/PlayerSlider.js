import React, {useCallback, useState} from 'react';
import Slider from "../../ui/slider/Slider";
import {Fab, Grid} from "@mui/material";
import styles from './PlayerSlider.module.css';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

const PlayerSlider = ({ isPaused, setIsPaused, progress, setProgress }) => {
  const togglePaused = useCallback(() => {
    setIsPaused(!isPaused)
  }, [isPaused]);

  const onChange = useCallback((_, value) => {
    setProgress(value);
  }, []);

  return (
    <Grid display={'flex'} alignItems={'center'} flexDirection={'column'}>
      <Grid mb={'var(--space-sm)'}>
        <div className={styles.startButton} onClick={togglePaused}>
          {!isPaused && <PauseRoundedIcon sx={{ width: '40px', height: '40px', color: 'var(--bg-color)' }} />}
          {isPaused && <PlayArrowRoundedIcon sx={{ width: '40px', height: '40px', color: 'var(--bg-color)' }} />}
        </div>
      </Grid>
      <Slider
        value={progress}
        defaultValue={0}
        onChange={onChange}
      />
    </Grid>
  );
};

export default PlayerSlider;
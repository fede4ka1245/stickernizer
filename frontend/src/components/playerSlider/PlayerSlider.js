import React, {useCallback} from 'react';
import Slider from "../../ui/slider/Slider";
import {Grid} from "@mui/material";
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
    <Grid display={'flex'} alignItems={'center'} flexDirection={'column'} position={'relative'}>
      <Grid position={'absolute'} left={0} top={-50} ml={'var(--space-sm)'} mb={'var(--space-md)'}>
        <div className={styles.startButton} onClick={togglePaused}>
          {!isPaused && <PauseRoundedIcon sx={{ width: '23px', height: '23px', color: 'var(--bg-color)' }} />}
          {isPaused && <PlayArrowRoundedIcon sx={{ width: '23px', height: '23px', color: 'var(--bg-color)' }} />}
        </div>
      </Grid>
      <Slider
        size={'small'}
        value={progress}
        defaultValue={0}
        onChange={onChange}
      />
    </Grid>
  );
};

export default PlayerSlider;
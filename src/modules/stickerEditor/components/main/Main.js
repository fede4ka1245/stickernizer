import React, {useCallback, useEffect} from 'react';
import {Grid} from "@mui/material";
import styles from "../stickerEditor/StickerEditor.module.css";
import PlayerSlider from "../../../../components/playerSlider/PlayerSlider";
import Button from "../../../../ui/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
  changeTiming,
  download,
  initModule, resetMain,
  setProgress,
  toggleIsPaused
} from "../../store/slices/main";

const Main = () => {
  const { progress, isPaused } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const initStickerEditor = useCallback((canvas) => {
    dispatch(initModule({
      canvas,
      onProgressChange: ({ videoTiming, endVideoTiming }) => {
        dispatch(setProgress(videoTiming / endVideoTiming * 100))
      }
    }));
  }, []);

  const onProgressChange = useCallback((progress) => {
    dispatch(changeTiming(progress));
  }, []);

  const setIsPaused = useCallback((isPaused) => {
    dispatch(toggleIsPaused(isPaused));
  }, []);

  const onDownload = useCallback(() => {
    dispatch(download());
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetMain());
    };
  }, []);

  return (
    <Grid>
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
          id={'canvas-id'}
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
      <Grid>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={onDownload}
        >
          Download video
        </Button>
      </Grid>
    </Grid>
  );
};

export default Main;
import React, {useCallback, useEffect} from 'react';
import {Grid} from "@mui/material";
import Button from "../../../../ui/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
  changeTiming,
  download,
  initModule, resetMain,
  setProgress,
  toggleIsPaused
} from "../../store/slices/main";
import Player from "../player/Player";

const Main = () => {
  const { progress, isPaused } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const initStickerEditor = useCallback((canvas) => {
    if (!canvas) return;

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
    <>
      <Player
        init={initStickerEditor}
        progress={progress}
        isPaused={isPaused}
        onProgressChange={onProgressChange}
        setIsPaused={setIsPaused}
      />
      <Grid mt={'auto'} p={'var(--space-sm)'} >
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={onDownload}
        >
          Download video
        </Button>
      </Grid>
    </>
  );
};

export default Main;
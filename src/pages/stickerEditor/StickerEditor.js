import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './StickerEditor.module.css';
import {Grid} from "@mui/material";
import Tabs from '../../ui/tabs/Tabs';
import Tab from '../../ui/tab/Tab';
import PlayerSlider from "../../components/playerSlider/PlayerSlider";
import Button from "../../ui/button/Button";
import Player from "./logic/Player";
import {throttle} from 'lodash';
import TextLayer from "./logic/TextLayer";

const StickerEditor = () => {
  const playerRef = useRef(null);
  const canvasRef = useRef(null);
  const [value, setValue] = React.useState(0);
  const [state, setState] = useState({
    progress: 0,
    isPaused: true,
  });

  const setProgress = useCallback((progress) => {
    setState((state) => ({ ...state, progress }));
  }, []);

  const onProgressChange = useCallback((progress) => {
    playerRef.current.goTo(progress * playerRef.current.endVideoTiming / 100);
    setState((state) => ({ ...state, progress }));
  }, []);

  const setIsPaused = useCallback((isPaused) => {
    setState((state) => ({ ...state, isPaused }));
  }, []);

  const handleChange = useCallback((event, newValue) => {
    setValue(newValue);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      playerRef.current = new Player(canvasRef.current);
      const layer1 = new TextLayer({
        posX: 10,
        posY: 50,
        width: 40,
        height: 80,
        timingStart: 0,
        timingEnd: 1000,
        layerIndex: 1,
        text: 'My'
      });

      const layer2 = new TextLayer({
        posX: 10,
        posY: 90,
        width: 40,
        height: 80,
        timingStart: 1000,
        timingEnd: 2000,
        layerIndex: 1,
        text: 'First'
      });

      const layer3 = new TextLayer({
        posX: 10,
        posY: 130,
        width: 40,
        height: 80,
        timingStart: 2000,
        timingEnd: 3000,
        layerIndex: 1,
        text: 'Sticker'
      });

      playerRef.current.addLayer(layer1);
      playerRef.current.addLayer(layer2);
      playerRef.current.addLayer(layer3);

      const throttled = throttle(({ videoTiming, endVideoTiming }) => {
        setProgress(videoTiming / endVideoTiming * 100);
      }, 180);

      playerRef.current.addListener(throttled);
    }
  }, []);

  useEffect(() => {
    if (!playerRef.current) {
      return;
    }

    if (state.isPaused) {
      playerRef.current.stop();
    } else {
      playerRef.current.play();
    }
  }, [state.isPaused]);

  return (
    <Grid>
      <Grid
        m={'var(--space-sm)'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={'var(--border-radius-lg)'}
        backgroundColor={'var(--bg-color)'}
        border={'var(--element-border)'}
      >
        <canvas
          ref={canvasRef}
          className={styles.canvas}
        />
      </Grid>
      <Grid
        border={'var(--element-border)'}
        overflow={'hidden'}
        ml={'var(--space-sm)'}
        mr={'var(--space-sm)'}
        mb={'var(--space-md)'}
        borderRadius={'var(--border-radius-lg)'}
        backgroundColor={'var(--bg-color)'}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
          <Tab label="Item Four" />
          <Tab label="Item Five" />
        </Tabs>
      </Grid>
      <Grid
        border={'var(--element-border)'}
        backgroundColor={'var(--bg-color)'}
        ml={'var(--space-sm)'}
        mr={'var(--space-sm)'}
        mb={'var(--space-sm)'}
        p={'var(--space-md)'}
        borderRadius={'var(--border-radius-lg)'}
      >
        <PlayerSlider
          progress={state.progress}
          isPaused={state.isPaused}
          setIsPaused={setIsPaused}
          setProgress={onProgressChange}
          size="small"
        />
      </Grid>
      <Grid
        ml={'var(--space-sm)'}
        mr={'var(--space-sm)'}
      >
        <Button
          fullWidth
          size="large"
          variant="contained"
        >
          Download video
        </Button>
      </Grid>
    </Grid>
  );
};

export default StickerEditor;
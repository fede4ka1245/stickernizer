import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FormControlLabel, Grid, RadioGroup, Typography} from "@mui/material";
import Player from "../player/Player";
import ButtonBackPanel from "../../../../components/buttonBackPanel/ButtonBackPanel";
import {useDispatch, useSelector} from "react-redux";
import {
  openTab,
} from "../../store/slices/main";
import {tabs} from "../../consts/tabs";
import {
  changeTextPlayerTiming,
  initTextLayer,
  resetText,
  setTextPlayerProgress,
  toggleIsTextPlayerPaused
} from "../../store/slices/text";
import Input from "../../../../ui/input/Input";
import Button from "../../../../ui/button/Button";
import InputNumber from "../../../../components/inputNumber/InputNumber";
import Radio from "../../../../ui/radio/Radio";

const TextLayer = () => {
  const dispatch = useDispatch();
  const { progress, isPaused } = useSelector((state) => state.textLayer);

  const onBackClick = useCallback(() => {
    dispatch(openTab(tabs.layers));
  }, []);

  const initTextLayerModule = useCallback((canvas) => {
    if (!canvas) return;

    dispatch(initTextLayer({
      canvas,
      onProgressChange: ({ videoTiming, endVideoTiming }) => {
        dispatch(setTextPlayerProgress(videoTiming / endVideoTiming * 100))
      }
    }));
  }, []);

  const onProgressChange = useCallback((progress) => {
    dispatch(changeTextPlayerTiming(progress));
  }, []);

  const setIsPaused = useCallback((isPaused) => {
    dispatch(toggleIsTextPlayerPaused(isPaused));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetText());
    };
  }, []);

  return (
    <Grid display={'flex'} flexDirection={'column'} height={'100vh'}>
      <ButtonBackPanel
        onButtonBackClick={onBackClick}
      >
        <Typography
          fontSize={'var(--font-size-md)'}
          fontWeight={'bold'}
          color={'var(--text-secondary-color)'}
          pl={'var(--space-sm)'}
        >
          Text Layer
        </Typography>
      </ButtonBackPanel>
      <Player
        init={initTextLayerModule}
        setIsPaused={setIsPaused}
        progress={progress}
        isPaused={isPaused}
        onProgressChange={onProgressChange}
        isSmall={true}
      />
      <Grid flex={'1 1 auto'} sx={{ overflowY: 'scroll' }} display={'flex'} flexDirection={'column'} height={0} p={'var(--space-sm)'}>
        <Grid
          border={'var(--element-border)'}
          overflow={'hidden'}
          borderRadius={'var(--border-radius-lg)'}
          backgroundColor={'var(--bg-color)'}
          height={'100%'}
          sx={{ overflowY: 'scroll' }}
          p={'var(--space-md)'}
        >
          <Input
            size={'small'}
            type={'outline'}
            label={'Text'}
          />
          <Grid mt={'var(--space-md)'}>
            <InputNumber
              type={'outline'}
              label={'Font Size'}
            />
          </Grid>
          <Grid mt={'var(--space-md)'}>
            <Input
              size={'small'}
              type={'outline'}
              label={'Color'}
              disabled
              value={"#e66465"}
            />
            <Input
              sx={{ width: '60px', marginLeft: 'var(--space-sm)' }}
              size={'small'}
              type="color"
              name="text color"
              value="#e66465"
            />
          </Grid>
          <Grid mt={'var(--space-md)'}>
            <Typography
              fontSize={'var(--font-size-sm)'}
              fontWeight={'bold'}
              color={'var(--text-secondary-color)'}
            >
              TextAlign
            </Typography>
            <RadioGroup
              row
            >
              <FormControlLabel
                value="start"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  Start
                </Typography>}
              />
              <FormControlLabel
                value="center"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  Center
                </Typography>}
              />
              <FormControlLabel
                value="end"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  End
                </Typography>}
              />
            </RadioGroup>
          </Grid>
          <Grid mt={'var(--space-md)'}>
            <Typography
              fontSize={'var(--font-size-sm)'}
              fontWeight={'bold'}
              color={'var(--text-secondary-color)'}
            >
              FontFamily
            </Typography>
            <RadioGroup
              row
            >
              <FormControlLabel
                value="start"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  Font1
                </Typography>}
              />
              <FormControlLabel
                value="center"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  Font2
                </Typography>}
              />
              <FormControlLabel
                value="end"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  Font3
                </Typography>}
              />
              <FormControlLabel
                value="Font4"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  Font4
                </Typography>}
              />
              <FormControlLabel
                value="Font5"
                control={<Radio />}
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  Font5
                </Typography>}
              />
            </RadioGroup>
          </Grid>
        </Grid>
      </Grid>
      <Grid p={'var(--space-sm)'}>
        <Button
          fullWidth
          size="large"
          variant="contained"
        >
          Save Layer
        </Button>
      </Grid>
    </Grid>
  );
};

export default TextLayer;
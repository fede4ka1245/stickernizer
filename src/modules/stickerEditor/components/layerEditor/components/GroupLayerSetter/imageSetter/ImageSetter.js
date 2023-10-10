import React, {useCallback, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import InputNumber from "../../../../../../../components/inputNumber/InputNumber";

const ImageSetter = () => {
  const [videoSetterState, setVideoSetterState] = useState({
    videoLink: '',
    timingStart: 0,
    timingEnd: 3000
  });

  const onVideoChange = useCallback((event) => {
    const URL = window.URL || window.webkitURL;
    const file = event.target.files[0];
    setVideoSetterState((state) => ({
      ...state,
      videoLink: URL.createObjectURL(file)
    }));
  }, []);

  const setTimingEnd = useCallback((value) => {
    setVideoSetterState((state) => ({
      ...state,
      timingEnd: value
    }));
  }, []);

  const setTimingStart = useCallback((value) => {
    setVideoSetterState((state) => ({
      ...state,
      timingStart: value
    }));
  }, []);

  return (
    <>
      <Grid mb={'var(--space-md)'}>
        <input
          style={{ color: 'var(--text-secondary-color)' }}
          type={'file'}
          name="file"
          onChange={onVideoChange}
          accept="video/mp4,video/x-m4v,video/*"
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          min={0}
          step={5}
          max={videoSetterState.timingEnd}
          fullWidth
          value={videoSetterState.timingStart}
          onChange={setTimingStart}
          type={'outline'}
          label={'Video timing start (ms)'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          min={0}
          step={5}
          fullWidth
          value={videoSetterState.timingEnd}
          onChange={setTimingEnd}
          type={'outline'}
          label={'Video riming end (ms)'}
        />
      </Grid>
      <Typography
        fontSize={'var(--font-size-sm)'}
        lineHeight={'var(--font-size-sm)'}
        color={'var(--hint-color)'}
      >
        Video and images layers saving currently not supported. This layer won't be saved!
      </Typography>
    </>
  );
};

export default ImageSetter;
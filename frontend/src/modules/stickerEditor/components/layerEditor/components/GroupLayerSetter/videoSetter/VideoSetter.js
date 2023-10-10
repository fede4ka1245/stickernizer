import React, {useCallback} from 'react';
import {Grid, Typography} from "@mui/material";
import InputNumber from "../../../../../../../components/inputNumber/InputNumber";

const VideoSetter = ({ videoSetterState, setVideoSetterState }) => {
  const onVideoChange = useCallback((event) => {
    const URL = window.URL || window.webkitURL;
    const file = event.target.files[0];
    setVideoSetterState({
      ...videoSetterState,
      videoLink: URL.createObjectURL(file)
    });
  }, [videoSetterState]);

  const setTimingEnd = useCallback((value) => {
    setVideoSetterState({
      ...videoSetterState,
      timingEnd: value
    });
  }, [videoSetterState]);

  const setTimingStart = useCallback((value) => {
    setVideoSetterState({
      ...videoSetterState,
      timingStart: value
    });
  }, [videoSetterState]);

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

export default VideoSetter;
import React, {useCallback} from 'react';
import {Grid} from "@mui/material";
import InputNumber from "../../../../../../components/inputNumber/InputNumber";

const TransformSetter = ({ transformState, setTransformState }) => {
  const setXPosition = useCallback((event) => {
    setTransformState({
      ...transformState,
      posX: event.target.value
    })
  }, [transformState]);

  const setYPosition = useCallback((event) => {
    console.log(event.target.value);
    setTransformState({
      ...transformState,
      posY: event.target.value
    })
  }, [transformState]);

  const setScaleX = useCallback((event) => {
    setTransformState({
      ...transformState,
      scaleX: event.target.value
    })
  }, [transformState]);

  const setScaleY = useCallback((event) => {
    setTransformState({
      ...transformState,
      scaleY: event.target.value
    })
  }, [transformState]);

  const setRotation = useCallback((event) => {
    setTransformState({
      ...transformState,
      rotation: event.target.value
    })
  }, [transformState]);

  return (
    <>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          value={transformState.posX}
          fullWidth
          onChange={setXPosition}
          type={'outline'}
          label={'X position'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          fullWidth
          value={transformState.posY}
          type={'outline'}
          onChange={setYPosition}
          label={'Y position'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          value={transformState.scaleX}
          onChange={setScaleX}
          fullWidth
          type={'outline'}
          label={'Scale X'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          value={transformState.scaleY}
          onChange={setScaleY}
          fullWidth
          type={'outline'}
          label={'Scale Y'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          fullWidth
          type={'outline'}
          label={'Rotation'}
          value={transformState.rotation}
          onChange={setRotation}
        />
      </Grid>
    </>
  );
};

export default TransformSetter;
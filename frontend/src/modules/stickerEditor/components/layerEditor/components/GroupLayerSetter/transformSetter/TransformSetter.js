import React, {useCallback} from 'react';
import {Grid} from "@mui/material";
import InputNumber from "../../../../../../../components/inputNumber/InputNumber";

const TransformSetter = ({ transformState, setTransformState }) => {
  const setXPosition = useCallback((value) => {
    setTransformState({
      ...transformState,
      posX: value
    })
  }, [transformState]);

  const setYPosition = useCallback((value) => {
    setTransformState({
      ...transformState,
      posY: value
    })
  }, [transformState]);

  const setScaleX = useCallback((value) => {
    setTransformState({
      ...transformState,
      scaleX: value
    })
  }, [transformState]);

  const setScaleY = useCallback((value) => {
    setTransformState({
      ...transformState,
      scaleY: value
    })
  }, [transformState]);

  const setRotation = useCallback((value) => {
    setTransformState({
      ...transformState,
      rotation: value
    })
  }, [transformState]);

  return (
    <>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          step={5}
          value={transformState.posX}
          fullWidth
          onChange={setXPosition}
          type={'outline'}
          label={'X position'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          step={5}
          fullWidth
          value={transformState.posY}
          type={'outline'}
          onChange={setYPosition}
          label={'Y position'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          step={0.1}
          min={0.1}
          value={transformState.scaleX}
          onChange={setScaleX}
          fullWidth
          type={'outline'}
          label={'Scale X'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          step={0.1}
          value={transformState.scaleY}
          onChange={setScaleY}
          min={0.1}
          fullWidth
          type={'outline'}
          label={'Scale Y'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          step={5}
          fullWidth
          type={'outline'}
          label={'Rotation'}
          min={0}
          max={360}
          value={transformState.rotation}
          onChange={setRotation}
        />
      </Grid>
    </>
  );
};

export default TransformSetter;
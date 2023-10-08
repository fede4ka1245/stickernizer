import React, {useCallback} from 'react';
import {Grid} from "@mui/material";
import InputNumber from "../../../../../../components/inputNumber/InputNumber";
import {playerConsts} from "../../../../consts/playerConsts";

const TimingSetter = ({ timingState, setTimingState }) => {
  const setTimingStart = useCallback((event) => {
    setTimingState({
      ...timingState,
      timingStart: event.target.value
    })
  }, [timingState]);

  const setTimingEnd = useCallback((event) => {
    setTimingState({
      ...timingState,
      timingEnd: event.target.value
    })
  }, [timingState]);

  return (
    <>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          min={0}
          max={playerConsts.maxTiming}
          fullWidth
          value={timingState.timingStart}
          onChange={setTimingStart}
          type={'outline'}
          label={'Timing start (ms)'}
        />
      </Grid>
      <Grid mb={'var(--space-md)'}>
        <InputNumber
          min={0}
          max={playerConsts.maxTiming}
          fullWidth
          value={timingState.timingEnd}
          onChange={setTimingEnd}
          type={'outline'}
          label={'Timing end (ms)'}
        />
      </Grid>
    </>
  );
};

export default TimingSetter;
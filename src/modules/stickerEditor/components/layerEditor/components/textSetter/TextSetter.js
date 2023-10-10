import React, {useCallback} from 'react';
import Input from "../../../../../../ui/input/Input";
import {FormControlLabel, FormGroup, Grid, RadioGroup, Typography} from "@mui/material";
import InputNumber from "../../../../../../components/inputNumber/InputNumber";
import Radio from "../../../../../../ui/radio/Radio";
import InputColorPicker from "../../../../../../components/inputColorPicker/InputColorPicker";
import Checkbox from "../../../../../../ui/checkbox/Checkbox";

const textAlign = [
  'start',
  'center',
  'end'
]

const TextSetter = ({ textSetterState, setTextSetterState }) => {
  const onTextAlignSet = useCallback((_, textAlign) => {
    setTextSetterState({
      ...textSetterState,
      textAlign
    })
  }, [textSetterState]);

  const onColorSet = useCallback((event) => {
    setTextSetterState({
      ...textSetterState,
      color: event.target.value
    })
  }, [textSetterState]);

  const onTextChange = useCallback((event) => {
    setTextSetterState({
      ...textSetterState,
      text: event.target.value
    })
  }, [textSetterState]);


  const onFontSizeChange = useCallback((event) => {
    setTextSetterState({
      ...textSetterState,
      fontSize: event.target.value
    })
  }, [textSetterState]);

  return (
    <>
      <Input
        fullWidth
        size={'small'}
        type={'outline'}
        label={'Text'}
        onChange={onTextChange}
        value={textSetterState.text}
      />
      <Grid mt={'var(--space-md)'}>
        <InputNumber
          fullWidth
          type={'outline'}
          label={'Font Size'}
          onChange={onFontSizeChange}
          value={textSetterState.fontSize}
        />
      </Grid>
      <Grid mt={'var(--space-md)'}>
        <InputColorPicker
          value={textSetterState.color}
          onChange={onColorSet}
        />
      </Grid>
      <Grid mt={'var(--space-md)'}>
        <Typography
          fontSize={'var(--font-size-sm)'}
          fontWeight={'bold'}
          color={'var(--text-secondary-color)'}
        >
          Text Align
        </Typography>
        <RadioGroup
          row
          value={textSetterState.textAlign}
          onChange={onTextAlignSet}
        >
          {textAlign.map((align) => (
            <FormControlLabel
              key={align}
              value={align}
              control={<Radio />}
              label={<Typography
                fontSize={'var(--font-size-sm)'}
                color={'var(--hint-color)'}
              >
                {align}
              </Typography>}
            />
          ))}
        </RadioGroup>
      </Grid>
    </>
  );
};

export default TextSetter;
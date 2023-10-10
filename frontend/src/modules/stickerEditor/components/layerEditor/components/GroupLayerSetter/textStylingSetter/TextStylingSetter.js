import React, {useCallback} from 'react';
import {FormControlLabel, FormGroup, Grid, RadioGroup, Typography} from "@mui/material";
import InputNumber from "../../../../../../../components/inputNumber/InputNumber";
import InputColorPicker from "../../../../../../../components/inputColorPicker/InputColorPicker";
import Radio from "../../../../../../../ui/radio/Radio";
import Checkbox from "../../../../../../../ui/checkbox/Checkbox";

const fonts = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Titan One'
]

const textDecorations = [
  'bold',
  'italic'
]

const TextStylingSetter = ({ textSetterState, setTextSetterState }) => {
  const onFontSet = useCallback((_, fontFamily) => {
    setTextSetterState({
      ...textSetterState,
      fontFamily
    })
  }, [textSetterState]);

  const onStrokeWidthChange = useCallback((value) => {
    setTextSetterState({
      ...textSetterState,
      strokeWidth: value
    });
  }, [textSetterState]);

  const onStrokeColorChange = useCallback((event) => {
    setTextSetterState({
      ...textSetterState,
      strokeColor: event.target.value
    });
  }, [textSetterState]);

  return (
    <>
      <Grid>
        <InputNumber
          step={0.2}
          min={0}
          fullWidth
          type={'outline'}
          label={'Stroke width'}
          value={textSetterState.strokeWidth}
          onChange={onStrokeWidthChange}
        />
      </Grid>
      <Grid mt={'var(--space-md)'}>
        <InputColorPicker
          label={'Stroke color'}
          value={textSetterState.strokeColor}
          onChange={onStrokeColorChange}
        />
      </Grid>
      <Grid mt={'var(--space-md)'}>
        <Typography
          fontSize={'var(--font-size-sm)'}
          fontWeight={'bold'}
          color={'var(--text-secondary-color)'}
        >
          Font Family
        </Typography>
        <RadioGroup
          row
          onChange={onFontSet}
          value={textSetterState.fontFamily}
        >
          {fonts.map((font) => (
            <FormControlLabel
              key={font}
              value={font}
              control={<Radio />}
              label={<Typography
                fontFamily={font}
                fontSize={'var(--font-size-sm)'}
                color={'var(--hint-color)'}
              >
                {font}
              </Typography>}
            />
          ))}
        </RadioGroup>
      </Grid>
      <Grid mt={'var(--space-md)'}>
        <Grid>
          <Typography
            fontSize={'var(--font-size-sm)'}
            fontWeight={'bold'}
            color={'var(--text-secondary-color)'}
          >
            Text Decorations
          </Typography>
          <FormGroup>
            {textDecorations.map((value) => (
              <FormControlLabel
                key={value}
                control={
                  <Checkbox
                    checked={textSetterState.textDecorations.includes(value)}
                    onChange={() => {
                      if (textSetterState.textDecorations.includes(value)) {
                        setTextSetterState({ ...textSetterState, textDecorations: textSetterState.textDecorations.filter((target) => target !== value)})
                      } else {
                        setTextSetterState({ ...textSetterState, textDecorations: [...textSetterState.textDecorations, value] })
                      }
                    }}
                    name={value}
                  />
                }
                label={<Typography
                  fontSize={'var(--font-size-sm)'}
                  color={'var(--hint-color)'}
                >
                  {value}
                </Typography>}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    </>
  );
};

export default TextStylingSetter;
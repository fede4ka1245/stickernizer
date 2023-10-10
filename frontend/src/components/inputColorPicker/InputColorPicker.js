import React from 'react';
import {Grid} from "@mui/material";
import Input from "../../ui/input/Input";

const InputColorPicker = ({ onChange, value, label, ...props }) => {
  return (
    <>
      <Grid display={'flex'}>
        <Grid flex={1}>
          <Input
            size={'small'}
            type={'outline'}
            label={label || 'Color'}
            disabled
            fullWidth
            value={value}
          />
        </Grid>
        <Grid width={'40px'} height={'40px'} ml={'var(--space-sm)'}>
          <input
            style={{ width: '100%', height: '100%' }}
            onChange={onChange}
            type="color"
            name="text color"
            value={value}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default InputColorPicker;
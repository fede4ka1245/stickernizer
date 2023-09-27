import * as React from 'react';
import MuiSlider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const Slider = styled(MuiSlider)(({ theme }) => ({
  color: 'var(--primary-color)'
}));

export default Slider;
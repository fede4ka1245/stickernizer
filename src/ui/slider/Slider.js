import * as React from 'react';
import MuiSlider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const Slider = styled(MuiSlider)(({ theme }) => ({
  color: 'var(--primary-color)',
  padding: '0 !important'
}));

export default Slider;
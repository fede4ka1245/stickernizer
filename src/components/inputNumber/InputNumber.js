import React from 'react';
import Input from "../../ui/input/Input";

const InputNumber = ({ value, onValueChange, label }) => {
  return (
    <>
      <Input size={'small'} label={label || 'input'} variant="outlined" type={'number'} />
    </>
  );
};

export default InputNumber;
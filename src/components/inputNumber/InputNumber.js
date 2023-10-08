import React from 'react';
import Input from "../../ui/input/Input";

const InputNumber = ({ value, onChange, label, ...props }) => {
  return (
    <>
      <Input
        {...props}
        value={value}
        onChange={onChange}
        size={'small'}
        label={label || 'input'}
        variant="outlined"
        type={'number'}
      />
    </>
  );
};

export default InputNumber;
import React from 'react';
import Alert from "./alert/Alert";
import Confirm from "./confirm/Confirm";
import Prompt from "./prompt/Prompt";

const Root = () => {


  return (
    <>
      <Alert />
      <Confirm />
      <Prompt />
    </>
  );
};

export default Root;
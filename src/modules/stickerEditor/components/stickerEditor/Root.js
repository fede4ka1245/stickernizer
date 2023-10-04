import React from 'react';
import {Provider} from "react-redux";
import StickerEditor from "./StickerEditor";
import store from "../../store";

const Root = () => {
  return (
    <Provider store={store}>
      <StickerEditor />
    </Provider>
  );
};

export default Root;
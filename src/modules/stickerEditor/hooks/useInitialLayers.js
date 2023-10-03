import {useEffect} from "react";
import TextLayer from "../logic/TextLayer";
import {addLayer} from "../store/slices/main";
import {useDispatch, useSelector} from "react-redux";

export const useInitialLayers = () => {
  const { isInit, layers } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInit && !layers?.length) {
      const layer1 = new TextLayer({
        posX: 10,
        posY: 50,
        width: 40,
        height: 80,
        timingStart: 0,
        timingEnd: 1000,
        text: 'My'
      });

      const layer2 = new TextLayer({
        posX: 10,
        posY: 90,
        width: 40,
        height: 80,
        timingStart: 1000,
        timingEnd: 2000,
        text: 'First'
      });

      const layer3 = new TextLayer({
        posX: 10,
        posY: 130,
        width: 40,
        height: 80,
        timingStart: 2000,
        timingEnd: 3000,
        text: 'Sticker'
      });

      const layer4 = new TextLayer({
        posX: 65,
        posY: 90,
        width: 40,
        height: 80,
        timingStart: 1000,
        timingEnd: 2500,
        text: 'Above',
        color: 'red'
      });

      dispatch(addLayer(layer1));
      dispatch(addLayer(layer2));
      dispatch(addLayer(layer3));
      dispatch(addLayer(layer4));
    }
  }, [isInit]);
}
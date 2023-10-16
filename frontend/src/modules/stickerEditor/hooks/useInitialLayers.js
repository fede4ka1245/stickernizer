import {useEffect} from "react";
import TextLayer from "../shared/editor/TextLayer";
import {addLayer, updateStickerName} from "../store/slices/main";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import VideoLayer from "../shared/editor/VideoLayer";
import ImageLayer from "../shared/editor/ImageLayer";

export const useInitialLayers = () => {
  const { isInit, layers, player } = useSelector((state) => state.main);
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isInit && !layers?.length) {
      if (state) {
        player.id = state.id;
        state.layers.forEach((layer) => {
          console.log(layer);

          if (layer.imageProps) {
            dispatch(addLayer(new ImageLayer(layer)));
          } else if (layer.videoProps) {
            dispatch(addLayer(new VideoLayer(layer)));
          } else {
            dispatch(addLayer(new TextLayer(layer)));
          }
        });
        dispatch(updateStickerName(state.name));
        return;
      }

      const layer1 = new TextLayer({
        layerName: 'My',
        transformProps: {
          posX: 250,
          posY: 10 + 90,
          width: 40,
          height: 80,
        },
        timingProps: {
          timingStart: 0,
          timingEnd: 1000,
        },
        textProps: {
          text: 'My',
          fontSize: 100,
          fontFamily: 'Arial',
          color: '#ffffff',
          textAlign: 'center'
        }
      });

      const layer2 = new TextLayer({
        layerName: 'First',
        transformProps: {
          posX: 250,
          posY: 200 + 90,
          width: 40,
          height: 80,
        },
        timingProps: {
          timingStart: 1000,
          timingEnd: 2000,
        },
        textProps: {
          text: 'First',
          fontSize: 100,
          fontFamily: 'Arial',
          color: '#ffffff',
          textAlign: 'center'
        }
      });

      const layer3 = new TextLayer({
        layerName: 'Sticker',
        transformProps: {
          posX: 250,
          posY: 400 + 90,
          width: 40,
          height: 80,
        },
        timingProps: {
          timingStart: 2000,
          timingEnd: 3000,
        },
        textProps: {
          text: 'Sticker',
          fontSize: 100,
          fontFamily: 'Arial',
          color: '#ffffff',
          textAlign: 'center'
        }
      });

      dispatch(addLayer(layer1));
      dispatch(addLayer(layer2));
      dispatch(addLayer(layer3));
    }
  }, [isInit]);
}
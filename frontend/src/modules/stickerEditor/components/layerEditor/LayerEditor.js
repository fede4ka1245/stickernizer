import React, {useCallback, useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import Player from "../player/Player";
import ButtonBackPanel from "../../../../components/buttonBackPanel/ButtonBackPanel";
import {useDispatch, useSelector} from "react-redux";
import {
  addLayer,
  openTab,
} from "../../store/slices/main";
import {tabs} from "../../consts/tabs";
import {
  changeLayerName,
  changeLayerPlayerTiming,
  initLayer,
  resetLayer,
  setLayerPlayerProgress,
  toggleIsLayerPlayerPaused
} from "../../store/slices/layer";
import Button from "../../../../ui/button/Button";
import GroupLayerSetter from "./components/GroupLayerSetter/GroupLayerSetter";
import TextLayer from "../../shared/editor/TextLayer";
import {
  blankTextSetter,
  blankTimingSetter,
  blankTransformSetter,
  blankVideoSetter,
  layerType
} from "../../consts/layerConsts";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Tappable from "../../../../ui/tappable/Tappable";
import {appConfirm, appPrompt} from "../../../userFeedback";
import VideoLayer from "../../shared/editor/VideoLayer";

const LayerEditor = () => {
  const dispatch = useDispatch();
  const { progress, isPaused, layer, layerName, type } = useSelector((state) => state.layer);

  const onBackClick = useCallback(async () => {
    if (!await appConfirm("Are you sure you want to exit, the progress won't be saved!")) {
      return;
    }

    dispatch(openTab(tabs.layers));
  }, []);

  const initTextLayerModule = useCallback((canvas) => {
    if (!canvas) return;

    let newLayer = layer;

    if (!layer) {
      if (type === layerType.text) {
        newLayer = new TextLayer({
          textProps: blankTextSetter,
          timingProps: blankTimingSetter,
          transformProps: blankTransformSetter
        });
      } else if (type === layerType.video) {
        newLayer = new VideoLayer({
          videoProps: blankVideoSetter,
          timingProps: blankTimingSetter,
          transformProps: blankTransformSetter
        });
      } else {
        newLayer = new VideoLayer({
          videoProps: blankVideoSetter,
          timingProps: blankTimingSetter,
          transformProps: blankTransformSetter
        });
      }
    }

    dispatch(initLayer({
      canvas,
      onProgressChange: ({ videoTiming, endVideoTiming }) => {
        dispatch(setLayerPlayerProgress(videoTiming / endVideoTiming * 100))
      },
      layer: newLayer
    }));
  }, []);

  const onProgressChange = useCallback((progress) => {
    dispatch(changeLayerPlayerTiming(progress));
  }, []);

  const setIsPaused = useCallback((isPaused) => {
    dispatch(toggleIsLayerPlayerPaused(isPaused));
  }, []);

  const onLayerAdd = useCallback(() => {
    dispatch(addLayer(layer));
    dispatch(openTab(tabs.layers));
  }, [layer]);

  const onNameChange = useCallback(async () => {
    const name = await appPrompt("Set new Layer name");

    if (!name) {
      return;
    }

    dispatch(changeLayerName(name));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetLayer());
    };
  }, []);

  return (
    <Grid display={'flex'} flexDirection={'column'} height={'100vh'}>
      <ButtonBackPanel
        onButtonBackClick={onBackClick}
      >
        <Grid position={'relative'} display={'flex'} justifyContent={'end'}>
          <Typography
            fontSize={'var(--font-size-md)'}
            lineHeight={'var(--font-size-md)'}
            sx={{
              '-webkit-line-clamp': 2,
              overflow: 'hidden',
              maxHeight: 'calc(var(--font-size-md) * 2)',
              textOverflow: 'ellipsis'
            }}
            fontWeight={'bold'}
            color={'var(--text-secondary-color)'}
            pl={'var(--space-sm)'}
          >
            {layerName}
          </Typography>
          <Grid ml={'var(--space-sm)'}>
            <Tappable onClick={onNameChange}>
              <EditRoundedIcon
                sx={{
                  color: 'var(--primary-color)'
                }}
              />
            </Tappable>
          </Grid>
        </Grid>
      </ButtonBackPanel>
      <Player
        init={initTextLayerModule}
        setIsPaused={setIsPaused}
        progress={progress}
        isPaused={isPaused}
        onProgressChange={onProgressChange}
        isSmall={true}
      />
      <GroupLayerSetter />
      <Grid p={'var(--space-sm)'}>
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={onLayerAdd}
        >
          Save Layer
        </Button>
      </Grid>
    </Grid>
  );
};

export default LayerEditor;
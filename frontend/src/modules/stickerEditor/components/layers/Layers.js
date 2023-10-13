import React, {useCallback, useEffect, useState} from 'react';
import {Grid, Typography} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import Layer from "./layer/Layer";
import Button from "../../../../ui/button/Button";
import {
  changeTiming,
  initModule,
  moveLayerToNewOrder, openTab,
  resetMain,
  setProgress,
  toggleIsPaused
} from "../../store/slices/main";
import Player from "../player/Player";
import {tabs} from "../../consts/tabs";
import {Drawer} from "../../../../ui/drawer/Drawer";
import Tappable from "../../../../ui/tappable/Tappable";
import {Close} from "@mui/icons-material";
import {setLayerType} from "../../store/slices/layer";
import {layerType} from "../../consts/layerConsts";
import {appAlert} from "../../../userFeedback";

const Layers = () => {
  const { layers, progress, isPaused } = useSelector((state) => state.main);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((open) => !open);
  }, []);

  const dispatch = useDispatch();

  const onAddLayer = useCallback(async (type) => {
    if (type === layerType.video) {
      await appAlert('This layer type currently not supported!');
      return;
    }

    dispatch(setLayerType(type))
    dispatch(openTab(tabs.layer));
  }, []);

  const initStickerEditor = useCallback((canvas) => {
    if (!canvas) return;

    dispatch(initModule({
      canvas,
      onProgressChange: ({ videoTiming, endVideoTiming }) => {
        dispatch(setProgress(videoTiming / endVideoTiming * 100));
      }
    }));
  }, []);

  const onProgressChange = useCallback((progress) => {
    dispatch(changeTiming(progress));
  }, []);

  const setIsPaused = useCallback((isPaused) => {
    dispatch(toggleIsPaused(isPaused));
  }, []);

  const onDragEnd = useCallback(({ destination, source }) => {
    if (!destination) return;

    dispatch(moveLayerToNewOrder({
      layerOrder: source.index,
      newLayerOrder: destination.index
    }));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetMain());
    };
  }, []);

  return (
    <>
      <Grid>
        <Player
          init={initStickerEditor}
          progress={progress}
          isPaused={isPaused}
          onProgressChange={onProgressChange}
          setIsPaused={setIsPaused}
          isSmall={true}
        />
      </Grid>
      <Grid flex={'1 1 auto'} sx={{ overflowY: 'scroll' }} display={'flex'} flexDirection={'column'} height={0} p={'var(--space-sm)'}>
        <Grid>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-layers">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {layers.map((layer, index) => (
                    <Draggable key={layer.id} draggableId={layer.id} index={index}>
                      {(provided, snapshot) => (
                        <Grid
                          mb={'var(--space-sm)'}
                          ref={provided.innerRef}
                        >
                          <Layer
                            layer={layer}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
      <Grid p={'var(--space-sm)'}>
        <Button
          fullWidth
          size="large"
          onClick={toggleDrawer}
          variant="contained"
        >
          Add Layer
        </Button>
      </Grid>
      <Drawer anchor={'bottom'} open={isDrawerOpen} close={toggleDrawer}>
        <Grid position={'absolute'} right={'15px'} top={'15px'}>
          <Tappable onClick={(event) => {
            event.stopPropagation();
            toggleDrawer();
          }}>
            <Grid
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              height={'48px'}
              width={'48px'}
              borderRadius={'var(--border-radius-lg)'}
              backgroundColor={'var(--bg-color)'}
              border={'var(--element-border)'}
            >
              <Close sx={{ color: 'var(--hint-color)' }} />
            </Grid>
          </Tappable>
        </Grid>
        <Grid height={'23em'} p={'var(--space-md)'}>
          <Tappable onClick={() => onAddLayer('text')}>
            <Typography
              fontSize={'var(--font-size-md)'}
              lineHeight={'var(--font-size-lg)'}
              fontWeight={'bold'}
              color={'var(--hint-color)'}
              pt={'var(--space-md)'}
              pb={'var(--space-md)'}
            >
              Add Text Layer
            </Typography>
          </Tappable>
          <Tappable onClick={() => onAddLayer('image')}>
            <Typography
              fontSize={'var(--font-size-md)'}
              lineHeight={'var(--font-size-lg)'}
              fontWeight={'bold'}
              color={'var(--hint-color)'}
              pt={'var(--space-md)'}
              pb={'var(--space-md)'}
            >
              Add Image Layer
            </Typography>
          </Tappable>
          <Tappable onClick={() => onAddLayer('video')}>
            <Typography
              fontSize={'var(--font-size-md)'}
              lineHeight={'var(--font-size-lg)'}
              fontWeight={'bold'}
              color={'var(--hint-color)'}
              pt={'var(--space-md)'}
              pb={'var(--space-md)'}
            >
              Add Video Layer
            </Typography>
          </Tappable>
        </Grid>
      </Drawer>
    </>
  );
};

export default Layers;
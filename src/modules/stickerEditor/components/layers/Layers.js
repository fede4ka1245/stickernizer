import React, {useCallback, useEffect} from 'react';
import {Grid} from "@mui/material";
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

const Layers = () => {
  const { layers, progress, isPaused } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const onAddLayer = useCallback(() => {
    dispatch(openTab(tabs.layerText));
  }, []);

  const initStickerEditor = useCallback((canvas) => {
    if (!canvas) return;

    dispatch(initModule({
      canvas,
      onProgressChange: ({ videoTiming, endVideoTiming }) => {
        dispatch(setProgress(videoTiming / endVideoTiming * 100))
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
          onClick={onAddLayer}
          variant="contained"
        >
          Add Layer
        </Button>
      </Grid>
    </>
  );
};

export default Layers;
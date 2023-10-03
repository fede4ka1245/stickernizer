import React, {useCallback} from 'react';
import {Grid} from "@mui/material";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useDispatch, useSelector} from "react-redux";
import Layer from "./layer/Layer";
import Button from "../../../../ui/button/Button";
import {moveLayerToNewOrder} from "../../store/slices/main";

const Layers = () => {
  const { layers } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const onDragEnd = useCallback(({ destination, source }) => {
    if (!destination) return;

    dispatch(moveLayerToNewOrder({
      layerOrder: source.index,
      newLayerOrder: destination.index
    }));
  }, []);

  return (
    <Grid display={'flex'} flexDirection={'column'}>
      <Grid flex={1}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable-layers">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {layers.map((layer, index) => (
                  <Draggable key={layer.id} draggableId={layer.id} index={index}>
                    {(provided) => (
                      <Grid
                        mb={'var(--space-sm)'}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Layer layer={layer} />
                      </Grid>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Grid>
      <Grid
        pl={'var(--space-sm)'}
        pr={'var(--space-sm)'}
        pb={'var(--space-md)'}
        height={'60px'}
        width={'100%'}
      />
      <Grid
        pl={'var(--space-sm)'}
        pr={'var(--space-sm)'}
        pb={'var(--space-md)'}
        position={'fixed'}
        left={0} bottom={0}
        height={'60px'}
        width={'100%'}
      >
        <Button
          fullWidth
          size="large"
          variant="contained"
        >
          Add Layer
        </Button>
      </Grid>
    </Grid>
  );
};

export default Layers;
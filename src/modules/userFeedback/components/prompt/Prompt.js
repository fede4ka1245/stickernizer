import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "../../../../ui/dialog";
import Button from "../../../../ui/button/Button";
import Input from "../../../../ui/input/Input";
import {Grid} from "@mui/material";
import {eventBus} from "../../shared/eventBus";
import {eventBusEvent} from "../../shared/eventBusEvents";

const Prompt = () => {
  const [value, setValue] = useState();
  const [inputRef, setInputRef] = useState();
  const [state, setState] = useState({
    isOpen: false,
    text: ''
  });

  const onValueChange = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
    }
  }, [inputRef]);


  useEffect(() => {
    eventBus.on(eventBusEvent.onPromptOpen, (text) => {
      setState({
        isOpen: true,
        text
      })
    });
  }, []);

  const onCancel = useCallback(() => {
    setState({
      isOpen: false,
      text: ''
    });
    eventBus.emit(eventBusEvent.onPromptClosed, null, false);
  }, []);

  const onConfirm = useCallback(() => {
    setState({
      isOpen: false,
      text: ''
    });
    eventBus.emit(eventBusEvent.onPromptClosed, null, value);
  }, [value]);

  return (
    <Dialog
      open={state.isOpen}
      onClose={() => {}}
      aria-labelledby="prompt-dialog-title"
      aria-describedby="prompt-dialog-description"
    >
      <DialogTitle id="prompt-dialog-title">
        {state.text}
      </DialogTitle>
      <DialogContent>
        <Grid mt={'var(--space-sm)'}>
          <Input
            value={value}
            onChange={onValueChange}
            label={'Answer'}
            variant="outlined"
            inputRef={setInputRef}
            fullWidth
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          size="large"
          variant="outline"
          onClick={onConfirm}
        >
          Okey
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Prompt;
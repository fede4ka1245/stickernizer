import React, {useCallback, useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "../../../../ui/dialog";
import Button from "../../../../ui/button/Button";
import {eventBus} from "../../shared/eventBus";
import {eventBusEvent} from "../../shared/eventBusEvents";

const Confirm = () => {
  const [state, setState] = useState({
    isOpen: false,
    text: ''
  });

  useEffect(() => {
    eventBus.on(eventBusEvent.onConfirmOpen, (text) => {
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
    eventBus.emit(eventBusEvent.onConfirmClosed, null, false);
  }, []);

  const onConfirm = useCallback(() => {
    setState({
      isOpen: false,
      text: ''
    });
    eventBus.emit(eventBusEvent.onConfirmClosed, null, true);
  }, []);

  return (
    <Dialog
      open={state.isOpen}
      onClose={() => {}}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog-title">
        Confirm
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {state.text}
        </DialogContentText>
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

export default Confirm;
import React, {useCallback, useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "../../../../ui/dialog";
import Button from "../../../../ui/button/Button";
import {eventBus} from "../../shared/eventBus";
import {eventBusEvent} from "../../shared/eventBusEvents";

const Alert = () => {
  const [state, setState] = useState({
    isOpen: false,
    text: ''
  });

  useEffect(() => {
    eventBus.on(eventBusEvent.onAlertOpen, (text) => {
      setState({
        isOpen: true,
        text
      })
    });
  }, []);

  const onClose = useCallback(() => {
    setState({
      isOpen: false,
      text: ''
    });
    eventBus.emit(eventBusEvent.onAlertClosed);
  }, []);

  return (
    <Dialog
      open={state.isOpen}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Alert
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {state.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          size="large"
          variant="outline"
          onClick={onClose}
        >
          Okey
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Alert;
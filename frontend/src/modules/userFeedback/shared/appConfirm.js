import {eventBus} from "./eventBus";
import {eventBusEvent} from "./eventBusEvents";

export const appConfirm = (text) => {
  return new Promise((resolve) => {
    eventBus.once(eventBusEvent.onConfirmClosed, resolve);

    eventBus.emit(eventBusEvent.onConfirmOpen, null, text);
  });
};
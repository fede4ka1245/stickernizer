import {eventBus} from "./eventBus";
import {eventBusEvent} from "./eventBusEvents";

export const appAlert = (text) => {
  return new Promise((resolve) => {
    eventBus.once(eventBusEvent.onAlertClosed, resolve);

    eventBus.emit(eventBusEvent.onAlertOpen, null, text);
  });
};
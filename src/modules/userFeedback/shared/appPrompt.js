import {eventBus} from "./eventBus";
import {eventBusEvent} from "./eventBusEvents";

export const appPrompt = (text) => {
  return new Promise((resolve) => {
    eventBus.once(eventBusEvent.onPromptClosed, resolve);

    eventBus.emit(eventBusEvent.onPromptOpen, null, text);
  });
};
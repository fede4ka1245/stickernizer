import {useCallback, useState} from "react";
import {cloudStorageKey, getItem, setItem} from "../../../shared/cloudStorage";

export const useSaveSticker = () => {
  const [state, setState] = useState({
    isLoading: false,
  });

  const saveSticker = useCallback(async (sticker) => {
    setState({
      isLoading: true,
    });

    try {
      const result = await setItem(sticker.id, JSON.stringify(sticker));

      if (!result) {
        return;
      }

      let ids = JSON.parse((await getItem(cloudStorageKey.savedStickersIds)) || '[]');
      if (!ids.includes(sticker.id)) {
        ids = [sticker.id, ...ids].flat(Infinity);
        await setItem(cloudStorageKey.savedStickersIds, JSON.stringify(ids));
      }
    } finally {
      setState({
        isLoading: false,
      });
    }
  }, []);

  return {
    isLoading: state.isLoading,
    saveSticker
  }
};
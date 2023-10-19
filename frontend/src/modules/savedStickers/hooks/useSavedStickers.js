import {useCallback, useEffect, useMemo, useState} from "react";
import {cloudStorageKey, getItem, setItem} from "../../../shared/cloudStorage";
import {removeItem} from "../../../shared/cloudStorage/removeItem";
import {appConfirm} from "../../userFeedback";

export const useSavedStickers = () => {
  const [state, setState] = useState({
    isLoading: false,
    stickers: [],
    stickersIds: [],
    limit: 10,
    page: 0
  });

  const getStickers = useCallback(async (limit, page, ids) => {
    return await Promise.all([...ids.slice(page * limit, page * limit + limit).map(async (id) => {
      const result = await getItem(id);

      return JSON.parse(result);
    })]);
  }, []);

  const loadMoreStickers = useCallback(async () => {
    getStickers(state.limit, state.page, state.stickersIds)
      .then((result) => {
        setState((state) => ({ ...state, stickers: [...state.stickers, ...result], page: state.page + 1 }));
      })
  }, [state]);

  const removeSticker = useCallback(async (sticker) => {
    if (!await appConfirm("Do you want to delete sticker?")) {
      return;
    }

    removeItem(sticker.id)
      .then((result) => {
        if (result) {
          const newStickerIds = state.stickersIds.filter((id) => id !== sticker.id);

          setState((state) => ({
            ...state,
            stickers: state.stickers.filter(({ id }) => id !== sticker.id),
            stickersIds: newStickerIds,
          }));

          setItem(cloudStorageKey.savedStickersIds, JSON.stringify(newStickerIds));
        }
      })
  }, [state.stickersIds]);

  useEffect(() => {
    setState((state) => ({ ...state, isLoading: true }));
    getItem(cloudStorageKey.savedStickersIds)
      .then((result) => {
        const ids = JSON.parse(result || '[]');

        setState((state) => ({ ...state, stickersIds: ids }));
        return getStickers(state.limit, state.page, ids);
      })
      .then((result) => {
        setState((state) => ({ ...state, stickers: result, page: state.page + 1 }));
      })
      .finally(() => {
        setState((state) => ({ ...state, isLoading: false }));
      })
  }, []);

  const isMaxStickers = useMemo(() => {
    if (state.isLoading) {
      return false;
    }

    return state.stickersIds.length <= state.stickers.length;
  }, [state.stickersIds, state.isLoading, state.stickers]);

  return {
    isLoading: state.isLoading,
    stickers: state.stickers,
    loadMoreStickers,
    isMaxStickers,
    removeSticker
  }
}
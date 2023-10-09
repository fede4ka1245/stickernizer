import React, {useCallback, useEffect} from 'react';
import {Grid} from "@mui/material";
import Button from "../../../../ui/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
  changeTiming,
  download,
  initModule, resetMain,
  setProgress,
  toggleIsPaused, updateStickerName
} from "../../store/slices/main";
import Player from "../player/Player";
import {useSaveSticker} from "../../../../hooks/useSaveSticker";
import axios from "axios";
import Input from "../../../../ui/input/Input";

const Main = () => {
  const { progress, isPaused, player, stickerName } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const {
    isLoading,
    saveSticker
  } = useSaveSticker();

  const onStickerSave = useCallback(async (showAlert = true) => {
    let templateName = player.name;

    if (!templateName) {
      templateName = prompt("Create name for your sticker");

      if (!templateName) {
        alert('To save sticker you have to set name!');

        return false;
      }

      player.name = templateName || player.id;
    }

    const sticker = {
      id: player.id,
      layers: player.getLayers(),
      name: templateName
    }

    await saveSticker(sticker);

    if (showAlert) {
      alert('Your sticker was saved!');
    }

    return true;
  }, [saveSticker, player]);


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

  const onUpdateStickerName = useCallback((event) => {
    dispatch(updateStickerName(event.target.value));
  }, []);

  const loadSticker = useCallback((file) => {
    const formData = new FormData();
    formData.append("queryId", window.Telegram?.WebApp?.initDataUnsafe?.query_id);
    formData.append("sticker", file);

    axios({
      method: "post",
      url: 'https://surdogram.ru/upload-sticker',
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
  }, []);

  const onDownload = useCallback(() => {
    dispatch(download(loadSticker));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetMain());
    };
  }, []);

  return (
    <>
      <Player
        init={initStickerEditor}
        progress={progress}
        isPaused={isPaused}
        onProgressChange={onProgressChange}
        setIsPaused={setIsPaused}
      />
      <Grid p={'var(--space-sm)'} mt={'var(--space-sm)'}>
        <Input
          size={'small'}
          type={'outline'}
          label={'Sticker name'}
          fullWidth
          onChange={onUpdateStickerName}
          value={stickerName}
        />
      </Grid>
      <Grid mt={'auto'} p={'var(--space-sm)'} >
        <Button
          fullWidth
          size="large"
          variant="contained"
          onClick={onDownload}
        >
          Get sticker
        </Button>
      </Grid>
      <Grid p={'0 var(--space-sm) var(--space-sm) var(--space-sm)'} >
        <Button
          fullWidth
          size="large"
          variant="outline"
          onClick={onStickerSave}
          loading={isLoading.toString()}
        >
          Save sticker
        </Button>
      </Grid>
    </>
  );
};

export default Main;
import React, {useCallback, useEffect, useState} from 'react';
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
import {appAlert} from "../../../userFeedback";
import AppLoader from "../../../../ui/appLoader/AppLoader";

const Main = () => {
  const { progress, isPaused, player, stickerName } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    isLoading,
    saveSticker
  } = useSaveSticker();

  const onStickerSave = useCallback(async (showAlert = true) => {
    let templateName = player.name || player.id;

    const sticker = {
      id: player.id,
      layers: [...player.getLayers()].map((layer) => layer.getResolvedLayer()),
      name: templateName
    }

    await saveSticker(sticker);

    if (showAlert) {
      await appAlert('Your sticker was saved!');
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
      url: `https://back.stickernizer.space/upload-sticker`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .catch(async () => {
        setLoading(false);
        await appAlert("Unresolved error, something went wrong")
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const onDownload = useCallback(async () => {
    const sticker = {
      id: player.id,
      layers: [...player.getLayers()].map((layer) => layer.getResolvedLayer()),
      name: player.name || player.id,
    }
    await saveSticker(sticker);
    setLoading(true);
    dispatch(download(loadSticker));
  }, [onStickerSave]);

  useEffect(() => {
    return () => {
      dispatch(resetMain());
    };
  }, []);

  return (
    <>
      <AppLoader loading={loading} />
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
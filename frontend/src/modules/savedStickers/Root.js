import React, {useCallback} from 'react';
import {Grid, Typography} from "@mui/material";
import ButtonBackPanel from "../../components/buttonBackPanel/ButtonBackPanel";
import {useSavedStickers} from "./hooks/useSavedStickers";
import Sticker from "./components/sticker/Sticker";
import Button from "../../ui/button/Button";
import {useNavigate} from "react-router-dom";
import {routes} from "../../routes";

const Root = () => {
  const {
    isLoading,
    stickers,
    loadMoreStickers,
    isMaxStickers,
    removeSticker
  } = useSavedStickers();
  const navigate = useNavigate();

  const onEdit = useCallback((sticker) => {
    navigate(routes.stickerEditor, {
      state: sticker
    });
  }, []);

  return (
    <Grid display={'flex'} flexDirection={'column'} height={'100vh'}>
      <ButtonBackPanel>
        <Typography
          fontSize={'var(--font-size-md)'}
          fontWeight={'bold'}
          color={'var(--text-secondary-color)'}
          pl={'var(--space-sm)'}
        >
          Saved Stickers
        </Typography>
      </ButtonBackPanel>
      <Grid flex={'1 1 auto'} sx={{ overflowY: 'scroll' }} display={'flex'} flexDirection={'column'} height={0} p={'var(--space-sm)'}>
        <Grid>
          {stickers.map((sticker) => (
            <Grid key={sticker.id} mb={'var(--space-sm)'}>
              <Sticker
                sticker={sticker}
                onDelete={removeSticker}
                onEdit={onEdit}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid p={'var(--space-sm)'}>
        {!isMaxStickers && <Button
          fullWidth
          onClick={loadMoreStickers}
          loading={isLoading}
          size="large"
          variant="contained"
        >
          Load More Stickers
        </Button>}
      </Grid>
    </Grid>
  );
};

export default Root;
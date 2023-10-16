import React, {useCallback} from 'react';
import {Grid, Typography} from "@mui/material";

const ImageSetter = ({ imageSetterState, setImageSetterState }) => {
  const onImageChange = useCallback((event) => {
    const URL = window.URL || window.webkitURL;
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setImageSetterState({
      ...imageSetterState,
      src: URL.createObjectURL(file)
    });
  }, [imageSetterState]);

  return (
    <>
      <Grid mb={'var(--space-md)'}>
        <input
          style={{ color: 'var(--text-secondary-color)' }}
          type={'file'}
          name="Image"
          onChange={onImageChange}
          accept="image/*"
        />
      </Grid>
      <Typography
        fontSize={'var(--font-size-sm)'}
        lineHeight={'var(--font-size-sm)'}
        color={'var(--hint-color)'}
      >
        Saving video and image layers is currently not supported. This layer will not be saved!
      </Typography>
    </>
  );
};

export default ImageSetter;
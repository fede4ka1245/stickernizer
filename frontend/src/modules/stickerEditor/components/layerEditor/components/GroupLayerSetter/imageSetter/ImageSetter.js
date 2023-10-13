import React, {useCallback} from 'react';
import {Grid} from "@mui/material";

const ImageSetter = ({ imageSetterState, setImageSetterState }) => {
  const onImageChange = useCallback((event) => {
    const URL = window.URL || window.webkitURL;
    const file = event.target.files[0];
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
    </>
  );
};

export default ImageSetter;
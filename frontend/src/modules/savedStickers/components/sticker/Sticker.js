import React, {useCallback, useRef, useState} from 'react';
import styles from "../../../stickerEditor/components/layers/layer/Layer.module.css";
import ListItem from "../../../../ui/listItem/ListItem";
import {Grid, Typography} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import Menu from "../../../../ui/menu/Menu";
import Tappable from "../../../../ui/tappable/Tappable";

const Sticker = ({ sticker, onDelete, onEdit }) => {
  const buttonMoreRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleIsMenuOpen = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);

  return (
    <>
      <ListItem
        text={sticker.name || 'Default sticker'}
        noPhoto
        endListContent={<>
          <Grid display={'flex'} height={'inherit'} position={'relative'}>
            <Grid
              className={styles.tappable}
              onClick={toggleIsMenuOpen}
              display={'flex'}
              alignItems={'center'}
              border={'var(--element-border)'}
              borderRadius={'var(--border-radius-md)'}
              ref={buttonMoreRef}
            >
              <MoreVertRoundedIcon
                fontSize={'medium'}
                sx={{
                  color: 'var(--primary-color)'
                }}
              />
            </Grid>
            <Menu
              anchorEl={buttonMoreRef.current}
              open={isMenuOpen}
              onClose={toggleIsMenuOpen}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Grid minWidth={'130px'}>
                <Tappable onClick={() => onEdit(sticker)}>
                  <Typography
                    p={'var(--space-md)'}
                    fontSize={'var(--font-size-sm)'}
                    lineHeight={'var(--font-size-sm)'}
                    color={'var(--hint-color)'}
                    fontWeight={'bold'}
                  >
                    Edit
                  </Typography>
                </Tappable>
                <Tappable onClick={() => onDelete(sticker)}>
                  <Typography
                    fontSize={'var(--font-size-sm)'}
                    lineHeight={'var(--font-size-sm)'}
                    color={'var(--hint-color)'}
                    fontWeight={'bold'}
                    p={'var(--space-md)'}
                  >
                    Delete
                  </Typography>
                </Tappable>
              </Grid>
            </Menu>
          </Grid>
        </>}
      />
    </>
  );
};

export default Sticker;
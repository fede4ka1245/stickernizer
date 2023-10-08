import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ListItem from "../../../../../ui/listItem/ListItem";
import {Grid, Typography} from "@mui/material";
import ReorderRoundedIcon from '@mui/icons-material/ReorderRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import styles from './Layer.module.css';
import classNames from "classnames";
import Menu from "../../../../../ui/menu/Menu";
import Tappable from "../../../../../ui/tappable/Tappable";
import {useDispatch, useSelector} from "react-redux";
import {deleteLayer, openTab} from "../../../store/slices/main";
import {setLayer} from "../../../store/slices/layer";
import {tabs} from "../../../consts/tabs";
import lodash from "lodash";

const Layer = ({ layer, provided, snapshot }) => {
  const { player } = useSelector((state) => state.main);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonMoreRef = useRef(null);
  const dispatch = useDispatch();

  const toggleIsMenuOpen = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);

  const label = useMemo(() => {
    if (layer.layerName) {
      return layer.layerName;
    }

    if (layer.textProps.text) {
      return `Layer "${layer.textProps.text}"`;
    }

    return "Default Layer";
  }, [layer]);

  const onDeleteLayerClick = useCallback(() => {
    if (!window.confirm("Are you sure you want to delete the layer?")) {
      return;
    }

    dispatch(deleteLayer(layer.id));
  }, [layer]);

  const editLayer = useCallback(() => {
    const targetLayer = player.layers.find(({ id }) => layer.id === id);

    if (targetLayer) {
      dispatch(setLayer(lodash.cloneDeep(targetLayer)));
      dispatch(openTab(tabs.layer));
    }
  }, [layer]);

  useEffect(() => {
    if (snapshot.isDragging) {
      if (window.Telegram?.WebApp?.HapticFeedback?.impactOccurred) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light')
      }
    }
  }, [snapshot.isDragging]);

  return (
    <div
      {...provided.draggableProps}
      className={classNames({ [styles.dragging]: snapshot.isDragging })}
    >
      <ListItem
        text={label}
        endListContent={<>
          <Grid display={'flex'} height={'inherit'} position={'relative'}>
            <Grid
              className={styles.tappable}
              onClick={toggleIsMenuOpen}
              display={'flex'}
              alignItems={'center'}
              border={'var(--element-border)'}
              borderRadius={'var(--border-radius-md)'}
              mr={'var(--space-sm)'}
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
              <Tappable onClick={editLayer}>
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
                <Tappable onClick={onDeleteLayerClick}>
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
            <Grid
              className={styles.tappable}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              border={'var(--element-border)'}
              borderRadius={'var(--border-radius-md)'}
              width={'42px'}
              height={'42pxs'}
              {...provided.dragHandleProps}
            >
              <ReorderRoundedIcon
                fontSize={'medium'}
                sx={{
                  color: 'var(--primary-color)'
                }}
              />
            </Grid>
          </Grid>
        </>}
      />
    </div>
  );
};

export default Layer;
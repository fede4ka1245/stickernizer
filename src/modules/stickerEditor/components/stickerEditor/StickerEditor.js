import React, {useCallback, useMemo} from 'react';
import {Grid} from "@mui/material";
import Tabs from '../../../../ui/tabs/Tabs';
import Tab from '../../../../ui/tab/Tab';
import ButtonBack from "../../../../ui/buttonBack/ButtonBack";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../routes";
import {tabs} from "../../consts/tabs";
import {useDispatch, useSelector} from "react-redux";
import {
  openTab
} from "../../store/slices/main";
import Main from "../main/Main";
import Layers from "../layers/Layers";
import {useInitialLayers} from "../../hooks/useInitialLayers";

const StickerEditor = () => {
  const { tab } = useSelector((state) => state.main);
  const pageTabs = useMemo(() => Object.values(tabs), []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTabChange = useCallback((event, newValue) => {
    dispatch(openTab(tabs[newValue]));
  }, []);

  const onButtonBackClick = useCallback(() => {
    if (window.confirm("Your current progress won't be saved, confirm you want to exit.")) {
      navigate(routes.main);
    }
  }, []);

  useInitialLayers();

  return (
    <Grid display={'flex'} flexDirection={'column'} height={'var(--tg-viewport-stable-height)'}>
      {(tab.value === tabs.main.value || tab.value === tabs.layers.value) && <>
        <Grid
          position={'sticky'}
          left={0}
          top={0}
          display={'flex'}
          alignItems={'center'}
          ml={'var(--space-sm)'}
          mr={'var(--space-sm)'}
          pt={'var(--space-md)'}
          mb={'var(--space-md)'}
        >
          <Grid mr={'var(--space-sm)'}>
            <ButtonBack onClick={onButtonBackClick} />
          </Grid>
          <Grid
            border={'var(--element-border)'}
            overflow={'hidden'}
            borderRadius={'var(--border-radius-lg)'}
            backgroundColor={'var(--bg-color)'}
          >
            <Tabs
              value={tab.value}
              onChange={onTabChange}
              aria-label="sticker-editor-tabs"
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
            >
              {pageTabs.map(({ label, value }) => (
                <Tab key={value} label={label} value={value} />
              ))}
            </Tabs>
          </Grid>
        </Grid>
        <Grid m={'var(--space-sm)'} display={'inherit'} flexDirection={'inherit'} flex={1}>
          {tab.value === tabs.main.value && <Main />}
          {tab.value === tabs.layers.value && <Layers />}
        </Grid>
      </>}
    </Grid>
  );
};

export default StickerEditor;
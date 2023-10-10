import React, {useCallback, useLayoutEffect, useMemo} from 'react';
import {Grid} from "@mui/material";
import Tabs from '../../../../ui/tabs/Tabs';
import Tab from '../../../../ui/tab/Tab';
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../routes";
import {tabs} from "../../consts/tabs";
import {useDispatch, useSelector} from "react-redux";
import {
  openTab, resetWorkspace
} from "../../store/slices/main";
import Main from "../main/Main";
import Layers from "../layers/Layers";
import {useInitialLayers} from "../../hooks/useInitialLayers";
import ButtonBackPanel from "../../../../components/buttonBackPanel/ButtonBackPanel";
import LayerEditor from "../layerEditor/LayerEditor";
import {appConfirm} from "../../../userFeedback";

const StickerEditor = () => {
  const { tab } = useSelector((state) => state.main);
  const pageTabs = useMemo(() => [tabs.main, tabs.layers], []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onTabChange = useCallback((event, newValue) => {
    dispatch(openTab(tabs[newValue]));
  }, []);

  const onButtonBackClick = useCallback(async () => {
    if (await appConfirm("Confirm you want to exit. If you don't save sticker, the progress will be lost!")) {
      navigate(routes.main);
    }
  }, []);

  useInitialLayers();

  useLayoutEffect(() => {
    return () => {
      dispatch(resetWorkspace());
    }
  }, []);

  return (
    <Grid display={'flex'} flexDirection={'column'} height={'var(--tg-viewport-stable-height)'}>
      {(tab.value === tabs.main.value || tab.value === tabs.layers.value) && <>
        <ButtonBackPanel
          onButtonBackClick={onButtonBackClick}
        >
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
        </ButtonBackPanel>
        <Grid display={'inherit'} flexDirection={'inherit'} flex={1}>
          {tab.value === tabs.main.value && <Main />}
          {tab.value === tabs.layers.value && <Layers />}
        </Grid>
      </>}
      {tab.value === tabs.layer.value && (
        <LayerEditor />
      )}
    </Grid>
  );
};

export default StickerEditor;
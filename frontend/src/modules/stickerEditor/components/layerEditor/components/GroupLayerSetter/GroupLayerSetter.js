import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Grid} from "@mui/material";
import Tabs from "../../../../../../ui/tabs/Tabs";
import Tab from "../../../../../../ui/tab/Tab";
import TextSetter from "./textSetter/TextSetter";
import TransformSetter from "./transformSetter/TransformSetter";
import TimingSetter from "./timingSetter/TimingSetter";
import {useDispatch, useSelector} from "react-redux";
import {updateProperties} from "../../../../store/slices/layer";
import TextStylingSetter from "./textStylingSetter/TextStylingSetter";
// import VideoSetter from "./videoSetter/VideoSetter";
// import ImageSetter from "./imageSetter/ImageSetter";

const tabs = {
  // video: {
  //   label: 'Video',
  //   value: 'video'
  // },
  // image: {
  //   label: 'Image',
  //   value: 'image'
  // },
  text: {
    label: 'Text',
    value: 'text',
  },
  textStyling: {
    label: 'Text styling',
    value: 'textStyling',
  },
  transform: {
    label: 'Transform',
    value: 'transform'
  },
  timing: {
    label: 'Timing',
    value: 'timing'
  },
};

const GroupLayerSetter = ({ type }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const [tab, setTab] = useState(tabs.text);
  const activeTabs = useMemo(() => {
    return Object.values(tabs);
  }, []);
  const { layer } = useSelector((state) => state.layer);

  const onTabChange = useCallback((_, newTab) => {
    setTab(tabs[newTab]);
  }, []);

  const updateState = useCallback((state) => {
    dispatch(updateProperties(state));
    setState(state);
  }, []);

  const onTextPropsChange = useCallback((textProps) => {
    updateState({
      ...state,
      textProps
    })
  }, [state]);

  const onTimingPropsChange = useCallback((timingProps) => {
    updateState({
      ...state,
      timingProps
    })
  }, [state]);

  const onTransformPropsChange = useCallback((transformProps) => {
    updateState({
      ...state,
      transformProps
    })
  }, [state]);

  useEffect(() => {
    if (layer) {
      updateState(JSON.parse(JSON.stringify(layer)));
    }
  }, [layer]);

  const onTouchMove = useCallback((event) => {
    event.stopPropagation();
  }, []);

  return (
    <>
      <Grid
        width={'100%'}
        borderBottom={'var(--element-border)'}
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
          {activeTabs.map(({ label, value }) => (
            <Tab key={value} label={label} value={value} />
          ))}
        </Tabs>
      </Grid>
      {state && <Grid
        border={'var(--element-border)'}
        borderRadius={'var(--border-radius-lg)'}
        backgroundColor={'var(--bg-color)'}
        onTouchMove={onTouchMove}
        height={'100%'}
        sx={{ overflowY: 'scroll' }}
        m={'var(--space-sm)'}
        p={'var(--space-md)'}
      >
        {tab.value === tabs.text.value && (
          <TextSetter
            textSetterState={state.textProps}
            setTextSetterState={onTextPropsChange}
          />
        )}
        {tab.value === tabs.transform.value && (
          <TransformSetter
            transformState={state.transformProps}
            setTransformState={onTransformPropsChange}
          />
        )}
        {tab.value === tabs.timing.value && (
          <TimingSetter
            timingState={state.timingProps}
            setTimingState={onTimingPropsChange}
          />
        )}
        {tab.value === tabs.textStyling.value && (
          <TextStylingSetter
            textSetterState={state.textProps}
            setTextSetterState={onTextPropsChange}
          />
        )}
        {/*{tab.value === tabs.video.value && (*/}
        {/*  <VideoSetter*/}
        {/*    videoSetterState={state.videoProps}*/}
        {/*    setVideoSetterState={onVideoPropsChange}*/}
        {/*  />*/}
        {/*)}*/}
        {/*{tab.value === tabs.image.value && (*/}
        {/*  <ImageSetter />*/}
        {/*)}*/}
      </Grid>}
    </>
  );
};

export default GroupLayerSetter;
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Input from "../../ui/input/Input";
import {Grid} from "@mui/material";
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded';
import styles from './InputNumber.module.css';

const InputNumber = ({ value, onChange, max, min, step = 1, onValueChange, label, ...props }) => {
  const [inputValue, setInputValue] = useState(value);
  const controller = useRef({
    upTimeoutId: 0,
    isFirstTouchTimoutEnd: false,
    firstTimeTimeoutId: 0,
    downTimeoutId: 0,
    isFirstDownTouchTimoutEnd: false,
    firstDownTimeTimeoutId: 0
  });
  const upRef = useRef(null);
  const downRef = useRef(null);

  const onInputUp = useCallback(() => {
    setInputValue((value) => {
      if (+value === max) {
        return value;
      }

      return Number((+value + step).toFixed(1));
    })
  }, [max, step]);

  const onInputDown = useCallback(() => {
    setInputValue((value) => {
      if (+value === min) {
        return value;
      }

      return Number((+value - step).toFixed(1));
    })
  }, [min, step]);

  useEffect(() => {
    if (max && Number(inputValue) > max) {
      setInputValue(max);
      return;
    } else if (min && Number(inputValue) < min) {
      setInputValue(min)
      return;
    }

    onChange(Number(inputValue));
  }, [inputValue]);

  const onInputChange = useCallback((event) => {
    setInputValue(event.target.value);
  }, []);

  useEffect(() => {
    if (upRef.current) {
      upRef.current.onpointerdown = () => {
        controller.firstTimeTimoutId = setTimeout(() => {
          controller.isFirstTouchTimoutEnd = true;
        }, 250);

        const up = () => {
          if (controller.isFirstTouchTimoutEnd) {
            onInputUp();
          }

          controller.upTimeoutId = setTimeout(up, 80);
        }

        up();
      }

      const onCancel = () => {
        clearTimeout(controller.firstTimeTimoutId);
        clearTimeout(controller.upTimeoutId);
        controller.isFirstTouchTimoutEnd = false;
      }


      upRef.current.addEventListener('pointerup', onCancel)
      upRef.current.addEventListener('pointercancel', onCancel)
      upRef.current.addEventListener('touchend', onCancel);
      upRef.current.addEventListener('touchcancel', onCancel);
    }

    if (downRef.current) {
      downRef.current.onpointerdown = () => {
        controller.firstDownTimeTimoutId = setTimeout(() => {
          controller.isFirstDownTouchTimoutEnd = true;
        }, 250);

        const down = () => {
          if (controller.isFirstDownTouchTimoutEnd) {
            onInputDown();
          }

          controller.downTimeoutId = setTimeout(down, 80);
        }

        down();
      }

      const onCancel = () => {
        clearTimeout(controller.firstDownTimeTimoutId);
        clearTimeout(controller.downTimeoutId);
        controller.isFirstDownTouchTimoutEnd = false;
      }

      downRef.current.addEventListener('pointerup', onCancel)
      downRef.current.addEventListener('pointercancel', onCancel)
      downRef.current.addEventListener('touchend', onCancel);
      downRef.current.addEventListener('touchcancel', onCancel);
    }
  }, []);

  return (
    <Grid display={'flex'}>
      <Grid flex={1}>
        <Input
          {...props}
          value={inputValue}
          onChange={onInputChange}
          size={'small'}
          label={label || 'input'}
          variant="outlined"
          type={'number'}
        />
      </Grid>
      <Grid display={'flex'} flexDirection={'column'} ml={'var(--space-sm)'}>
        <Grid
          display={'flex'}
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
          border='solid var(--primary-color) 1px'
          width={'40px'}
          className={styles.tappable}
          onClick={onInputUp}
          ref={upRef}
          borderRadius={'var(--border-radius-sm) var(--border-radius-sm) 0 0'}
        >
          <ArrowDropUpRoundedIcon
            sx={{
              height: '19px',
              color: 'var(--primary-color)'
            }}
          />
        </Grid>
        <Grid
          display={'flex'}
          width={'40px'}
          justifyContent={'center'}
          height={'50%'}
          alignItems={'center'}
          border='solid var(--primary-color) 1px'
          className={styles.tappable}
          onClick={onInputDown}
          ref={downRef}
          borderRadius={'0 0 var(--border-radius-sm) var(--border-radius-sm)'}
        >
          <ArrowDropDownRoundedIcon
            sx={{
              height: '19px',
              color: 'var(--primary-color)'
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default InputNumber;
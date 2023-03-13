import { useState, useRef, SyntheticEvent } from 'react';
import { isDesktop } from 'react-device-detect';

type useLongPressCmd = {
  longPressCb: (rowIndex: number, elIndex: number) => void;
  clickCb: (e: SyntheticEvent, rowIndex: number, elIndex: number) => void;
};

const useLongPress = (cmd: useLongPressCmd) => {
  const { longPressCb, clickCb } = cmd;

  const [action, setAction] = useState<string>();

  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isLongPress = useRef<boolean>();

  const startPressTimer = () => {
    isLongPress.current = false;
    timerRef.current = setTimeout(() => {
      isLongPress.current = true;
      setAction('longpress');
    }, 500);
  };

  const handleOnClick = (
    e: SyntheticEvent,
    rowIndex: number,
    elIndex: number
  ) => {
    if (!isDesktop) {
      return;
    }

    // console.log('onclick');
    clickCb(e, rowIndex, elIndex);

    if (isLongPress.current) {
      // console.log('long press - return from onclick');
      return;
    }
    setAction('click');
  };

  const handleOnMouseDown = () => {
    if (!isDesktop) {
      return;
    }

    // console.log('mouse down');
    startPressTimer();
  };

  const handleOnMouseUp = () => {
    if (!isDesktop) {
      return;
    }

    // console.log('mouse up');
    clearTimeout(timerRef.current);
  };

  const handleOnTouchStart = () => {
    if (isDesktop) {
      return;
    }
    // console.log('touch start');
    startPressTimer();
  };

  const handleOnTouchEnd = (
    e: SyntheticEvent,
    rowIndex: number,
    elIndex: number
  ): void => {
    if (isDesktop) {
      return;
    }

    if (action === 'longpress') {
      // console.log('long press');
      longPressCb(rowIndex, elIndex);
      clearTimeout(timerRef.current);
      setAction('click');
      return;
    }

    // console.log('touch end');
    clickCb(e, rowIndex, elIndex);
    clearTimeout(timerRef.current);
  };

  return {
    action,
    handlers: {
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
      onClick: handleOnClick,
      onMouseDown: handleOnMouseDown,
      onMouseUp: handleOnMouseUp,
    },
  };
};

export default useLongPress;

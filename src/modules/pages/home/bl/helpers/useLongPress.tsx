import { useState, useRef } from 'react';

type useLongPressCmd = {
  longTouchEndCb: (rowIndex: number, elIndex: number) => void;
};

const useLongPress = (cmd: useLongPressCmd) => {
  const { longTouchEndCb } = cmd;

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

  const handleOnTouchStart = () => {
    console.log('handleOnTouchStart');
    startPressTimer();
  };

  const handleOnTouchEnd = (rowIndex: number, elIndex: number): void => {
    if (action === 'longpress') {
      console.log('do on long press end');
      longTouchEndCb(rowIndex, elIndex);
      return;
    }

    console.log('handleOnTouchEnd');
    clearTimeout(timerRef.current);
  };

  return {
    action,
    handlers: {
      onTouchStart: handleOnTouchStart,
      onTouchEnd: handleOnTouchEnd,
    },
  };
};

export default useLongPress;

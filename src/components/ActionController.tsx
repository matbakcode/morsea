import { MdOutlineOfflineBolt } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";
import { CONFIG } from "../contans/config.ts";
import { isKeySpace } from "../utils/isKeySpace.ts";
import { SignalTypes } from "../types.ts";
import { Stages } from "../enums.ts";

interface ActionButtonProps {
  stage: Stages;
  addCurrentSignalSymbol: (signalSymbol: SignalTypes) => void;
  setStage: (stage: Stages) => void;
}

function ActionController({
  stage,
  addCurrentSignalSymbol,
  setStage,
}: ActionButtonProps) {
  const keyDownTimestamp = useRef<Date>(new Date());
  const keyUpTimestamp = useRef<Date>(new Date());
  const pressed = useRef<boolean>(false);
  const [pressedTime, setPressTime] = useState(0);

  const handleActionDown = useCallback(() => {
    if (!pressed.current) {
      pressed.current = true;
      keyDownTimestamp.current = new Date();
      setStage(Stages.ACTIVE);
    }
  }, [pressed, setStage]);

  const handleActionUp = useCallback(() => {
    if (pressed.current) {
      pressed.current = false;
      keyUpTimestamp.current = new Date();
      const pressTime =
        keyUpTimestamp.current.getTime() - keyDownTimestamp.current.getTime();
      setPressTime(pressTime);
    }
  }, [pressed]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isKeySpace(e)) {
      e.preventDefault();
      handleActionDown();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (isKeySpace(e)) {
      e.preventDefault();
      handleActionUp();
    }
  };

  const handleTouchUp = () => {
    handleActionUp();
  };

  const handleTouchDown = () => {
    handleActionDown();
  };

  useEffect(() => {
    if (pressedTime > 0) {
      const signalSymbol =
        pressedTime < CONFIG.timeDashPressable
          ? SignalTypes.DOT
          : SignalTypes.DASH;
      addCurrentSignalSymbol(signalSymbol);
    }
  }, [pressedTime]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
    document.addEventListener("keyup", handleKeyUp, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className={"flex justify-center flex-col items-center"}>
      <div className={"relative w-32 h-32"}>
        <button
          type={"button"}
          onTouchStart={handleTouchDown}
          onTouchEnd={handleTouchUp}
          onMouseDown={handleActionDown}
          onMouseUp={handleActionUp}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          className={
            "relative left-4 top-4 z-40 w-24 h-24 rounded-full flex items-center justify-center bg-slate-100 drop-shadow text-4xl text-slate-300 hover:text-slate-800 transition-colors"
          }
        >
          <MdOutlineOfflineBolt />
        </button>
        <div
          className={`${stage === Stages.IDLE ? `opacity-0` : "opacity-100"} absolute z-20 left-0 top-0 w-32 h-32 rounded-full bg-gradient-to-b flex items-center justify-center from-red-500 to-orange-600 transition-all`}
        ></div>
        <div
          className={`absolute z-10 left-0 top-0 w-32 h-32 rounded-full bg-gradient-to-b flex items-center justify-center from-green-400 to-blue-500`}
        ></div>
      </div>
    </div>
  );
}

export default ActionController;

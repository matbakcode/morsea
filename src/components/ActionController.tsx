import { MdOutlineOfflineBolt } from "react-icons/md";
import { useEffect, useState } from "react";
import { CONFIG } from "../contans/config.ts";
import { isKeyAndIsSpace } from "../utils/isKeyAndIsSpace.ts";
import { SignalTypes } from "../types.ts";
import { Stages } from "../enums.ts";

interface ActionButtonProps {
  stage: Stages;
  addCurrentSignalSymbol: (signalSymbol: SignalTypes) => void;
  setStage: (stage: Stages) => void,
}

function ActionController({
  stage,
  addCurrentSignalSymbol,
                            setStage,
}: ActionButtonProps) {
  const [keyDownTime, setKeyDownTime] = useState<Date>(new Date());
  const [keyUpTime, setKeyUpTime] = useState<Date>(new Date());
  let pressed = false;

  function handleActionDown(e?: KeyboardEvent) {
    if ((e && !isKeyAndIsSpace(e)) || pressed) {
      return;
    }
    setStage(Stages.ACTIVE);
    setKeyDownTime(new Date());
    pressed = true;
  }

  function handleActionUp(e?: KeyboardEvent) {
    if (e && !isKeyAndIsSpace(e)) {
      return;
    }
    setKeyUpTime(new Date());
    pressed = false;
  }

  useEffect(() => {
    const time = keyUpTime.getTime() - keyDownTime.getTime();
    if (time > 0) {
      const signalSymbol =
        time < CONFIG.timeDashPressable ? SignalTypes.DOT : SignalTypes.DASH;
      addCurrentSignalSymbol(signalSymbol);
    }
  }, [keyUpTime]);

  useEffect(() => {
    document.addEventListener("keydown", handleActionDown, true);
    document.addEventListener("keyup", handleActionUp, true);

    return () => {
      document.removeEventListener("keydown", handleActionDown);
      document.removeEventListener("keyup", handleActionUp);
    };
  }, []);

  return (
    <div className={"flex justify-center flex-col items-center"}>
      <div className={"relative w-32 h-32"}>
        <button
          type={"button"}
          onTouchStart={() => handleActionDown()}
          onTouchEnd={() => handleActionUp()}
          onMouseDown={() => handleActionDown()}
          onMouseUp={() => handleActionUp()}
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

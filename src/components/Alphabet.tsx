import { CHARS } from "../contans/chars.ts";
import { SignalTypes } from "../types.ts";
import { signalToSymbolTransform } from "../utils";
import { memo } from "react";

function AlphabetComponent() {
  function displaySymbols(signal: Array<SignalTypes>) {
    let fullSignal = "";
    signal.forEach((signalSymbol) => {
      fullSignal += signalToSymbolTransform(signalSymbol);
    });
    return fullSignal;
  }

  return (
    <div className={"grid grid-cols-3"}>
      {CHARS.map((charMap) => (
        <div
          key={"key_" + charMap.char}
          className={"flex text-gray-500 text-[10px]"}
        >
          <div className={"pr-2"}>{charMap.char}</div>
          <span className={"tracking-widest"}>
            {displaySymbols(charMap.morseSymbols)}
          </span>
        </div>
      ))}
    </div>
  );
}

const Alphabet = memo(AlphabetComponent);
export default Alphabet;

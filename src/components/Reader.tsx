import { useCallback, useEffect, useRef, useState } from "react";
import { SignalTypes } from "../types.ts";
import ActionController from "./ActionController.tsx";
import Alphabet from "./Alphabet.tsx";
import Button from "./ui/Button.tsx";
import { MdOutlineBackspace, MdOutlineCleaningServices } from "react-icons/md";
import { CONFIG } from "../contans/config.ts";
import { Stages } from "../enums.ts";
import { CHARS } from "../contans/chars.ts";
import { IoArrowDownSharp } from "react-icons/io5";
import {arraysEqual, decodeSignalToText, morseSequenceToLetter, signalToSymbolTransform} from "../utils";

function Reader() {
  const [messageSignal, setMessageSignal] = useState<Array<Array<SignalTypes>>>(
    [],
  );
  const [currentSignal, setCurrentSignal] = useState<Array<SignalTypes>>([]);
  const listenTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [stage, setStage] = useState<Stages>(Stages.IDLE);

  function backspaceMessage() {
    setMessageSignal((message) => message.slice(0, -1));
  }

  function clearMessage() {
    setCurrentSignal([]);
    setMessageSignal([]);
  }
  const addCurrentSignalSymbol = useCallback((signalSymbol: SignalTypes) => {
    setCurrentSignal((currentSignal) => [...currentSignal, signalSymbol]);
  }, []);

  function resetIdleTimeout() {
    clearTimeout(listenTimeout.current ?? 0);
    listenTimeout.current = setTimeout(() => {
      setStage(Stages.IDLE);
    }, CONFIG.timeDistance);
  }

  useEffect(() => {
    if (currentSignal.length) {
      resetIdleTimeout();
    } else {
      clearTimeout(listenTimeout.current ?? 0);
    }
  }, [currentSignal]);

  useEffect(() => {
    console.log(stage);
    if (stage === Stages.IDLE) {
      CHARS.forEach((char) => {
        if (arraysEqual<SignalTypes>(currentSignal, char.morseSymbols)) {
          setMessageSignal((signal) => [...signal, currentSignal]);
        }
      });
      setCurrentSignal([]);
    }
  }, [stage]);

  useEffect(() => {
    return () => {
      clearTimeout(listenTimeout.current ?? 0);
    };
  }, []);

  return (
    <div className={"flex flex-wrap flex-col justify-center align-middle"}>
      {/*Coded Messages*/}
      <div>
        <div className={"min-h-12"}>
          <div
            className={
              "mt-2 min-h-12 flex flex-wrap justify-center items-center text-xl tracking-wider"
            }
          >
            {messageSignal.map((signal, i) => (
              <span key={i} className={"text-slate-900"}>
                {decodeSignalToText(signal)}
              </span>
            ))}
            {currentSignal.map((signalChar, i) => (
              <span key={i} className={"text-blue-500"}>
                {signalToSymbolTransform(signalChar)}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/*!Coded Messages*/}

      <div
        className={
          "min-h-12 flex items-center justify-center text-slate-400 text-xl"
        }
      >
        {messageSignal.length > 0 && <IoArrowDownSharp />}
      </div>

      {/*Decoded Message*/}
      <div
        className={
          "min-h-12 flex text-center items-center justify-center text-xl tracking-wider"
        }
      >
        {messageSignal.map((signal) => morseSequenceToLetter(signal))}
      </div>
      {/*!Decoded Message*/}

      <div className={"mt-8"}>
        <Alphabet />
      </div>

      <div
        className={"mt-12 gap-8 flex justify-center items-center align-middle"}
      >
        <Button onClick={clearMessage}>
          <MdOutlineCleaningServices /> clear
        </Button>
        <ActionController
          stage={stage}
          setStage={setStage}
          addCurrentSignalSymbol={addCurrentSignalSymbol}
        />
        <Button onClick={backspaceMessage}>
          <MdOutlineBackspace /> back
        </Button>
      </div>
      <div className={"mt-4 text-center text-sm text-slate-400 italic"}>
        Click button or press Space
      </div>
    </div>
  );
}

export default Reader;

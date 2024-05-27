import { SignalTypes } from "../types.ts";
import { signalToSymbolTransform } from "./signalToSymbolTransform.ts";

export function decodeSignalToText(signals: Array<SignalTypes>): string {
  let message = "";
  signals.forEach((signal) => {
    message += signalToSymbolTransform(signal);
  });
  return message;
}

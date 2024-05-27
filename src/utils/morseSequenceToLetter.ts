import { SignalTypes } from "../types.ts";
import { CHARS } from "../contans/chars.ts";
import { arraysEqual } from "./arrayEqual.ts";

export function morseSequenceToLetter(
  sequence: Array<SignalTypes>,
): string | null {
  let letter = null;
  CHARS.forEach((char) => {
    if (arraysEqual<SignalTypes>(sequence, char.morseSymbols)) {
      letter = char.char;
    }
  });

  return letter;
}

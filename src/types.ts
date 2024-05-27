export type CharSign = {
  char: string;
  morseSymbols: Array<SignalTypes>;
};

export enum SignalTypes {
  DASH,
  DOT,
}

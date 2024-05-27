import { SignalTypes } from "../types.ts";
import { CONFIG } from "../contans/config.ts";

export function signalToSymbolTransform(signalSymbol: SignalTypes): string {
  switch (signalSymbol) {
    case SignalTypes.DASH:
      return CONFIG.displayMorseDash;
    case SignalTypes.DOT:
      return CONFIG.displayMorseDot;
  }
}

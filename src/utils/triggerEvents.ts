import React from "react";

export function isTouchEvent(
  e: React.TouchEvent | React.KeyboardEvent,
): e is React.TouchEvent {
  return e && "touches" in e;
}

export function isKeyboardEvent(
  e: React.TouchEvent | React.KeyboardEvent,
): e is React.KeyboardEvent {
  return e && "code" in e;
}

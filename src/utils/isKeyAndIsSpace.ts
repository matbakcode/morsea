export function isKeyAndIsSpace(e: KeyboardEvent | undefined): boolean {
  if (e) {
    return e?.code === "Space";
  }
  return false;
}

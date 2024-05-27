export function isKeySpace(e: KeyboardEvent | undefined): boolean {
  if (e) {
    return e?.code === "Space";
  }
  return false;
}

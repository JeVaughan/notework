
export function getUserSelection(): string {
  if (window.getSelection) {
    return window.getSelection().toString();

  } else if (document.getSelection) {
    return document.getSelection().toString();
  }

  return "";
}
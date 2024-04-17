export function getDomElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`${selector} is null`);
  }
  return element;
}

export function getDomElements<T extends HTMLElement>(selector: string): NodeListOf<T> {
  const element = document.querySelectorAll<T>(selector);
  if (!element) {
    throw new Error(`${selector} is null`);
  }
  return element;
}

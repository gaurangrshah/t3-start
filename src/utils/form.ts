/**
 *
 *
 * @export
 * @param {HTMLInputElement} input
 * @return {*}
 */
export function parseFormData(input: HTMLInputElement) {
  // form input mapping helper component used to return an array of objects for each input value.
  return {
    [input?.name]: input?.value,
  };
}

/**
 *
 *
 * @export
 * @param {HTMLInputElement[]} inputsElements
 * @return {*}
 */
type AllInputsType = HTMLInputElement | HTMLTextAreaElement;
export function convertFormToObject(
  inputsElements: AllInputsType[]
): Record<string, string> {
  return inputsElements.reduce((obj, item) => {
    if (item.name && item.value) {
      return {
        ...obj,
        [item.name.trim()]: item.value.trim(),
      };
    }
    return { ...obj };
  }, {});
}

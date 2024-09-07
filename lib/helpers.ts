export function getInputValue(input: HTMLInputElement) {
    if (!input.value) {
      return '';
    }

    if (input.type === 'number') {
      return parseInt(input.value);
    } else {
      return input.value;
    }
}
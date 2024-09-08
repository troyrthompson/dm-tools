export function getInputValue(input: HTMLInputElement | null) {
    if (!input || !input.value) {
      return '';
    }

    if (input.type === 'number') {
      return parseInt(input.value);
    } else {
      return input.value;
    }
}
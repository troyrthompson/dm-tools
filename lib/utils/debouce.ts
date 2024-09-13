export function debounce(func, delay) {
    let timeout;
    return () => {
        timeout = setTimeout(() => {
            func();
        }, delay);
    }
}

export function clone<T>(source: T) {
    return JSON.parse(JSON.stringify(source));
}

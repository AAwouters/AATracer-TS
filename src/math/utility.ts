export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

export function random_in_range(min: number, max: number): number {
    return min + (max-min) * Math.random();
}
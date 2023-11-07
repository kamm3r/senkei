/**
 *
 * @param {number} value current value
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number} Returns the value clamped between min and max
 */
export function clamp(value: number, min: number, max: number): number{
    return value < min ? min : value > max ? max : value;
}
/**
 * Returns the value clamped between 0 and 1
 */
export function clamp01(value: number): number {
    return value < 0 ? 0 : value > 1 ? 1 : value;
}
/**
 * Clamps the value between -1 and 1
 */
export function clampNeg1to1(value: number): number{
    return value < -1 ? -1 : value > 1 ? 1 : value;
}


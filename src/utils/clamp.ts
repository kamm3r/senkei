/**
 * 
 * @param {number} value current value
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number} Returns the value clamped between min and max
 */
export const clamp = (value: number, min: number, max: number): number => value < min ? min : value > max ? max : value;
/**
 * Returns the value clamped between 0 and 1
 */
export const clamp01 = (value: number): number => value < 0 ? 0 : value > 1 ? 1 : value;
/**
 * Clamps the value between -1 and 1
 */
export const clampNeg1to1 = (value: number): number => value < -1 ? -1 : value > 1 ? 1 : value;


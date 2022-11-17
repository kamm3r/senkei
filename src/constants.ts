export const EPSILON = 0.000001
export let ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;

/**
 * Sets the type of array used when creating new vectors and matrices
 * @param {Float32ArrayConstructor | ArrayConstructor} type Array type, such as Float32Array or Array
 */
export const setMatrixArrayType = (type: typeof ARRAY_TYPE): void => {
    ARRAY_TYPE = type
}
/**
 * Convert Degree to Radian
 * @param {Number} a Angle in Degrees 
 */

export const toRadian = (a: number): number => {
    const degree = Math.PI / 180
    return a * degree
}

/**
 * Tests whether or not the arguments have approximately the same value,within an absolute
 * or relative tolerance of EPSILON 
 * @param {Number} a 
 * @param {Number} b 
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
export const equals = (a: number, b: number): boolean => {
    return Math.abs(a - b) <= EPSILON * Math.max(1.0, Math.abs(a), Math.abs(b))
}
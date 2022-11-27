export const Inifinity = Number.POSITIVE_INFINITY
export const NegativeInifinity = Number.NEGATIVE_INFINITY
export const TAU = 6.28318530717959
export const GOLDEN_RATIO = 1.61803398875
export const Deg2Rad = 0.01745329
export const Rad2Deg = 57.29578
export const EPSILON = Number.EPSILON
// export const EPSILON = 0.000001
// <summary>A very small value, used for various floating point inaccuracy thresholds</summary>
// public static readonly float Epsilon = UnityEngineInternal.MathfInternal.IsFlushToZeroEnabled ? UnityEngineInternal.MathfInternal.FloatMinNormal : UnityEngineInternal.MathfInternal.FloatMinDenormal;

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
    return Deg2Rad * a
}

/**
 * Convert Radian to Degree
 * @param {Number} a Angle in Degrees 
 */

export const toDegree = (a: number): number => {
    return Rad2Deg * a
}

// export const smoothDamp = (current:number,target:number, currentVelocity:number, smoothTime:number, maxSpeed = 90 /*infinity??*/, deltaTime: number): number => {
//     return 4
// }
// export const smoothDampAngle = (current:number,target:number, currentVelocity:number, smoothTime:number, maxSpeed = 90 /*infinity??*/, deltaTime: number): number => {
//     return 2
// }
// export const smoothStep = (from: number, to:number, t:number):number => {
//     return 1
// }

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
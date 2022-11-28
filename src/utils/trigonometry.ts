// Trigonometry
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the cosine of the given angle. Equivalent to the x-component of a unit vector with the same angle
 */
export const Cos = (angRad: number): number => Math.cos(angRad)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the sine of the given angle. Equivalent to the y-component of a unit vector with the same angle
 */
export const Sin = (angRad: number): number => Math.sin(angRad)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the tangent of the given angle
 */
export const Tan = (angRad: number): number => Math.tan(angRad)
/**
 * 
 * @param value A value between -1 and 1
 * @returns Returns the arc cosine of the given value, in radians
 */
export const Acos = (value: number): number => Math.acos(value)
/**
 * 
 * @param value A value between -1 and 1
 * @returns Returns the arc sine of the given value, in radians
 */
export const Asin = (value: number): number => Math.asin(value)
/**
 * 
 * @param value A value between -1 and 1
 * @returns Returns the arc tangent of the given value, in radians
 */
export const Atan = (value: number): number => Math.atan(value)
/**
 * 
 * @param y The y component of the vector. They're flipped yeah I know but this is how everyone implements if for some godforsaken reason
 * @param x The x component of the vector. They're flipped yeah I know but this is how everyone implements if for some godforsaken reason
 * @returns Returns the angle of a vector. I don't recommend using this function, it's confusing~ Use Mathfs.DirToAng instead
 */
export const Atan2 = (y: number, x: number): number => Math.atan2(y, x)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the cosecant of the given angle
 */
export const Csc = (angRad: number): number => 1 / Math.sin(angRad)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the secant of the given angle
 */
export const Sec = (angRad: number): number => 1 / Math.cos(angRad)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the cotangent of the given angle
 */
export const Cot = (angRad: number): number => 1 / Math.tan(angRad)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the versine of the given angle
 */
export const Ver = (angRad: number): number => 1 - Math.cos(angRad)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the coversine of the given angle
 */
export const Cvs = (angRad: number): number => 1 - Math.sin(angRad)
/**
 * 
 * @param angRad Angle in radians
 * @returns Returns the chord of the given angle
 */
export const Crd = (angRad: number): number => 2 * Math.sin(angRad / 2)

const SINC_W = 0.01;
const SINC_P_C2 = -1 / 6.0;
const SINC_P_C4 = 1 / 120.0;
const SINCRCP_P_C2 = 1 / 6.0;
const SINCRCP_P_C4 = 7 / 360.0;
/**
 * 
 * @param x The input value for the Sinc function
 * @returns The unnormalized sinc function sin(x)/x, properly handling the removable singularity around x = 0
 */
export const Sinc = (x: number): number => {
    x = Math.abs(x)
    if (x < SINC_W) {
        let x2 = x * x
        let x4 = x2 * x2
        return 1 + SINC_P_C2 * x2 + SINC_P_C4 * x4
    }
    return Math.sin(x) / x
}
/**
 * 
 * @param x The input value for the reciprocal Sinc function
 * @returns The unnormalized reciprocal sinc function x/sin(x), properly handling the removable singularity around x = 0
 */
export const SincRcp = (x: number): number => {
    x = Math.abs(x)
    if (x < SINC_W) {
        let x2 = x * x
        let x4 = x2 * x2
        return 1 + SINCRCP_P_C2 * x2 + SINCRCP_P_C4 * x4
    }
    return x / Math.sin(x)
}
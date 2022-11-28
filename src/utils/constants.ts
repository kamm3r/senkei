// The circle constant. Defined as the circumference of a circle divided by its radius. Equivalent to 2*pi
export const TAU = 6.28318530717959
// An obscure circle constant. Defined as the circumference of a circle divided by its diameter. Equivalent to 0.5*tau
export const PI = Math.PI
//Euler's number. The base of the natural logarithm. f(x)=e^x is equal to its own derivative
export const E = 2.71828182846
//The golden ratio. It is the value of a/b where a/b = (a+b)/a. It's the positive root of x^2-x-1
export const GOLDEN_RATIO = 1.61803398875
// The square root of two. The length of the vector (1,1)
export const SQRT2 = 1.41421356237
// The square root of two. The length of the vector (1,1)
export const RSQRT2 = 1 / 1.41421356237
//Multiply an angle in degrees by this, to convert it to radians
export const Deg2Rad = 0.01745329
// Multiply an angle in radians by this, to convert it to degrees
export const Rad2Deg = 57.29578

export const Mat = Float32Array
export const Vec = Float32Array

export const smoothStep = (from: number, to: number, t: number): number => {
    if (t < from) 0;
    if (t >= to) 1;
    t = (t - from) / (to - from)
    return t * t * (3 - 2 * t)
}

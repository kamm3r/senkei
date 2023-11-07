import { Vec2 } from "../Vec2";
import { Vec3 } from "../Vec3";
import { Vec4 } from "../Vec4";

export const Sqrt = (value: number): number => Math.sqrt(value);
export function Sqrt2(v: Vec2): Vec2 {
    return new Vec2(Sqrt(v.x), Sqrt(v.y))
}
export function Sqrt3(v: Vec3): Vec3 {
    return new Vec3(Sqrt(v.x), Sqrt(v.y), Sqrt(v.z))
}
export function Sqrt4(v: Vec4): Vec4 {
    return new Vec4(Sqrt(v.x), Sqrt(v.y), Sqrt(v.z), Sqrt(v.w))
}
//Returns the cube root of the given value, properly handling negative values unlike Pow(v,1/3)
export function Cbrt(value: number): number {
    return value < 0 ? -Pow(-value, 1 / 3) : Pow(value, 1 / 3);
}
// Returns value raised to the power of exponent
export function Pow(value: number, exponent: number): number {
    return Math.pow(value, exponent)
}
//Returns e to the power of the given value
export function Exp(power: number): number {
    return Math.exp(power);
}
//Returns the logarithm of a value, with the given base
export function Log(value: number): number {
    return Math.log(value);
}
//Returns the base 10 logarithm of the given value
export function Log10(value: number): number {
    return Math.log10(value);
}
// Returns the binomial coefficient n over k
export function BionomialCoef(n: number, k: number) {
    let r = 1
    if (k > n) 0
    for (let d = 1; d <= k; d++) {
        r *= n--;
        r /= d
    }
    return r
    // mathematically clean but extremely prone to overflow
    //return Factorial( n ) / ( Factorial( k ) * Factorial( n - k ) );
}
/**
 *
 * @param value A value between 0 and 12 (integers can't store the factorial of 13 or above)
 * @returns Returns the Factorial of a given value from 0 to 12
 */
export function Factorial(value: number) {
    if (value <= 12)
        return factorialInt[value];
    if (value <= 20)
        throw new Error("The Factorial of {value} is too big for integer representation, please use {nameof(FactorialLong)} instead");
    throw new Error("The Factorial of {value} is too big for integer representation");
}
/**
 *
 * @param value A value between 0 and 20 (neither long nor ulong can store values large enough for the factorial of 21)
 * @returns Returns the Factorial of a given value from 0 to 20
 */
export function FactorialLong(value: number) {
    if (value <= 20)
        return factorialLong[value];
    throw new Error("The Factorial of {value} is too big for integer representation, even unsigned longs, soooo, rip");
}

const factorialLong = [
    /*0*/ 1,
    /*1*/ 1,
    /*2*/ 2,
    /*3*/ 6,
    /*4*/ 24,
    /*5*/ 120,
    /*6*/ 720,
    /*7*/ 5040,
    /*8*/ 40320,
    /*9*/ 362880,
    /*10*/ 3628800,
    /*11*/ 39916800,
    /*12*/ 479001600,
    /*13*/ 6227020800,
    /*14*/ 87178291200,
    /*15*/ 1307674368000,
    /*16*/ 20922789888000,
    /*17*/ 355687428096000,
    /*18*/ 6402373705728000,
    // /*19*/ 121645100408832000,
    // /*20*/ 2432902008176640000
];
const factorialInt = [
    /*0*/ 1,
    /*1*/ 1,
    /*2*/ 2,
    /*3*/ 6,
    /*4*/ 24,
    /*5*/ 120,
    /*6*/ 720,
    /*7*/ 5040,
    /*8*/ 40320,
    /*9*/ 362880,
    /*10*/ 3628800,
    /*11*/ 39916800,
    /*12*/ 479001600
];

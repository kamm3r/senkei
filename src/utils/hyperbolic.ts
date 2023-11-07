//Returns the hyperbolic cosine of the given hyperbolic angle
export function Cosh(x: number): number {
    return Math.cosh(x);
}
//Returns the hyperbolic sine of the given hyperbolic angle
export function Sinh(x: number): number {
    return Math.sinh(x);
}
//Returns the hyperbolic tangent of the given hyperbolic angle
export function Tanh(x: number): number {
    return Math.tanh(x);
}
//Returns the hyperbolic arc cosine of the given value
export function Acosh(x: number): number {
    return Math.log(x + Math.sqrt(x * x - 1));
}
//Returns the hyperbolic arc sine of the given value
export function Asinh(x: number): number {
    return Math.log(x + Math.sqrt(x * x + 1));
}
//Returns the hyperbolic arc tangent of the given value
export function Atanh(x: number): number {
    return (0.5 * Math.log((1 + x) / (1 - x)));
}

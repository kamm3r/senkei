//Returns the hyperbolic cosine of the given hyperbolic angle
export const Cosh = (x: number): number => Math.cosh(x);
//Returns the hyperbolic sine of the given hyperbolic angle
export const Sinh = (x: number): number => Math.sinh(x);
//Returns the hyperbolic tangent of the given hyperbolic angle
export const Tanh = (x: number): number => Math.tanh(x);
//Returns the hyperbolic arc cosine of the given value
export const Acosh = (x: number): number => Math.log(x + Math.sqrt(x * x - 1));
//Returns the hyperbolic arc sine of the given value
export const Asinh = (x: number): number => Math.log(x + Math.sqrt(x * x + 1));
//Returns the hyperbolic arc tangent of the given value
export const Atanh = (x: number): number => (0.5 * Math.log((1 + x) / (1 - x)));
import { clamp01 } from "./clamp";
import { smooth01 } from "./smoothingEasing";

export const Lerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;;
export const lerpClamped = (a: number, b: number, t: number): number => Lerp(a, b, clamp01(t));
export const lerpSmooth = (a: number, b: number, t: number): number => Lerp(a, b, smooth01(t));
export const inverseLerp = (a: number, b: number, value: number): number => (value - a) / (b - a);
export const inverseLerpSafe = (a: number, b: number, value: number): number => {
    const den = b - a
    if (den === 0) 0
    return (value - a) / den
};
export const inverseLerpClamped = (a: number, b: number, value: number): number => clamp01((value - a) / (b - a));
export const inverseLerpSmooth = (a: number, b: number, value: number): number => smooth01(clamp01((value - a) / (b - a)))

// export const Eerp = (a: number, b: number, t: number): number => (1 - t) * a + t * b;
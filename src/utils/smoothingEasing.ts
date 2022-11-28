import { PI } from "./constants"

//Applies cubic smoothing to the 0-1 interval, also known as the smoothstep function. Similar to an EaseInOut operation
export const smooth01 = (x: number): number => x * x * (3 - 2 * x)
//Applies quintic smoothing to the 0-1 interval, also known as the smootherstep function. Similar to an EaseInOut operation
export const smoother01 = (x: number): number => x * x * x * (x * (x * 6 - 15) + 10)
//Applies trigonometric smoothing to the 0-1 interval. Similar to an EaseInOut operation
export const smoothCos01 = (x: number): number => Math.cos(x * PI) * -0.5 + 0.5
//Applies a gamma curve or something idk I've never used this function before but it was part of Unity's original Mathfs.cs and it's undocumented
export const gamma = (value: number, absmax: number, gamma: number): number => {
    const negative = value < 0
    const absval = Math.abs(value)
    if (absval > absmax) {
        return negative ? -absval : absval
    }
    const result = Math.pow(absval / absmax, gamma) * absmax
    return negative ? -result : result
}

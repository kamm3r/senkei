import { Abs } from "./abs"
import { kEpsilon } from "./floatingPoints"
//TODO:Remve floor,ceil and round funcs because they are already built in
export function Sign(value: number): number{
    return value >= 0 ? 1 : -1
}
export function SignWithZero(value: number, zeroThreshold = kEpsilon): number{
    return Abs(value) < zeroThreshold ? 0 : Sign(value)
}
export function Floor(value: number): number{
    return Math.floor(value)
}
export function Ceil(value: number): number{
    return Math.ceil(value)
}
export function Round(value: number): number{
    return Math.round(value)
}

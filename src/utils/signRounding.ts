import { Abs } from "./abs"
import { kEpsilon } from "./floatingPoints"

export const Sign = (value: number): number => value >= 0 ? 1 : -1
export const SignWithZero = (value: number, zeroThreshold = kEpsilon): number => Abs(value) < zeroThreshold ? 0 : Sign(value)
export const Floor = (value: number): number => Math.floor(value)
export const Ceil = (value: number): number => Math.ceil(value)
export const Round = (value: number): number => Math.round(value)
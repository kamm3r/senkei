import { EPSILON } from "./constants"
import { MemoryPool } from "./pool"

export interface Vector {
    x: number
    y: number
    z: number
}
interface Vec {
    dim: Uint32Array
    elements: number
}

// const VEC_UNDEFINED: Vec = {0, null} // undefined vector (no dimension)
let ret: Vec
const allocated = (dim: Uint32Array): Vec => {
    const dimmed = (ret.dim = dim)
    const _malloc = new MemoryPool(dimmed)
    ret.elements = _malloc.allocate()
    return ret
}
export const allocate = (dim: Uint32Array): Vec => {
    ret.dim = dim
    ret.elements
    return ret
}
export const free = (v: Vector): void => { }
export const constructDefaultVector = (dim: number, val: number): Vector => {
    return { x: 0, y: 0, z: 0 }
}
export const constructEmptyVector = (dim: number): Vector => {
    return { x: 0, y: 0, z: 0 }
}
// export const newVector = (dim: number, _): Vector => {
//     return { x: 0, y: 0, z: 0 }
// }
export const newVector = (): Vector => {
    return { x: 0, y: 0, z: 0 }
}
export const copy = (v: Vector): Vector => {
    return { x: v.x, y: v.y, z: v.z }
}
export const printVec = (v: Vector): void => {
    console.log(`"vec3( ${v.x},${v.y},${v.z});`)
}
export const equals = (v1: Vector, v2: Vector): boolean => {
    return (Math.abs(v1.x - v2.x) <=
        EPSILON * Math.max(1.0, Math.abs(v1.x), Math.abs(v2.x)) &&
        Math.abs(v1.y - v2.y) <=
        EPSILON * Math.max(1.0, Math.abs(v1.y), Math.abs(v2.y)) &&
        Math.abs(v1.z - v2.z) <=
        EPSILON * Math.max(1.0, Math.abs(v1.z), Math.abs(v2.z))
    );
}
export const scalarAddition = (v: Vector, k: number): Vector => { }
export const scalarAdditionTo = (v: Vector, k: number): void => { }
export const scalarSubtraction = (v: Vector, k: number): Vector => { }
export const scalarSubtractionFrom = (v: Vector, k: number): void => { }
export const scalarMultiplication = (v: Vector, k: number): Vector => { }
export const scalarMultiplicationBy = (v: Vector, k: number): void => { }
export const scalarDivision = (v: Vector, k: number): Vector => { }
export const scalarDivisionBy = (v: Vector, k: number): void => { }
export const power = (v: Vector, k: number): Vector => { }
export const powerOf = (v: Vector, k: number): void => { }
export const add = (v1: Vector, v2: Vector): Vector => {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }
}
export const addTo = (v1: Vector, v2: Vector): void => { }
export const subtract = (v1: Vector, v2: Vector): Vector => {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }
}
export const subtractFrom = (v1: Vector, v2: Vector): void => { }
export const multiply = (v1: Vector, v2: Vector): Vector => {
    return { x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z }
}
export const multiplyBy = (v1: Vector, v2: Vector): void => { }
export const divide = (v1: Vector, v2: Vector): Vector => {
    return { x: v1.x / v2.x, y: v1.y / v2.y, z: v1.z / v2.z }
}
export const divideBy = (v1: Vector, v2: Vector): void => { }
export const dot = (v1: Vector, v2: Vector): number => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}
export const orthogonal = (v1: Vector, v2: Vector): boolean => {
    return false
}
export const cross = (v1: Vector, v2: Vector): Vector => {
    return { x: (v1.y * v2.z) - (v1.z * v2.y), y: (v1.x * v2.z) - (v1.z * v2.x), z: (v1.x * v2.y) - (v1.y * v2.x) }
}
export const wedge = (v1: Vector, v2: Vector): Vector => {
    return v1
}
export const magnitude = (v: Vector): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
export const magnitudeSqrt = (v: Vector): number => {
    return v.x * v.x + v.y * v.y + v.z * v.z
}
// export const magnitudeSqrt = (v: Vector): number => {
//     return dot(v, v)
// }
export const normalized = (v: Vector): Vector => {
    let len = magnitudeSqrt(v)
    if (len > 0) len = 1 / Math.sqrt(len)

    return { x: v.x * len, y: v.y * len, z: v.z * len }
}
export const normalize = (v: Vector): void => {

}
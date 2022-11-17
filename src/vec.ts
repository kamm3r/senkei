export interface Vector {
    x: number,
    y: number,
    z: number,
    w?: number
}
interface Vec {
    dim: Uint32Array
    * elements: number
}

// const VEC_UNDEFINED: Vec = {0, null} // undefined vector (no dimension)
let ret: Vec
const allocated = (dim: Uint32Array): Vec => {
    ret.dim = dim
    ret.elements = malloc(dim * sizeof(float))
    return ret
}
export const allocate = (dim: number): Vector => {
    let ret: Vector
    ret = dim
    ret.elements
    return ret
}
export const free = (v: Vector): void => { }
export const constructDefaultVector = (dim: number, val: number): Vector => { }
export const constructEmptyVector = (dim: number): Vector => { }
export const newVector = (dim: number, _): Vector => { }
export const copy = (v: Vector): Vector => { }
export const printVec = (v: Vector): void => { }
export const equals = (v1: Vector, v2: Vector): boolean => { }
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
export const add = (v: Vector, k: number): Vector => { }
export const addTo = (v: Vector, k: number): void => { }
export const subtract = (v: Vector, k: number): Vector => { }
export const subtractFrom = (v: Vector, k: number): void => { }
export const multiply = (v: Vector, k: number): Vector => { }
export const multiplyBy = (v: Vector, k: number): void => { }
export const divide = (v: Vector, k: number): Vector => { }
export const divideBy = (v: Vector, k: number): void => { }
export const dot = (v1: Vector, v2: Vector): number => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}
export const orthogonal = (v1: Vector, v2: Vector): boolean => { }
export const cross = (v1: Vector, v2: Vector): Vector => {
    const val0 = (v1.y * v2.z) - (v1.z * v2.y)
    const val1 = (v1.x * v2.z) - (v1.z * v2.x)
    const val2 = (v1.x * v2.y) - (v1.y * v2.x)
    return { x: val0, y: val1, z: val2 }
}
export const magnitude = (v: Vector): number => {
    let x = v.x
    let y = v.y
    let z = v.z
    return Math.sqrt(x * x + y * y + z * z)
}
export const magnitudeSqrt = (v: Vector): number => {
    let x = v.x
    let y = v.y
    let z = v.z
    return x * x + y * y + z * z
}
export const normalized = (v: Vector): Vector => { }
export const normalize = (v: Vector): void => { }
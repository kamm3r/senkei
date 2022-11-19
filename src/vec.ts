import { EPSILON } from "./constants"

export interface Vec3 {
    x: number
    y: number
    z: number
}
// interface Vec {
//     dim: Uint32Array
//     elements: number
// }

// const VEC_UNDEFINED: Vec = {0, null} // undefined Vec3 (no dimension)
// let ret: Vec
// export const allocate = (dim: Uint32Array): Vec => {
//     ret.dim = dim
//     ret.elements
//     return ret
// }
// export const free = (v: Vec3): void => { }
// export const constructDefaultVector = (dim: number, val: number): Vec3 => {
//     return { x: 0, y: 0, z: 0 }
// }
// export const constructEmptyVector = (dim: number): Vec3 => {
//     return { x: 0, y: 0, z: 0 }
// }
// export const newVector = (dim: number, _): Vec3 => {
//     return { x: 0, y: 0, z: 0 }
// }
export const newVector = (v?: Vec3): Vec3 => {
    if (v === undefined) {
        return { x: 0, y: 0, z: 0 }
    }
    return { x: v.x, y: v.y, z: v.z }
}
export const copy = (v: Vec3): Vec3 => {
    return { x: v.x, y: v.y, z: v.z }
}
export const printVec = (v: Vec3): void => {
    console.log(`"vec3( ${v.x},${v.y},${v.z});`)
}
export const equals = (v1: Vec3, v2: Vec3): boolean => {
    return (Math.abs(v1.x - v2.x) <=
        EPSILON * Math.max(1.0, Math.abs(v1.x), Math.abs(v2.x)) &&
        Math.abs(v1.y - v2.y) <=
        EPSILON * Math.max(1.0, Math.abs(v1.y), Math.abs(v2.y)) &&
        Math.abs(v1.z - v2.z) <=
        EPSILON * Math.max(1.0, Math.abs(v1.z), Math.abs(v2.z))
    );
}
export const scalarAddition = (v: Vec3, k: number): Vec3 => {
    return { x: v.x + k, y: v.y + k, z: v.z + k }
}
// export const scalarAdditionTo = (v: Vec3, k: number): void => { }
export const scalarSubtraction = (v: Vec3, k: number): Vec3 => {
    return { x: v.x - k, y: v.y - k, z: v.z - k }
}
// export const scalarSubtractionFrom = (v: Vec3, k: number): void => { }
export const scalarMultiplication = (v: Vec3, k: number): Vec3 => {
    return { x: v.x * k, y: v.y * k, z: v.z * k }
}
// export const scalarMultiplicationBy = (v: Vec3, k: number): void => { }
export const scalarDivision = (v: Vec3, k: number): Vec3 => {
    return { x: v.x / k, y: v.y / k, z: v.z / k }
}
// export const scalarDivisionBy = (v: Vec3, k: number): void => { }
// export const power = (v: Vec3, k: number): Vec3 => { }
// export const powerOf = (v: Vec3, k: number): void => { }
export const add = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z }
}
// export const addTo = (v1: Vec3, v2: Vec3): void => {
//     x: v1.x + v2.x
//     y: v1.y + v2.y
//     z: v1.z + v2.z
// }
export const subtract = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z }
}
// export const subtractFrom = (v1: Vec3, v2: Vec3): void => {
//     x: v1.x - v2.x
//     y: v1.y - v2.y
//     z: v1.z - v2.z
// }
export const multiply = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z }
}
// export const multiplyBy = (v1: Vec3, v2: Vec3): void => {
//     x: v1.x * v2.x
//     y: v1.y * v2.y
//     z: v1.z * v2.z
// }
export const divide = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: v1.x / v2.x, y: v1.y / v2.y, z: v1.z / v2.z }
}
// export const divideBy = (v1: Vec3, v2: Vec3): void => {
//     x: v1.x / v2.x
//     y: v1.y / v2.y
//     z: v1.z / v2.z
// }
export const dot = (v1: Vec3, v2: Vec3): number => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
}
// export const orthogonal = (v1: Vec3, v2: Vec3): boolean => {
//     return false
// }
export const cross = (v1: Vec3, v2: Vec3): Vec3 => {
    return { x: (v1.y * v2.z) - (v1.z * v2.y), y: (v1.x * v2.z) - (v1.z * v2.x), z: (v1.x * v2.y) - (v1.y * v2.x) }
}
// export const wedge = (v1: Vec3, v2: Vec3): Vec3 => {
//     return v1
// }
export const magnitude = (v: Vec3): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
export const magnitudeSqrt = (v: Vec3): number => {
    return v.x * v.x + v.y * v.y + v.z * v.z
}
// export const magnitudeSqrt = (v: Vec3): number => {
//     return dot(v, v)
// }
export const normalized = (v: Vec3): Vec3 => {
    let len = magnitudeSqrt(v)
    if (len > 0) len = 1 / Math.sqrt(len)

    return { x: v.x * len, y: v.y * len, z: v.z * len }
}
// export const normalize = (v: Vec3): void => {

// }
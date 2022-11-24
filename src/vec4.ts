export interface Vec4 {
    x: number
    y: number
    z: number
    w: number
}

// export const create = (x?: number, y?: number, z?: number, w?: number): Vec4 => {
// if (x === undefined || y === undefined || z === undefined || w === undefined) {
//     return { x: 0, y: 0, z: 0, w: 0 }
// }
//  return { x, y, z, w }
// }
export const create = (x = 0, y = 0, z = 0, w = 0): Vec4 => {
    return { x, y, z, w }
}
export const one = (): Vec4 => ({ x: 1, y: 1, z: 1, w: 1 })
export const zero = (): Vec4 => ({ x: 0, y: 0, z: 0, w: 0 })

export const scalarAddition = (v: Vec4, k: number): Vec4 => {
    return { x: v.x + k, y: v.y + k, z: v.z + k, w: v.w + k }
}
export const scalarSubtraction = (v: Vec4, k: number): Vec4 => {
    return { x: v.x - k, y: v.y - k, z: v.z - k, w: v.w - k }
}
export const scalarMultiplication = (v: Vec4, k: number): Vec4 => {
    return { x: v.x * k, y: v.y * k, z: v.z * k, w: v.w * k }
}
export const scalarDivision = (v: Vec4, k: number): Vec4 => {
    return { x: v.x / k, y: v.y / k, z: v.z / k, w: v.w / k }
}
export const add = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z, w: v1.w + v2.w }
}
export const subtract = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z, w: v1.w - v2.w }
}
export const multiply = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x * v2.x, y: v1.y * v2.y, z: v1.z * v2.z, w: v1.w * v2.w }
}
export const divide = (v1: Vec4, v2: Vec4): Vec4 => {
    return { x: v1.x / v2.x, y: v1.y / v2.y, z: v1.z / v2.z, w: v1.w / v2.w }
}
export const dot = (v1: Vec4, v2: Vec4): number => {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w
}

export const magnitude = (v: Vec4): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
export const magnitudeSqrt = (v: Vec4): number => {
    return v.x * v.x + v.y * v.y + v.z * v.z
}

export const normalized = (v: Vec4): Vec4 => {
    const vLen = magnitude(v)
    return { x: v.x / vLen, y: v.y / vLen, z: v.z / vLen, w: v.w / vLen }
}
export const normalize = (v: Vec4): Vec4 => {
    return { x: v.x / Math.abs(v.x), y: v.y / Math.abs(v.y), z: v.z / Math.abs(v.z), w: v.w / Math.abs(v.w) }
}
export const distance = (v1: Vec4, v2: Vec4): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: Vec4, v2: Vec4): number => {
    const x = (v2.x - v1.x)
    const y = (v2.y - v1.y)
    const z = (v2.z - v1.z)
    const w = (v2.w - v1.w)
    return x * x + y * y + z * z + w * w
}
export const lerp = () => { }
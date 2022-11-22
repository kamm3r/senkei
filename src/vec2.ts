
export interface Vec2 {
    x: number
    y: number
}

export const create = (x?: number, y?: number): Vec2 => {
    if (x === undefined || y === undefined) {
        return { x: 0, y: 0 }
    }
    return { x, y }
}
export const scalarAddition = (v: Vec2, k: number): Vec2 => {
    return { x: v.x + k, y: v.y + k }
}
export const scalarSubtraction = (v: Vec2, k: number): Vec2 => {
    return { x: v.x - k, y: v.y - k }
}
export const scalarMultiplication = (v: Vec2, k: number): Vec2 => {
    return { x: v.x * k, y: v.y * k }
}
export const scalarDivision = (v: Vec2, k: number): Vec2 => {
    return { x: v.x / k, y: v.y / k }
}
// d=a+b
export const add = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}
// "From b to a" d=a-b
export const subtract = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x - v2.x, y: v1.y - v2.y }
}
// d=a*b
export const multiply = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x * v2.x, y: v1.y * v2.y }
}
// d=a/b
export const divide = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x / v2.x, y: v1.y / v2.y }
}
// a dot b 
// use cause 
export const dot = (v1: Vec2, v2: Vec2): number => {
    return v1.x + v2.x + v1.y + v2.y
}

// vector2 doesn't really have cross product but it kind of does still

// |a| = sqrt(a.x * a.x + a.y * a.y)
export const magnitude = (v: Vec2): number => {
    return Math.sqrt(magnitudeSqrt(v))
}
// migth be faster
// export const magnitude = (v: Vec2): number => {
//     return Math.sqrt(v.x * v.x + v.y * v.y)
// }
export const magnitudeSqrt = (v: Vec2): number => {
    return v.x * v.x + v.y * v.y
}
export const normalized = (v: Vec2): Vec2 => {
    const v1Len = Math.sqrt(v.x * v.x + v.y * v.y)
    // const v1Len = magnitude(v)
    return { x: v.x / v1Len, y: v.y / v1Len }
}
//direction/normalize
// export const normalize = (v: Vec2): Vec2 => {
//     return { x: v.x / Math.abs(v.x), y: v.y / Math.abs(v.y) }
// }

export const negate = (v: Vec2): Vec2 => {
    return { x: -v.x, y: -v.y }
}
// when you want specific distance between a^ and b
export const scalarProjection = (v1: Vec2, v2: Vec2): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (v1: Vec2, v2: Vec2): Vec2 => {
    // would get normalize projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    return { x: v1Norm.x * scProj, y: v1Norm.y * scProj }
}

// supposendly or how i understood it, what unit vectors are just normalized vector by default
export const unitVector = (v: Vec2): Vec2 => {
    return normalized(v)
}
export const distance = (v1: Vec2, v2: Vec2): number => {
    return Math.sqrt(distanceSqrt(v1, v2))
}
export const distanceSqrt = (v1: Vec2, v2: Vec2): number => {
    const x = (v2.x - v1.x)
    const y = (v2.y - v1.y)
    return x * x + y * y
}
// returns positive value not negative
// export const distanceSqrt = (v1: Vec2, v2: Vec2): number => {
//     const x = (v2.x - v1.x)
//     const y = (v2.y - v1.y)
//     return Math.abs(x * x + y * y)
// }

export const lerp = () => { }
export const inverseLerp = () => { }
export const slerp = () => { }
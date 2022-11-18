
export interface Vec2 {
    x: number
    y: number
}

export const vec2 = (): Vec2 => {
    return { x: 0, y: 0 }
}

export const add = (v1: Vec2, v2: Vec2): Vec2 => {
    return { x: v1.x + v2.x, y: v1.y + v2.y }
}

export const dot = (v1: Vec2, v2: Vec2): number => {
    return v1.x + v2.x + v1.y + v2.y
}



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
export const normalized = (v1: Vec2): Vec2 => {
    const v1Len = magnitude(v1)
    return { x: v1.x / v1Len, y: v1.y / v1Len }
}


export const negate = (v1: Vec2): Vec2 => {
    return { x: -v1.x, y: -v1.y }
}

export const scalarProjection = (v1: Vec2, v2: Vec2): number => {
    const v1Norm = normalized(v1)
    return dot(v1Norm, v2)
}
export const VectorProjection = (v1: Vec2, v2: Vec2): Vec2 => {
    // would get normalized projection point?
    const v1Norm = normalized(v1)
    const scProj = scalarProjection(v1, v2)
    return { x: v1Norm.x * scProj, y: v1.y * scProj }
}
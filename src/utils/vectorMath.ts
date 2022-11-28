import { magnitude, Vec2 } from "../vec2";
//The determinant is equivalent to the dot product, but with one vector rotated 90 degrees.
// Note that det(a,b) != det(b,a). It's equivalent to a.x * b.y - a.y * b.x.
// It is also known as the 2D Cross Product, Wedge Product, Outer Product and Perpendicular Dot Product
// 2D "cross product"
export const determinant = (a: Vec2, b: Vec2): number => a.x * b.y - a.y * b.x

export const getDirAndMag = (v: Vec2): { dir: Vec2, magnitude: number } => {
    const mag = magnitude(v)
    return {
        dir: { x: v.x / mag, y: v.y / mag },
        magnitude: mag
    }
}

export const ClampMagnitude = (v: Vec2, min: number, max: number): Vec2 => {
    const mag = magnitude(v);
    return { x: mag < min ? (v.x / mag) * min : mag > max ? (v.x / mag) * max : v.x, y: mag < min ? (v.y / mag) * min : mag > max ? (v.y / mag) * max : v.y };
}
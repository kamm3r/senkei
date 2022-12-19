import { mat3 } from "./types"
//     x   y   z
// x |m00 m01 m02|
// y |m10 m11 m12|
// z |m20 m21 m22|
// Matrix 3x3

export const create = (m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): mat3 => new Float32Array([m00, m01, m02, m10, m11, m12, m20, m21, m22])


export const Identity = (): mat3 => create(1, 0, 0, 0, 1, 0, 0, 0, 1)
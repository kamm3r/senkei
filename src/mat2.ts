import type { mat2, quat, vec2 } from "./types"

type f32 = Float32Array

export const create = (m00: number, m01: number, m10: number, m11: number): mat2 => new Float32Array([m00, m01, m10, m11])

export const identity = (mat: mat2): mat2 => create(1, 0, 0, 1)
export const zero = (mat: mat2): mat2 => create(0, 0, 0, 0)

export const multiply = (a: mat2, b: mat2): mat2 => create(a[0] * b[0] + a[2] * b[1], a[1] * b[0] + a[3] * b[1], a[0] * b[2] + a[2] * b[3], a[1] * b[2] + a[3] * b[3])

export const determinant = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const decomposeProjection = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const inverse = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const rotation = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]

// export const Rotate = (q: quat): mat2 => create()
export const Scale = (a: mat2, v: vec2): mat2 => create(a[0] * v[0], a[1] * v[0], a[2] * v[1], a[3] * v[1])

export const from_diagonal = (diagonal: mat2): mat2 => {
    return new Float32Array([diagonal[0], 0, 0, diagonal[3]])

}
export const TransformVector = () => { }

export const getRows = (a: mat2, row: number) => {
    if (row === 1) {
        return [a[0], a[1]]
    }
    if (row === 2) {
        return [a[2], a[3]]
    }
    throw new Error('NOT FOUND')
}
export const getCols = (a: mat2, col: number) => {
    if (col === 1) {
        return [a[0], a[2]]
    }
    if (col === 2) {
        return [a[1], a[3]]
    }
    throw new Error('NOT FOUND')
}

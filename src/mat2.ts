import type { mat2, vec2 } from "./types"
import * as Vec2 from "./vec2"


export const create = (m00: number, m01: number, m10: number, m11: number): mat2 => new Float32Array([m00, m01, m10, m11])

export const identity = (): mat2 => create(1, 0, 0, 1)
export const zero = (): mat2 => create(0, 0, 0, 0)

export const scalarAddition = (v: mat2, k: number): mat2 => create(v[0] + k, v[1] + k, v[2] + k, v[3] + k)
export const scalarSubtraction = (v: mat2, k: number): mat2 => create(v[0] - k, v[1] - k, v[2] - k, v[3] - k)
export const scalarMultiplication = (v: mat2, k: number): mat2 => create(v[0] * k, v[1] * k, v[2] * k, v[3] * k)
export const scalarDivision = (v: mat2, k: number): mat2 => create(v[0] / k, v[1] / k, v[2] / k, v[3] / k)
export const multiply = (a: mat2, b: mat2): mat2 => create(a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3])
export const multiplyByVec2 = (mat: mat2, vec: vec2): vec2 => Vec2.create(mat[0] * vec[0] + mat[1] * vec[1], mat[2] * vec[0] + mat[3] * vec[1])

export const Determinant = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const DecomposeProjection = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const Inverse = (mat: mat2): number => Determinant(mat)
export const Rotation = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const LocalToWorld = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const WorldToLocal = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]
export const ProjectionMatrix = (mat: mat2): number => mat[0] * mat[3] - mat[2] * mat[1]

// export const Rotate = (q: quat): mat2 => create()
export const Scale = (a: mat2, v: vec2): mat2 => create(a[0] * v[0], a[1] * v[0], a[2] * v[1], a[3] * v[1])

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

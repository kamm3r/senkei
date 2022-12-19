import { mat4 } from "./types"


export const create = (m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): mat4 => {
    return new Float32Array([
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33
    ])
}
export const Identity = (): mat4 => create(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0)


// Compute matrix determinant
export const Determinant = (mat: mat4): number => {
    let a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3]
    let a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7]
    let a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11]
    let a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15]

    return a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
        a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
        a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
        a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
        a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
        a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33;
}

// Get the trace of the matrix (sum of the values along the diagonal)
export const Trace = (mat: mat4): number => mat[0] + mat[5] + mat[10] + mat[15]
// Transposes provided matrix
export const Transpose = (mat: mat4): mat4 => create(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5], mat[6], mat[7], mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15])

export const Invert = (mat: mat4): mat4 => {
    let a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3]
    let a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7]
    let a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11]
    let a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15]

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;
    const invDet = 1.0 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

    return create((a11 * b11 - a12 * b10 + a13 * b09) * invDet, (-a01 * b11 + a02 * b10 - a03 * b09) * invDet, (a31 * b05 - a32 * b04 + a33 * b03) * invDet, (-a21 * b05 + a22 * b04 - a23 * b03) * invDet, (-a10 * b11 + a12 * b08 - a13 * b07) * invDet, (a00 * b11 - a02 * b08 + a03 * b07) * invDet, (-a30 * b05 + a32 * b02 - a33 * b01) * invDet, (a20 * b05 - a22 * b02 + a23 * b01) * invDet, (a10 * b10 - a11 * b08 + a13 * b06) * invDet, (-a00 * b10 + a01 * b08 - a03 * b06) * invDet, (a30 * b04 - a31 * b02 + a33 * b00) * invDet, (-a20 * b04 + a21 * b02 - a23 * b00) * invDet, (-a10 * b09 + a11 * b07 - a12 * b06) * invDet, (a00 * b09 - a01 * b07 + a02 * b06) * invDet, (-a30 * b03 + a31 * b01 - a32 * b00) * invDet, (a20 * b03 - a21 * b01 + a22 * b00) * invDet)
}
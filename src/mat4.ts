type mat4 = Float32Array

export const create = (m00: number, m01: number, m02: number, m03: number, m10: number, m11: number, m12: number, m13: number, m20: number, m21: number, m22: number, m23: number, m30: number, m31: number, m32: number, m33: number): mat4 => {
    // export const create = (m00: number,m01: number,m02: number,m10: number,m11: number,m12: number,m30: number,m31: number,m32: number): mat3 => {
    return new Float32Array([
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33
    ])
}
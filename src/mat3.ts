//     x   y   z
// x |m00 m01 m02|
// y |m10 m11 m12|
// z |m20 m21 m22|
// Matrix 3x3

// export class matrix {
//     private element: number
//     private matrix: Float32Array
//     private number: number
//     private position: Position
//     private size: Size
//     constructor() { }
//     // set values() { }
//     at() { }
//     reset() { }
//     addAColumn() { }
//     addARow() { }
//     equals() { }
//     setAsIdentity() { }
//     static identity() { }
//     multiply() { }
//     determinant() { }
//     getCofactor() { }
//     transpose() { }
//     inverse() { }
// }

type mat3 = Float32Array

export const create = (m00: number, m01: number, m02: number, m10: number, m11: number, m12: number, m20: number, m21: number, m22: number): mat3 => {
    // export const create = (m00: number,m01: number,m02: number,m10: number,m11: number,m12: number,m30: number,m31: number,m32: number): mat3 => {
    return new Float32Array([m00, m01, m02, m10, m11, m12, m20, m21, m22])
}

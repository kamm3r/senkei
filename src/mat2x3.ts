//     x   y   z
// x |m00 m01 m02|
// y |m10 m11 m12| 
// Matrix 2x3
//     x   y             
// x |m00 m01|   
// y |m10 m11|  
// z |m20 m21|         
// Matrix 3x2

const float32 = new Float32Array(6)

type mat2x3 = typeof float32


export const create = (m00: number, m01: number, m02: number, m10: number, m11: number, m12: number): mat2x3 => {
    return new Float32Array([m00, m01, m02, m10, m11, m12])
}
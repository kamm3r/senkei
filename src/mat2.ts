export interface Mat2 {
    m00: number
    m01: number
    m10: number
    m11: number
}

type f32 = Float32Array

const float32 = new Float32Array(4)

type mat2 = typeof float32

// export const create = (m00: number, m01: number, m10: number, m11: number): Mat2 => {
export const create = (m00: number, m01: number, m10: number, m11: number): f32 => {
    return new Float32Array([m00, m01, m10, m11])
}

export const from_diagonal = (diagonal: mat2): mat2 => {
    return new Float32Array([diagonal[0], 0, 0, diagonal[3]])

}

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

class Mat2s extends Float32Array {
    // m00: number
    // m01: number
    // m10: number
    // m11: number
    static ZERO = new Mat2s(0, 0, 0, 0)
    static IDENTITY = new Mat2s(1, 0, 0, 1)
    static NAN = new Mat2s(NaN, NaN, NaN, NaN)
    constructor(m00 = 0, m01 = 0, m10 = 0, m11 = 0) {
        m00 | m01 | m10 | m11 ? super([m00, m01, m10, m11]) : super(4)
    }

    get row() {
        return this[this[0], this[1]]
    }

    //     x   y   
    // x |m00 m01 |
    // y |m10 m11 |
    // Matrix 2x2

    get col() {
        return this[this[0], this[2]]
    }

    from_cols(x_axis: number, y_axis: number) {
        return { x_axis, y_axis }
    }
    transpose(target = new Mat2s()) {
        const m = this
        const t = target
        let tmp: number

        t[0] = m[0]
        tmp = m[1]
        t[1] = m[3]
        t[3] = tmp
        tmp = m[2]

        return target
    }
    determinant() {
        return this[this[0]] * this[this[3]] - this[this[1]] * this[this[2]]
    }
    inverse() { }
}
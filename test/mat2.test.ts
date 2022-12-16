import { describe, expect, test } from 'vitest'
import { mat2, vec2 } from '../src'

describe('Mat2', () => {
    test('create, no values given default to [0,0,0,0]', () => {
        const mat = mat2.create(0, 0, 0, 0)
        expect(mat[0]).toBe(0)
        expect(mat[1]).toBe(0)
        expect(mat[2]).toBe(0)
        expect(mat[3]).toBe(0)
    })
    test('create, [1,0,1,0] values given', () => {
        const mat = mat2.create(1, 0, 1, 0)
        expect(mat[0]).toBe(1)
        expect(mat[1]).toBe(0)
        expect(mat[2]).toBe(1)
        expect(mat[3]).toBe(0)
    })
    test('Matrix-Matrix multiplication', () => {
        const mat0 = mat2.create(7, 5, 6, 3)
        const mat1 = mat2.create(2, 1, 5, 1)
        const mul = mat2.multiply(mat0, mat1)
        expect(mul[0]).toStrictEqual(39)
        expect(mul[1]).toStrictEqual(12)
        expect(mul[2]).toStrictEqual(27)
        expect(mul[3]).toStrictEqual(9)
    })
    test('Matrix-Vector multiplication', () => {
        const mat = mat2.create(7, 5, 6, 3)
        const vec = vec2.create(2, 1)
        const mul = mat2.multiplyByVec2(mat, vec)
        expect(mul[0]).toStrictEqual(19)
        expect(mul[1]).toStrictEqual(15)
    })
    test('get rows', () => {
        const mat = mat2.create(1, 2, 3, 4)
        const rows = mat2.getRows(mat, 1)
        expect(rows).toStrictEqual([1, 2])
    })
    test('get cols', () => {
        const mat = mat2.create(1, 2, 3, 4)
        const cols = mat2.getCols(mat, 1)
        expect(cols).toStrictEqual([1, 3])
    })
})
import { describe, expect, test } from 'vitest'
import * as mat2 from '../src/mat2'

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
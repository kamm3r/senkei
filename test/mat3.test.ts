import { describe, expect, test } from 'vitest'
import * as mat3 from '../src/mat3'

describe('Mat3', () => {
    test('create, no values given default to [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
        const mat = mat3.create(0, 0, 0, 0, 0, 0, 0, 0, 0)
        expect(mat[0]).toBe(0)
        expect(mat[1]).toBe(0)
        expect(mat[2]).toBe(0)

        expect(mat[3]).toBe(0)
        expect(mat[4]).toBe(0)
        expect(mat[5]).toBe(0)

        expect(mat[6]).toBe(0)
        expect(mat[7]).toBe(0)
        expect(mat[8]).toBe(0)
    })
    test('create, [0, 1, 0, 0, 0, 1, 0, 1, 0] values given', () => {
        const mat = mat3.create(0, 1, 0, 0, 0, 1, 0, 1, 0)
        expect(mat[0]).toBe(0)
        expect(mat[1]).toBe(1)
        expect(mat[2]).toBe(0)

        expect(mat[3]).toBe(0)
        expect(mat[4]).toBe(0)
        expect(mat[5]).toBe(1)

        expect(mat[6]).toBe(0)
        expect(mat[7]).toBe(1)
        expect(mat[8]).toBe(0)
    })
})
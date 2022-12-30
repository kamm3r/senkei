import { describe, expect, test } from 'vitest'
import { mat4 } from '../src'

describe('Mat4', () => {
    test('create, no values given default to [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
        const mat = mat4.create()
        expect(mat[0]).toBe(1)
        expect(mat[1]).toBe(0)
        expect(mat[2]).toBe(0)
        expect(mat[3]).toBe(0)

        expect(mat[4]).toBe(0)
        expect(mat[5]).toBe(1)
        expect(mat[6]).toBe(0)
        expect(mat[7]).toBe(0)

        expect(mat[8]).toBe(0)
        expect(mat[9]).toBe(0)
        expect(mat[10]).toBe(1)
        expect(mat[11]).toBe(0)

        expect(mat[12]).toBe(0)
        expect(mat[13]).toBe(0)
        expect(mat[14]).toBe(0)
        expect(mat[15]).toBe(1)
    })
    test('create, [0, 1, 0, 0, 0, 1, 0, 1, 0] values given', () => {
        const mat = mat4.create(
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 1, 0, 0,
            0, 0, 1, 0)
        expect(mat[0]).toBe(0)
        expect(mat[1]).toBe(1)
        expect(mat[2]).toBe(0)
        expect(mat[3]).toBe(0)

        expect(mat[4]).toBe(0)
        expect(mat[5]).toBe(0)
        expect(mat[6]).toBe(1)
        expect(mat[7]).toBe(0)

        expect(mat[8]).toBe(0)
        expect(mat[9]).toBe(1)
        expect(mat[10]).toBe(0)
        expect(mat[11]).toBe(0)

        expect(mat[12]).toBe(0)
        expect(mat[13]).toBe(0)
        expect(mat[14]).toBe(1)
        expect(mat[15]).toBe(0)
    })
})
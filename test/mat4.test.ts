import { describe, expect, test } from 'vitest'
import { Mat4 } from '../src/Mat4'
import { Vec4 } from '../src/Vec4'

function roundTo(value: number, decimal: number): number {
    return parseFloat(value.toFixed(decimal))
}

describe('Mat4', () => {
    test('new 4x4 matrix', () => {
        const mat = new Mat4(
            new Vec4(1, 0, 0, 0),
            new Vec4(0, 1, 0, 0),
            new Vec4(0, 0, 1, 0),
            new Vec4(0, 0, 0, 1)
        )
        expect(mat.m00).toBe(1)
        expect(mat.m10).toBe(0)
        expect(mat.m20).toBe(0)
        expect(mat.m30).toBe(0)

        expect(mat.m01).toBe(0)
        expect(mat.m11).toBe(1)
        expect(mat.m21).toBe(0)
        expect(mat.m31).toBe(0)

        expect(mat.m02).toBe(0)
        expect(mat.m12).toBe(0)
        expect(mat.m22).toBe(1)
        expect(mat.m32).toBe(0)

        expect(mat.m03).toBe(0)
        expect(mat.m13).toBe(0)
        expect(mat.m23).toBe(0)
        expect(mat.m33).toBe(1)
    })
    test('matrix multiplication', () => {
        const mat1 = new Mat4(
            new Vec4(1, 2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(9, 10, 11, 12),
            new Vec4(13, 14, 15, 16)
        )
        const mat2 = new Mat4(
            new Vec4(1, 2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(9, 10, 11, 12),
            new Vec4(13, 14, 15, 16)
        )
        const mat3 = Mat4.mult(mat1, mat2)
        expect(mat3.m00).toBe(90)
        expect(mat3.m10).toBe(100)
        expect(mat3.m20).toBe(110)
        expect(mat3.m30).toBe(120)
        expect(mat3.m01).toBe(202)
        expect(mat3.m11).toBe(228)
        expect(mat3.m21).toBe(254)
        expect(mat3.m31).toBe(280)
        expect(mat3.m02).toBe(314)
        expect(mat3.m12).toBe(356)
        expect(mat3.m22).toBe(398)
        expect(mat3.m32).toBe(440)
        expect(mat3.m03).toBe(426)
        expect(mat3.m13).toBe(484)
        expect(mat3.m23).toBe(542)
        expect(mat3.m33).toBe(600)
    })
    test('inverse of identity matrix', () => {
        const mat = Mat4.identity
        const inv = mat.inverse
        console.log(inv)
        expect(inv.m00).toBe(1)
        expect(inv.m10).toBe(0)
        expect(inv.m20).toBe(0)
        expect(inv.m30).toBe(0)
        expect(inv.m01).toBe(0)
        expect(inv.m11).toBe(1)
        expect(inv.m21).toBe(0)
        expect(inv.m31).toBe(0)
        expect(inv.m02).toBe(0)
        expect(inv.m12).toBe(0)
        expect(inv.m22).toBe(1)
        expect(inv.m32).toBe(0)
        expect(inv.m03).toBe(0)
        expect(inv.m13).toBe(0)
        expect(inv.m23).toBe(0)
        expect(inv.m33).toBe(1)
    })
    test('inverse of matrix [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]', () => {
        const mat = new Mat4(
            new Vec4(-1, -2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(-9, -10, 11, 12),
            new Vec4(13, 14, -15, 16)
        )
        const inv = mat.inverse
        console.log(inv)
        expect(roundTo(inv.m00, 4)).toBe(1.2277)
        expect(roundTo(inv.m10, 4)).toBe(-0.0714)
        expect(roundTo(inv.m20,4)).toBe(-0.3259)
        expect(roundTo(inv.m30,4)).toBe(-0.0268)
        expect(roundTo(inv.m01,4)).toBe(-1.0647)
        expect(roundTo(inv.m11, 4)).toBe(0.1429)
        expect(roundTo(inv.m21, 4)).toBe(0.2299)
        expect(roundTo(inv.m31,4)).toBe(0.0223)
        expect(roundTo(inv.m02,4)).toBe(0.0536)
        expect(roundTo(inv.m12,4)).toBe(0.0714)
        expect(roundTo(inv.m22,4)).toBe(-0.0179)
        expect(roundTo(inv.m32,4)).toBe(-0.0357)
        expect(roundTo(inv.m03,4)).toBe(-0.0156)
        expect(roundTo(inv.m13,4)).toBe(0)
        expect(roundTo(inv.m23, 4)).toBe(0.0469)
        expect(roundTo(inv.m33,4)).toBe(0.0313)
    })
})

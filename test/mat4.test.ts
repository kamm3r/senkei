import { describe, expect, test } from 'vitest'
import { Mat4 } from '../src/Mat4'
import { Vec4 } from '../src/Vec4'
import { Vec3 } from '../src/Vec3'
import { Quaternion } from '../src/Quat'

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
        const mat3 = Mat4.mults(mat1, mat2)
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
    test('transpose of matrix [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]', () => {
        const mat = new Mat4(
            new Vec4(1, 2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(9, 10, 11, 12),
            new Vec4(13, 14, 15, 16)
        )
        const trans = mat.transpose
        expect(trans.m00).toBe(1)
        expect(trans.m10).toBe(5)
        expect(trans.m20).toBe(9)
        expect(trans.m30).toBe(13)
        expect(trans.m01).toBe(2)
        expect(trans.m11).toBe(6)
        expect(trans.m21).toBe(10)
        expect(trans.m31).toBe(14)
        expect(trans.m02).toBe(3)
        expect(trans.m12).toBe(7)
        expect(trans.m22).toBe(11)
        expect(trans.m32).toBe(15)
        expect(trans.m03).toBe(4)
        expect(trans.m13).toBe(8)
        expect(trans.m23).toBe(12)
        expect(trans.m33).toBe(16)
    })
    test('translate', () => {
        const mat = Mat4.translate(new Vec3(20, 1, 5))
        expect(mat.m00).toBe(1)
        expect(mat.m10).toBe(0)
        expect(mat.m20).toBe(0)
        expect(mat.m30).toBe(20)
        expect(mat.m01).toBe(0)
        expect(mat.m11).toBe(1)
        expect(mat.m21).toBe(0)
        expect(mat.m31).toBe(1)
        expect(mat.m02).toBe(0)
        expect(mat.m12).toBe(0)
        expect(mat.m22).toBe(1)
        expect(mat.m32).toBe(5)
        expect(mat.m03).toBe(0)
        expect(mat.m13).toBe(0)
        expect(mat.m23).toBe(0)
        expect(mat.m33).toBe(1)
    })
    test('rotate', () => {
        const mat = Mat4.rotate(new Quaternion(0.7071, 0.7071, 0, 0))
       console.log("rotate");
        Mat4.print(mat)
        expect(roundTo(mat.m00, 0)).toBe(0.038)
        expect(roundTo(mat.m10, 0)).toBe(0.288)
        expect(roundTo(mat.m20, 0)).toBe(-0.957)
        expect(roundTo(mat.m30, 0)).toBe(0)
        expect(roundTo(mat.m01, 0)).toBe(0.093)
        expect(roundTo(mat.m11, 0)).toBe(0.952)
        expect(roundTo(mat.m21, 0)).toBe(0.290)
        expect(roundTo(mat.m31, 0)).toBe(0)
        expect(roundTo(mat.m02, 0)).toBe(0.995)
        expect(roundTo(mat.m12, 0)).toBe(-0.100)
        expect(roundTo(mat.m22, 0)).toBe(0.010)
        expect(roundTo(mat.m32, 0)).toBe(0)
        expect(roundTo(mat.m03, 0)).toBe(0)
        expect(roundTo(mat.m13, 0)).toBe(0)
        expect(roundTo(mat.m23, 0)).toBe(0)
        expect(roundTo(mat.m33, 0)).toBe(1)
    })
    test('scale', () => {
        const mat = Mat4.scale(new Vec3(2, 2, 2))
        expect(mat.m00).toBe(2)
        expect(mat.m10).toBe(0)
        expect(mat.m20).toBe(0)
        expect(mat.m30).toBe(0)
        expect(mat.m01).toBe(0)
        expect(mat.m11).toBe(2)
        expect(mat.m21).toBe(0)
        expect(mat.m31).toBe(0)
        expect(mat.m02).toBe(0)
        expect(mat.m12).toBe(0)
        expect(mat.m22).toBe(2)
        expect(mat.m32).toBe(0)
        expect(mat.m03).toBe(0)
        expect(mat.m13).toBe(0)
        expect(mat.m23).toBe(0)
        expect(mat.m33).toBe(1)
    })
    test('setTRS [1,2,3,0, 5,6,7,0, 9,10,11,0, 0,0,0,1]', () => {
        let mat = Mat4.identity
        const translation = new Vec3(20, 1, 5)
        const rotation = new Quaternion(3, 5, 7, 1)
        const scale = new Vec3(2, 2, 2)
        mat = Mat4.TRS(translation, rotation, scale)
        console.log("TRS");
        Mat4.print(mat)
        expect(mat.m00).toBe(7.6)
        expect(mat.m10).toBe(-8)
        expect(mat.m20).toBe(20)
        expect(mat.m30).toBe(0)
        expect(mat.m01).toBe(4)
        expect(mat.m11).toBe(0)
        expect(mat.m21).toBe(20)
        expect(mat.m31).toBe(0)
        expect(mat.m02).toBe(0)
        expect(mat.m12).toBe(-20)
        expect(mat.m22).toBe(7.6)
        expect(mat.m32).toBe(0)
        expect(mat.m03).toBe(20)
        expect(mat.m13).toBe(1)
        expect(mat.m23).toBe(5)
        expect(mat.m33).toBe(1)
    })
})

import { describe, expect, test } from 'vitest'
import { Mat4 } from '../src/Mat4'
import { Vec4 } from '../src/vec4'

describe('Mat4', () => {
    test('create, no values given default to [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
        const mat = new Mat4(new Vec4(), new Vec4(), new Vec4(), new Vec4())
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
})

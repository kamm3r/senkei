import { describe, expect, test } from 'vitest'
import { Vec4 } from "../src/vec4"

describe('vec4', () => {
    test('Distance, v1(2,3,0,2) and v2(5,7,0,2) values given', () => {
        const v1 = new Vec4(2, 3, 0, 2)
        const v2 = new Vec4(5, 7, 0, 2)
        const dist = Vec4.Distance(v1, v2)
        expect(dist).toBe(5)
    })
    test('Normalized, v(3,1,2,4) values given', () => {
        const v = new Vec4(3, 1, 2, 4)
        const norm = v.normalized
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.548)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.183)
        expect(parseFloat(norm.z.toFixed(3))).toBe(0.365)
        expect(parseFloat(norm.w.toFixed(3))).toBe(0.730)
    })
    test('Normalize, v(3,1,2,4) values given', () => {
        const v = new Vec4(3, 1, 2, 4)
        const norm = Vec4.Normalize(v)
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.548)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.183)
        expect(parseFloat(norm.z.toFixed(3))).toBe(0.365)
        expect(parseFloat(norm.w.toFixed(3))).toBe(0.730)
    })
})


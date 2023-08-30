import { describe, expect, test } from 'vitest'
import { Vec3 } from "../src/Vec3"

describe('Vec3', () => {
    test('create, no values given', () => {
        const v = new Vec3()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
    })
    test('Distance, v1(2,3,0) and v2(5,7,0) values given', () => {
        const v1 = new Vec3(2, 3, 0)
        const v2 = new Vec3(5, 7, 0)
        const dist = Vec3.Distance(v1, v2)
        expect(dist).toBe(5)
    })
    test('Normalized, v(3,1,2) values given', () => {
        const v = new Vec3(3, 1, 2)
        const norm = v.normalized
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.802)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.267)
        expect(parseFloat(norm.z.toFixed(3))).toBe(0.535)
    })
    test('max', () => {
        const v1 = new Vec3(6, 5, 8)
        const v2 = new Vec3(5, 7, 1)
        const max = Vec3.Max(v1, v2)
        expect(max.x).toBe(6)
        expect(max.y).toBe(7)
        expect(max.z).toBe(8)
    })
    test('min', () => {
        const v1 = new Vec3(6, 5, 8)
        const v2 = new Vec3(5, 7, 1)
        const max = Vec3.Min(v1, v2)
        expect(max.x).toBe(5)
        expect(max.y).toBe(5)
        expect(max.z).toBe(1)
    })
})

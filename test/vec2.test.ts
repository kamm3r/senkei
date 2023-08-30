import { describe, expect, test } from 'vitest'
import { Vec2 } from "../src/Vec2"

describe('Vec2', () => {
    test('dot product', () => {
        const v1 = new Vec2(9, 2)
        const v2 = new Vec2(3, 7)
        const dot = Vec2.Dot(v1, v2)
        expect(dot).toBe(41)
    })
    test('magnitude of vec(9,2)', () => {
        const v = new Vec2(9, 2)
        const mag = v.magnitude
        expect(parseFloat(mag.toFixed(3))).toBe(9.220)
    })
    test('magnitudeSqrt of vec(9,2)', () => {
        const v = new Vec2(9, 2)
        const mag = v.sqrMagnitude
        expect(mag).toBe(85)
    })
    test('Normalized, v(3,1) values given', () => {
        const v = new Vec2(3, 1)
        const norm = v.normalize
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.949)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.316)
    })
    test('Negate, vec(2,-1)', () => {
        const v = new Vec2(2, -1)
        const neg = Vec2.negate(v)
        expect(neg.x).toBe(-2)
        expect(neg.y).toBe(1)
    })
    test('Distance, v1(2,3) and v2(5,7) values given', () => {
        const v1 = new Vec2(2, 3)
        const v2 = new Vec2(5, 7)
        const dist = Vec2.Distance(v1, v2)
        expect(dist).toBe(5)
    })
})

import { describe, expect, test } from 'vitest'
import * as Vec4 from "../src/vec4"

describe('Vec4', () => {
    test('create, no values given', () => {
        const v = Vec4.create()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
        expect(v[3]).toBe(0)
    })
    test('create, 1,2,3,4 values given', () => {
        const v = Vec4.create(1, 2, 3, 4)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
        expect(v[3]).toBe(4)
    })
    test('one static vector', () => {
        const v = Vec4.one()
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(1)
        expect(v[2]).toBe(1)
        expect(v[3]).toBe(1)
    })
    test('zero static vector', () => {
        const v = Vec4.zero()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
        expect(v[3]).toBe(0)
    })
    test('Distance, v1(2,3,0,2) and v2(5,7,0,2) values given', () => {
        const v1 = Vec4.create(2, 3, 0, 2)
        const v2 = Vec4.create(5, 7, 0, 2)
        const dist = Vec4.distance(v1, v2)
        expect(dist).toBe(5)
    })
    test('Normalized, v(3,1,2,4) values given', () => {
        const v = Vec4.create(3, 1, 2, 4)
        const norm = Vec4.normalized(v)
        expect(parseFloat(norm[0].toFixed(3))).toBe(0.548)
        expect(parseFloat(norm[1].toFixed(3))).toBe(0.183)
        expect(parseFloat(norm[2].toFixed(3))).toBe(0.365)
        expect(parseFloat(norm[3].toFixed(3))).toBe(0.730)
    })
    test('Normalize, v(3,1,2,4) values given', () => {
        const v = Vec4.create(3, 1, 2, 4)
        const news = Vec4.create(0, 0, 0, 0)
        const norm = Vec4.normalize(news, v)
        expect(parseFloat(norm[0].toFixed(3))).toBe(0.548)
        expect(parseFloat(norm[1].toFixed(3))).toBe(0.183)
        expect(parseFloat(norm[2].toFixed(3))).toBe(0.365)
        expect(parseFloat(norm[3].toFixed(3))).toBe(0.730)
    })
})
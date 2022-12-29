import { describe, expect, test } from 'vitest'
import { quat } from "../src"

describe('quat', () => {
    test('create, no values given', () => {
        const v = quat.create()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
        expect(v[3]).toBe(0)
    })
    test('create, 1,2,3,4 values given', () => {
        const v = quat.create(1, 2, 3, 4)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
        expect(v[3]).toBe(4)
    })
    test('Normalize, Quaternion(3,1,2,4) values given', () => {
        const v = quat.create(3, 1, 2, 4)
        const norm = quat.Normalize(v)
        expect(parseFloat(norm[0].toFixed(3))).toBe(0.548)
        expect(parseFloat(norm[1].toFixed(3))).toBe(0.183)
        expect(parseFloat(norm[2].toFixed(3))).toBe(0.365)
        expect(parseFloat(norm[3].toFixed(3))).toBe(0.730)
    })
})
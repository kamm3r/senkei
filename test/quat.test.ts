import { describe, expect, test } from 'vitest'
import { Quaternion } from "../src/Quat"

describe('Quaternion', () => {
    test('create, no values given', () => {
        const v = new Quaternion()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
        expect(v.w).toBe(1)
    })
    test('create, 1,2,3,1 values given', () => {
        const v = new Quaternion(1, 2, 3, 1)
        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
        expect(v.z).toBe(3)
        expect(v.w).toBe(1)
    })
    test('Normalize, Quaternion(3,1,2,1) values given', () => {
        const quat = new Quaternion(3, 1, 2, 1)
        const norm = quat.normalized
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.548)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.183)
        expect(parseFloat(norm.z.toFixed(3))).toBe(0.365)
        expect(parseFloat(norm.w.toFixed(3))).toBe(0.730)
    })
    test('Inverse', () => {
        const quat = new Quaternion(3, 1, 2, 1)
        const con = Quaternion.Inverse(quat)
        expect(con.x).toBe(-3)
        expect(con.y).toBe(-1)
        expect(con.z).toBe(-2)
        expect(con.w).toBe(1)
    })
})

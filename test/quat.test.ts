import { describe, expect, test } from 'vitest'
import { Quaternion } from "../src/Quat"

function roundTo(value: number, decimal: number): number {
    return parseFloat(value.toFixed(decimal))
}

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
        expect(roundTo(norm.x, 3)).toBe(0.775)
        expect(roundTo(norm.y, 3)).toBe(0.258)
        expect(roundTo(norm.z, 3)).toBe(0.516)
        expect(roundTo(norm.w, 3)).toBe(0.258)
    })
    test('Inverse', () => {
        const quat = new Quaternion(3, 1, 2, 1)
        const con = Quaternion.Inverse(quat)
        expect(con.x).toBe(-0.2)
        expect(roundTo(con.y, 4)).toBe(-0.0667)
        expect(roundTo(con.z, 4)).toBe(-0.1333)
        expect(roundTo(con.w, 4)).toBe(-0.0667)
    })
})

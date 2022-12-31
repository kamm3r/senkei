import { describe, expect, test } from 'vitest'
import { quat } from "../src"
// import { benchmark } from '../benchmark/benchmark'

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
    test('conjugate', () => {
        const v = quat.create(3, 1, 2, 4)
        const con = quat.Conjugate(v)
        expect(con[0]).toBe(-3)
        expect(con[1]).toBe(-1)
        expect(con[2]).toBe(-2)
        expect(con[3]).toBe(4)
    })
    test('inverse', () => {
        const v = quat.create(3, 1, 2, 4)
        const inv = quat.Inverse(v)
        // const sa = benchmark(() => inv, null, 100)
        // console.log('inverse', sa);
        expect(inv[0]).toBe(-0.10000000149011612)
        expect(inv[1]).toBe(-0.03333333507180214)
        expect(inv[2]).toBe(-0.06666667014360428)
        expect(inv[3]).toBe(0.13333334028720856)
    })
    test('inverse', () => {
        const v = quat.create(3, 1, 2, 4)
        const inv = quat.Inverses(v)
        // const sa = benchmark(() => inv, null, 100)
        // console.log('inverses', sa);
        expect(inv[0]).toBe(-0.547722578048706)
        expect(inv[1]).toBe(-0.18257418274879456)
        expect(inv[2]).toBe(-0.3651483654975891)
        expect(inv[3]).toBe(0.7302967309951782)
    })
    test('inverse', () => {
        const v = quat.create(3, 1, 2, 4)
        const inv = quat.Inversef(v)
        // const sa = benchmark(() => inv, null, 100)
        // console.log('inversef', sa);
        expect(inv[0]).toBe(-90)
        expect(inv[1]).toBe(-30)
        expect(inv[2]).toBe(-60)
        expect(inv[3]).toBe(120)
    })
    test('to Matrix', () => {
        const v = quat.create(3, 1, 2, 4)
        const mat = quat.toMatrix(v)
        expect(mat[0]).toBe(-9)
        expect(mat[1]).toBe(-10)
        expect(mat[2]).toBe(20)
        expect(mat[3]).toBe(0)

        expect(mat[4]).toBe(22)
        expect(mat[5]).toBe(-25)
        expect(mat[6]).toBe(-20)
        expect(mat[7]).toBe(0)

        expect(mat[8]).toBe(4)
        expect(mat[9]).toBe(28)
        expect(mat[10]).toBe(-19)
        expect(mat[11]).toBe(0)

        expect(mat[12]).toBe(0)
        expect(mat[13]).toBe(0)
        expect(mat[14]).toBe(0)
        expect(mat[15]).toBe(1)
    })
})

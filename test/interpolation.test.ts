import { describe, expect, test } from 'vitest'
import { Eerp } from '../src/utils/interpolation'

describe('Interpolation', () => {
    test('Eerp 28, 46, 1', () => {
        const e = Eerp(28, 46, 1)

        expect(e).toBe(46)
    })
    test('Eerp 28, 46, 0', () => {
        const e = Eerp(28, 46, 0)

        expect(e).toBe(28)
    })
    test('Eerp 28, 46, -1', () => {
        const e = Eerp(28, 46, -1)

        expect(parseFloat(e.toFixed(3))).toBe(17.043)
    })
    // test('Eerps 28, 46, 1', () => {
    //     const e = Eerps(28, 46, 1)

    //     expect(e).toBe(46)
    // })
    // test('Eerps 28, 46, 0', () => {
    //     const e = Eerps(28, 46, 0)

    //     expect(e).toBe(28)
    // })
    // test('Eerps 28, 46, -1', () => {
    //     const e = Eerps(28, 46, -1)

    //     expect(parseFloat(e.toFixed(3))).toBe(17.043)
    // })
    // test('Eerp vs Eerps', () => {
    //     const e1 = Eerp(28, 46, 1)
    //     const e2 = Eerps(28, 46, 1)
    //     let rad: boolean
    //     if (e1 === e2) {
    //         rad = true
    //     } else {
    //         rad = false
    //     }
    //     expect(rad).toBe(true)
    // })

})
import { describe, expect, test } from 'vitest'
import * as vec2 from '../src/vec2'
import * as vec3 from '../src/vec3'
import * as vec4 from '../src/vec4'
import { Sqrt, Sqrt2, Sqrt3, Sqrt4 } from '../src/utils/mathOperation'

describe('Squared', () => {
    test('squirt overload, return{number}', () => {
        const rad = Sqrt(1403)

        expect(rad).toBe(37.456641600656084)
    })
    test('squirt overload, return{number}', () => {
        const vec = vec2.create(7443, 2463)
        const rad = Sqrt2(vec)

        expect(parseFloat(rad[0].toFixed(3))).toBe(86.273)
        expect(parseFloat(rad[1].toFixed(3))).toBe(49.629)
    })
    test('squirt overload, return{vec3}', () => {
        const vec = vec3.create(7443, 2463, 61093)
        const rad = Sqrt3(vec)
        expect(parseFloat(rad[0].toFixed(3))).toBe(86.273)
        expect(parseFloat(rad[1].toFixed(3))).toBe(49.629)
        expect(parseFloat(rad[2].toFixed(3))).toBe(247.170)
    })
    test('squirt overload, return{vec4}', () => {
        const vec = vec4.create(14403, 2903, 1435, 44159)
        const rad = Sqrt4(vec)
        expect(parseFloat(rad[0].toFixed(3))).toBe(120.012)
        expect(parseFloat(rad[1].toFixed(3))).toBe(53.879)
        expect(parseFloat(rad[2].toFixed(3))).toBe(37.881)
        expect(parseFloat(rad[3].toFixed(3))).toBe(210.140)
    })
})
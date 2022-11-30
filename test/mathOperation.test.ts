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

        expect(rad.x).toBe(86.27282306729043)
        expect(rad.y).toBe(49.628620774710235)
    })
    test('squirt overload, return{vec3}', () => {
        const vec = vec3.create(7443, 2463, 61093)
        const rad = Sqrt3(vec)
        expect(rad.x).toBe(86.27282306729043)
        expect(rad.y).toBe(49.628620774710235)
        expect(rad.z).toBe(247.1699819961963)
    })
    test('squirt overload, return{vec4}', () => {
        const vec = vec4.create(14403, 2903, 1435, 44159)
        const rad = Sqrt4(vec)
        expect(rad.x).toBe(120.01249934902614)
        expect(rad.y).toBe(53.879495172096775)
        expect(rad.z).toBe(37.881393849751625)
        expect(rad.w).toBe(210.14042923721271)
    })
})
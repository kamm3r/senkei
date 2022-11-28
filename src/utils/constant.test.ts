import * as vec2 from '../vec2'
import * as vec3 from '../vec3'
import * as vec4 from '../vec4'
import { toDegree, toRadian } from './constants'
import { Sqrt, Sqrt2, Sqrt3, Sqrt4 } from './mathOperation'

describe('constant', () => {
    test('to Degree, 45 values given', () => {
        const deg = toDegree(45)
        expect(parseFloat(deg.toFixed(3))).toBe(2578.310)
    })
    test('to Radian, 45 values given', () => {
        const rad = toRadian(45)
        expect(parseFloat(rad.toFixed(3))).toBe(0.785)
    })
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
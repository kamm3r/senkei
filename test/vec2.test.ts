import { describe, expect, test } from 'vitest'
import { vec2 } from "../src"

describe('Vec2', () => {
    test('create, no values given', () => {
        const v = vec2.create()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
    })
    test('create, 1,2 values given', () => {
        const v = vec2.create(1, 2)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
    })
    test('ScalarAddition, 1,2 values given', () => {
        const v = vec2.create(1, 2)
        const add = vec2.scalarAddition(v, 9)
        expect(add[0]).toBe(10)
        expect(add[1]).toBe(11)
    })
    test('ScalarSubtraction, 1,2 values given', () => {
        const v = vec2.create(1, 2)
        const subtr = vec2.scalarSubtraction(v, 3)
        expect(subtr[0]).toBe(-2)
        expect(subtr[1]).toBe(-1)
    })
    test('ScalarMultiplication, 1,2 values given', () => {
        const v = vec2.create(1, 2)
        const mult = vec2.scalarMultiplication(v, 3)
        expect(mult[0]).toBe(3)
        expect(mult[1]).toBe(6)
    })
    test('ScalarDivision, 1,2 values given', () => {
        const v = vec2.create(1, 2)
        const div = vec2.scalarDivision(v, 1)
        expect(div[0]).toBe(1)
        expect(div[1]).toBe(2)
    })
    test('add, 1,2 values given', () => {
        const v1 = vec2.create(1, 2)
        const v2 = vec2.create(1, 2)
        const add = vec2.add(v1, v2)
        expect(add[0]).toBe(2)
        expect(add[1]).toBe(4)
    })
    test('subtract, 1,2 values given', () => {
        const v1 = vec2.create(1, 2)
        const v2 = vec2.create(1, 2)
        const subt = vec2.subtract(v1, v2)
        expect(subt[0]).toBe(0)
        expect(subt[1]).toBe(0)
    })
    test('multiply, 1,2 values given', () => {
        const v1 = vec2.create(1, 2)
        const v2 = vec2.create(1, 2)
        const mult = vec2.multiply(v1, v2)
        expect(mult[0]).toBe(1)
        expect(mult[1]).toBe(4)
    })
    test('divide, 1,2 values given', () => {
        const v1 = vec2.create(1, 2)
        const v2 = vec2.create(1, 2)
        const div = vec2.divide(v1, v2)
        expect(div[0]).toBe(1)
        expect(div[1]).toBe(1)
    })
    test('dot product', () => {
        const v1 = vec2.create(9, 2)
        const v2 = vec2.create(3, 7)
        const dot = vec2.dot(v1, v2)
        expect(dot).toBe(21)
    })
    test('magnitude of vec(9,2)', () => {
        const v = vec2.create(9, 2)
        const mag = vec2.magnitude(v)
        expect(parseFloat(mag.toFixed(3))).toBe(9.220)
    })
    test('magnitudeSqrt of vec(9,2)', () => {
        const v = vec2.create(9, 2)
        const mag = vec2.magnitudeSqrt(v)
        expect(mag).toBe(85)
    })
    test('Normalized, v(3,1) values given', () => {
        const v = vec2.create(3, 1)
        const norm = vec2.normalized(v)
        expect(parseFloat(norm[0].toFixed(3))).toBe(0.949)
        expect(parseFloat(norm[1].toFixed(3))).toBe(0.316)
    })
    test('Negate, vec(2,-1)', () => {
        const v = vec2.create(2, -1)
        const neg = vec2.negate(v)
        expect(neg[0]).toBe(-2)
        expect(neg[1]).toBe(1)
    })
    test('Scalar Projection, v(2,3) values given', () => {
        const v1 = vec2.create(2, 3)
        const v2 = vec2.create(5, 7)
        const scalProj = vec2.scalarProjection(v1, v2)
        expect(parseFloat(scalProj.toFixed(3))).toBe(13.387)
    })
    test('Vector Projection, v(2,3) values given', () => {
        const v1 = vec2.create(2, 3)
        const v2 = vec2.create(5, 7)
        const vecProj = vec2.VectorProjection(v1, v2)
        expect(parseFloat(vecProj[0].toFixed(3))).toBe(7.426)
        expect(parseFloat(vecProj[1].toFixed(3))).toBe(11.138)
    })
    test('Distance, v1(2,3) and v2(5,7) values given', () => {
        const v1 = vec2.create(2, 3)
        const v2 = vec2.create(5, 7)
        const dist = vec2.distance(v1, v2)
        expect(dist).toBe(5)
    })
    test('Distance Squared, v1(2,3) and v2(5,7) values given', () => {
        const v1 = vec2.create(2, 3)
        const v2 = vec2.create(5, 7)
        const dist = vec2.distanceSqrt(v1, v2)
        expect(dist).toBe(25)
    })
    test('bitwise shift and or operator', () => {
        let a = 0b101
        let b = 0b10110
        b <<= 4 // 0001 0110 0000 = 357
        let c = a | b
        expect(c.toString(2)).toBe('101100101')
    })
    test('bitwise xor operator', () => {
        let a = ~0b00010000
        let b = 0b101100101
        let c = a & b
        expect(c.toString(2)).toBe('101100101')
    })
    test('bitwise not operator', () => {
        let a = 0b1101
        let b = a ^ a

        expect(b).toBe(0)
    })

})
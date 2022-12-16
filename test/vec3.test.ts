import { describe, expect, test } from 'vitest'
import { vec3 } from "../src"

describe('Vec3', () => {
    test('create, no values given', () => {
        const v = vec3.create()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
    })
    test('create, 1,2,3 values given', () => {
        const v = vec3.create(1, 2, 3)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
    })
    test('back static vector', () => {
        const v = vec3.back()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(-1)
    })
    test('forward static vector', () => {
        const v = vec3.forward()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(1)
    })
    test('down static vector', () => {
        const v = vec3.down()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(-1)
        expect(v[2]).toBe(0)
    })
    test('up static vector', () => {
        const v = vec3.up()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(1)
        expect(v[2]).toBe(0)
    })
    test('left static vector', () => {
        const v = vec3.left()
        expect(v[0]).toBe(-1)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
    })
    test('right static vector', () => {
        const v = vec3.right()
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
    })
    test('one static vector', () => {
        const v = vec3.one()
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(1)
        expect(v[2]).toBe(1)
    })
    test('zero static vector', () => {
        const v = vec3.zero()
        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
    })
    test('Distance, v1(2,3,0) and v2(5,7,0) values given', () => {
        const v1 = vec3.create(2, 3, 0)
        const v2 = vec3.create(5, 7, 0)
        const dist = vec3.distance(v1, v2)
        expect(dist).toBe(5)
    })
    test('Normalized, v(3,1,2) values given', () => {
        const v = vec3.create(3, 1, 2)
        const norm = vec3.normalized(v)
        expect(parseFloat(norm[0].toFixed(3))).toBe(0.802)
        expect(parseFloat(norm[1].toFixed(3))).toBe(0.267)
        expect(parseFloat(norm[2].toFixed(3))).toBe(0.535)
    })
    test('max', () => {
        const v1 = vec3.create(6, 5, 8)
        const v2 = vec3.create(5, 7, 1)
        const max = vec3.max(v1, v2)
        expect(max[0]).toBe(6)
        expect(max[1]).toBe(7)
        expect(max[2]).toBe(8)
    })
    test('min', () => {
        const v1 = vec3.create(6, 5, 8)
        const v2 = vec3.create(5, 7, 1)
        const max = vec3.min(v1, v2)
        expect(max[0]).toBe(5)
        expect(max[1]).toBe(5)
        expect(max[2]).toBe(1)
    })
})
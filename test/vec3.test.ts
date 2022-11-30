import * as vec3 from "../src/vec3"

describe('Vec3', () => {
    test('create, no values given', () => {
        const v = vec3.create()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
    })
    test('create, 1,2,3 values given', () => {
        const v = vec3.create(1, 2, 3)
        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
        expect(v.z).toBe(3)
    })
    test('back static vector', () => {
        const v = vec3.back()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(-1)
    })
    test('forward static vector', () => {
        const v = vec3.forward()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(1)
    })
    test('down static vector', () => {
        const v = vec3.down()
        expect(v.x).toBe(0)
        expect(v.y).toBe(-1)
        expect(v.z).toBe(0)
    })
    test('up static vector', () => {
        const v = vec3.up()
        expect(v.x).toBe(0)
        expect(v.y).toBe(1)
        expect(v.z).toBe(0)
    })
    test('left static vector', () => {
        const v = vec3.left()
        expect(v.x).toBe(-1)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
    })
    test('right static vector', () => {
        const v = vec3.right()
        expect(v.x).toBe(1)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
    })
    test('one static vector', () => {
        const v = vec3.one()
        expect(v.x).toBe(1)
        expect(v.y).toBe(1)
        expect(v.z).toBe(1)
    })
    test('zero static vector', () => {
        const v = vec3.zero()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
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
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.802)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.267)
        expect(parseFloat(norm.z.toFixed(3))).toBe(0.535)
    })
})
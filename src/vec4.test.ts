import * as Vec4 from "./vec4"

describe('Vec4', () => {
    test('create, no values given', () => {
        const v = Vec4.create()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
        expect(v.w).toBe(0)
    })
    test('create, 1,2,3,4 values given', () => {
        const v = Vec4.create(1, 2, 3, 4)
        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
        expect(v.z).toBe(3)
        expect(v.w).toBe(4)
    })
    test('one static vector', () => {
        const v = Vec4.one()
        expect(v.x).toBe(1)
        expect(v.y).toBe(1)
        expect(v.z).toBe(1)
        expect(v.w).toBe(1)
    })
    test('zero static vector', () => {
        const v = Vec4.zero()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
        expect(v.w).toBe(0)
    })
    test('Distance, v1(2,3,0,2) and v2(5,7,0,2) values given', () => {
        const v1 = Vec4.create(2, 3, 0, 2)
        const v2 = Vec4.create(5, 7, 0, 2)
        const dist = Vec4.distance(v1, v2)
        expect(dist).toBe(5)
    })
    test('Normalized, v(3,1,2,4) values given', () => {
        const v = Vec4.create(3, 1, 2, 4)
        const norm = Vec4.normalized(v)
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.802)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.267)
        expect(parseFloat(norm.z.toFixed(3))).toBe(0.535)
        expect(parseFloat(norm.w.toFixed(3))).toBe(1.069)
    })
})
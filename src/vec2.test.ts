import * as vec2 from "./vec2"

describe('Vec2', () => {
    test('create, no values given', () => {
        const v = vec2.create()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
    })
    test('create, 1,2 values given', () => {
        const v = vec2.create(1, 2)
        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
    })
    test('Distance, v1(2,3) and v2(5,7) values given', () => {
        const v1 = vec2.create(2, 3)
        const v2 = vec2.create(5, 7)
        const dist = vec2.distance(v1, v2)
        expect(dist).toBe(5)
    })
    test('Normalized, v(3,1) values given', () => {
        const v = vec2.create(3, 1)
        const norm = vec2.normalized(v)
        expect(parseFloat(norm.x.toFixed(3))).toBe(0.949)
        expect(parseFloat(norm.y.toFixed(3))).toBe(0.316)
    })
    test('Unit vector, v(2,3) values given', () => {
        const v = vec2.create(3, 1)
        const uv = vec2.unitVector(v)
        expect(parseFloat(uv.x.toFixed(3))).toBe(0.949)
        expect(parseFloat(uv.y.toFixed(3))).toBe(0.316)
    })
})
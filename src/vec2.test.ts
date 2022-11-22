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
    test('Normalize, v(2,3) values given', () => {
        const v = vec2.create(2, 3)
        const norm = vec2.normalize(v)
        expect(norm.x).toBe(1)
        expect(norm.y).toBe(1)
    })
})
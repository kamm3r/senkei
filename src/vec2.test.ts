import * as vec2 from "./vec2"

describe('Vec2', () => {
    test('new vector no values given', () => {
        const v = vec2.create()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
    })
    test('new vector, 1,2 values given', () => {
        const v = vec2.create(1, 2)
        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
    })
})
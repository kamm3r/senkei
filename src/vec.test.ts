import * as vec3 from "./vec"

describe('Vec3', () => {
    test('new vector no values given', () => {
        const v = vec3.newVector()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
    })
    test('new vector, 1,2,3 values given', () => {
        const v = vec3.newVector({ x: 1, y: 2, z: 3 })
        expect(v.x).toBe(1)
        expect(v.y).toBe(2)
        expect(v.z).toBe(3)
    })
})
import { newVector } from "./vec"

describe('Vec3', () => {
    test('construct', () => {
        const v = newVector()
        expect(v.x).toBe(0)
        expect(v.y).toBe(0)
        expect(v.z).toBe(0)
    })
})
import * as vec3 from "./vec"

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
    test('Distance, v1(2,3,0) and v2(5,7,0) values given', () => {
        const v1 = vec3.create(2, 3, 0)
        const v2 = vec3.create(5, 7, 0)
        const dist = vec3.distance(v1, v2)
        expect(dist).toBe(5)
    })
    // test('Distance, v1(2,3,0) and v2(5,7,0) values given', () => {
    //     const v = vec3.create(2, 3, 5)
    //     const norm = vec3.normalized(v)
    //     expect(norm).toBe(1)
    // })
})
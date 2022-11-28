import * as vec3 from './uvec3'
describe('uvec3', () => {
    test('FLoat32Array, no values given', () => {
        const v = vec3._new()

        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
    })
    test('FLoat32Array, 1,2,3 values given', () => {
        const v = vec3._new(1, 2, 3)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
    })
    // test('back static vector', () => {
    //     const v = vec3.back()
    //     console.log('test ', v);
    //     expect(v[0]).toBe(0)
    //     expect(v[1]).toBe(0)
    //     expect(v[2]).toBe(-1)
    // })
    // test('forward static vector', () => {
    //     const v = vec3.forward()
    //     expect(v[0]).toBe(0)
    //     expect(v[1]).toBe(0)
    //     expect(v[2]).toBe(1)
    // })
    // test('down static vector', () => {
    //     const v = vec3.down()
    //     expect(v[0]).toBe(0)
    //     expect(v[1]).toBe(-1)
    //     expect(v[2]).toBe(0)
    // })
    // test('up static vector', () => {
    //     const v = vec3.up()
    //     expect(v[0]).toBe(0)
    //     expect(v[1]).toBe(1)
    //     expect(v[2]).toBe(0)
    // })
    // test('left static vector', () => {
    //     const v = vec3.left()
    //     expect(v[0]).toBe(-1)
    //     expect(v[1]).toBe(0)
    //     expect(v[2]).toBe(0)
    // })
    // test('right static vector', () => {
    //     const v = vec3.right()
    //     expect(v[0]).toBe(1)
    //     expect(v[1]).toBe(0)
    //     expect(v[2]).toBe(0)
    // })
    // test('one static vector', () => {
    //     const v = vec3.one()
    //     expect(v[0]).toBe(1)
    //     expect(v[1]).toBe(1)
    //     expect(v[2]).toBe(1)
    // })
    // test('zero static vector', () => {
    //     const v = vec3.zero()
    //     expect(v[0]).toBe(0)
    //     expect(v[1]).toBe(0)
    //     expect(v[2]).toBe(0)
    // })
    // test('Distance, v1(2,3,0) and v2(5,7,0) values given', () => {
    //     const v1 = vec3._new(2, 3, 0)
    //     const v2 = vec3._new(5, 7, 0)
    //     const dist = vec3.distance(v1, v2)
    //     expect(dist).toBe(5)
    // })
    // test('Normalized, v(3,1,2) values given', () => {
    //     const v = vec3._new(3, 1, 2)
    //     const norm = vec3.normalized(v)
    //     expect(parseFloat(norm[0].toFixed(3))).toBe(0.802)
    //     expect(parseFloat(norm[1].toFixed(3))).toBe(0.267)
    //     expect(parseFloat(norm[2].toFixed(3))).toBe(0.535)
    // })
})
import * as mat3 from './matrix'

describe('Mat3', () => {
    test('create, no values given default to [0, 0, 0, 0, 0, 0, 0, 0, 0]', () => {
        const mat = mat3.create()
        expect(mat).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0])
    })
    test('create, [0, 1, 0, 0, 0, 1, 0, 1, 0] values given', () => {
        const mat = mat3.create([0, 1, 0, 0, 0, 1, 0, 1, 0])
        expect(mat).toStrictEqual([0, 1, 0, 0, 0, 1, 0, 1, 0])
    })
})
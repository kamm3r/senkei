import * as mat2 from './mat2'

describe('Mat2', () => {
    test('create, no values given default to [0,0,0,0]', () => {
        const mat = mat2.create()
        expect(mat).toStrictEqual([0, 0, 0, 0])
    })
    test('create, [1,0,1,0] values given', () => {
        const mat = mat2.create([1, 0, 1, 0])
        expect(mat).toStrictEqual([1, 0, 1, 0])
    })
})
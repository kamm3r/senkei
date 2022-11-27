import * as mat2 from './mat2'

describe('Mat2', () => {
    test('create, no values given default to [0,0,0,0]', () => {
        const mat = mat2.create(2, 2)
        expect(mat).toStrictEqual([[0, 0], [0, 0]])
    })
    test('create, [1,0,1,0] values given', () => {
        const mat = mat2.create(2, 2, [[1, 0], [1, 0]])
        expect(mat).toStrictEqual([[1, 0], [1, 0]])
    })
    test('creates, values given', () => {
        const mat = mat2.creates(4)
        expect(mat[0]).toBe(0)
        expect(mat[1]).toBe(0)
        expect(mat[2]).toBe(0)
        expect(mat[3]).toBe(0)
    })
    test('get rows', () => {
        const mat = mat2.create(2, 2, [[1, 0], [1, 0]])
        const rows = mat2.getRows(mat)

        expect(rows).toStrictEqual([[1, 0], [1, 0]])
    })
    test('get cols', () => {
        const mat = mat2.create(2, 2, [[1, 0], [1, 0]])
        const cols = mat2.getCols(mat)

        expect(cols).toStrictEqual([1, 0])
    })
})
import { describe, expect, test } from 'vitest'
import { uvec3 } from '../src/index'

describe('uvec3', () => {
    test('Uint32Array, no values given', () => {
        const v = uvec3.create()

        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
    })
    test('Uint32Array, 1,2,3 values given', () => {
        const v = uvec3.create(1, 2, 3)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
    })
})
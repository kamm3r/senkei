import { describe, expect, test } from 'vitest'
import * as vec3 from '../src/uvec3'

describe('uvec3', () => {
    test('Uint32Array, no values given', () => {
        const v = vec3._new()

        expect(v[0]).toBe(0)
        expect(v[1]).toBe(0)
        expect(v[2]).toBe(0)
    })
    test('Uint32Array, 1,2,3 values given', () => {
        const v = vec3._new(1, 2, 3)
        expect(v[0]).toBe(1)
        expect(v[1]).toBe(2)
        expect(v[2]).toBe(3)
    })
})
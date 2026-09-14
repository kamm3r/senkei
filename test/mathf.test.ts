import { describe, expect, test } from 'vitest';
import { Mathf } from '../src/Utils';

describe('Mathf', () => {
    test('constants', () => {
        expect(Mathf.PI).toBeCloseTo(Math.PI, 6);
        expect(Mathf.TAU).toBeCloseTo(2 * Math.PI, 6);
        expect(Mathf.Deg2Rad).toBeCloseTo(Math.PI / 180, 8);
        expect(Mathf.Rad2Deg).toBeCloseTo(180 / Math.PI, 6);
    });

    test('Clamp and Clamp01', () => {
        expect(Mathf.Clamp(5, 0, 1)).toBe(1);
        expect(Mathf.Clamp(-5, 0, 1)).toBe(0);
        expect(Mathf.Clamp01(2)).toBe(1);
        expect(Mathf.Clamp01(-2)).toBe(0);
    });

    test('Lerp clamps, LerpUnclamped extrapolates', () => {
        expect(Mathf.Lerp(0, 10, 0.5)).toBe(5);
        expect(Mathf.Lerp(0, 10, 2)).toBe(10);
        expect(Mathf.LerpUnclamped(0, 10, 2)).toBe(20);
    });

    test('Approximately compares with relative tolerance', () => {
        expect(Mathf.Approximately(0.1 + 0.2, 0.3)).toBe(true);
        expect(Mathf.Approximately(1, 2)).toBe(false);
        // Large magnitudes use the larger operand for tolerance.
        expect(Mathf.Approximately(1e7, 1e7 + 5)).toBe(true);
        expect(Mathf.Approximately(1e7, 1e7 + 500)).toBe(false);
    });
});

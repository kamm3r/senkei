import { describe, expect, test } from 'vitest';
import { Vec2 } from '../src/Vec2';
import { Vec3 } from '../src/Vec3';
import { expectVec2Close } from './helpers';

describe('Vec2', () => {
    test('create, no values given', () => {
        const v = new Vec2();
        expect(v.x).toBe(0);
        expect(v.y).toBe(0);
    });

    test('create, values given', () => {
        const v = new Vec2(1, 2);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
    });

    test('static direction constants', () => {
        expectVec2Close(Vec2.up, 0, 1);
        expectVec2Close(Vec2.down, 0, -1);
        expectVec2Close(Vec2.left, -1, 0);
        expectVec2Close(Vec2.right, 1, 0);
        expectVec2Close(Vec2.zero, 0, 0);
        expectVec2Close(Vec2.one, 1, 1);
    });

    test('add and sub', () => {
        expectVec2Close(Vec2.Add(new Vec2(1, 2), new Vec2(3, 7)), 4, 9);
        expectVec2Close(Vec2.Subtract(new Vec2(1, 2), new Vec2(3, 7)), -2, -5);
    });

    test('component-wise mult and div', () => {
        expectVec2Close(Vec2.Multiply(new Vec2(2, 3), new Vec2(4, 5)), 8, 15);
        expectVec2Close(Vec2.Divide(new Vec2(8, 15), new Vec2(4, 5)), 2, 3);
    });

    test('scalar mult, div and negate', () => {
        expectVec2Close(Vec2.Multiply(new Vec2(2, -4), 0.5), 1, -2);
        expectVec2Close(Vec2.Divide(new Vec2(2, -4), 2), 1, -2);
        expectVec2Close(Vec2.Negate(new Vec2(2, -1)), -2, 1);
    });

    test('Min and Max are component-wise', () => {
        expectVec2Close(Vec2.Min(new Vec2(6, 5), new Vec2(5, 7)), 5, 5);
        expectVec2Close(Vec2.Max(new Vec2(6, 5), new Vec2(5, 7)), 6, 7);
    });

    test('Scale component-wise', () => {
        expectVec2Close(Vec2.Scale(new Vec2(2, 3), new Vec2(4, 5)), 8, 15);
        const v = new Vec2(2, 3);
        v.Scale(new Vec2(4, 5));
        expectVec2Close(v, 8, 15);
    });

    test('dot product', () => {
        expect(Vec2.Dot(new Vec2(9, 2), new Vec2(3, 7))).toBe(41);
    });

    test('magnitude and sqrMagnitude', () => {
        expect(new Vec2(9, 2).magnitude).toBeCloseTo(9.22, 2);
        expect(new Vec2(9, 2).sqrMagnitude).toBe(85);
        expect(Vec2.SqrMagnitude(new Vec2(9, 2))).toBe(85);
    });

    test('static Normalize and normalized getter', () => {
        expectVec2Close(Vec2.Normalize(new Vec2(3, 1)), 0.9487, 0.3162);
        expectVec2Close(new Vec2(3, 1).normalized, 0.9487, 0.3162);
        expect(Vec2.Magnitude(new Vec2(9, 2))).toBeCloseTo(9.22, 2);
    });

    test('deprecated mult still multiplies component-wise like Scale', () => {
        expectVec2Close(Vec2.Multiply(new Vec2(2, 3), new Vec2(4, 5)), 8, 15);
    });

    test('SqrDistance and Clamp', () => {
        expect(Vec2.SqrDistance(new Vec2(2, 3), new Vec2(5, 7))).toBe(25);
        expectVec2Close(
            Vec2.Clamp(new Vec2(5, -1), new Vec2(0, 0), new Vec2(1, 1)),
            1, 0
        );
    });

    test('instance Normalize writes back', () => {
        const v = new Vec2(3, 1);
        v.Normalize();
        expectVec2Close(v, 0.9487, 0.3162);
    });

    test('Angle and SignedAngle in degrees', () => {
        expect(Vec2.Angle(new Vec2(1, 0), new Vec2(0, 1))).toBeCloseTo(90, 4);
        expect(Vec2.SignedAngle(new Vec2(1, 0), new Vec2(0, 1))).toBeCloseTo(90, 4);
        expect(Vec2.SignedAngle(new Vec2(0, 1), new Vec2(1, 0))).toBeCloseTo(-90, 4);
    });

    test('Reflect and Perpendicular', () => {
        expectVec2Close(Vec2.Reflect(new Vec2(1, -1), new Vec2(0, 1)), 1, 1);
        expectVec2Close(Vec2.Perpendicular(new Vec2(1, 0)), 0, 1);
    });

    test('Distance', () => {
        expect(Vec2.Distance(new Vec2(2, 3), new Vec2(5, 7))).toBe(5);
    });

    test('ClampMagnitude shortens long vectors and copies short ones', () => {
        expectVec2Close(Vec2.ClampMagnitude(new Vec2(3, 4), 2), 1.2, 1.6);
        const short = new Vec2(1, 0);
        const out = Vec2.ClampMagnitude(short, 2);
        expectVec2Close(out, 1, 0);
        expect(out).not.toBe(short);
    });

    test('Lerp clamps, LerpUnclamped extrapolates', () => {
        expectVec2Close(Vec2.Lerp(new Vec2(0, 0), new Vec2(10, 10), 0.25), 2.5, 2.5);
        expectVec2Close(Vec2.Lerp(new Vec2(0, 0), new Vec2(10, 10), 2), 10, 10);
        expectVec2Close(Vec2.LerpUnclamped(new Vec2(0, 0), new Vec2(10, 10), 2), 20, 20);
    });

    test('MoveTowards steps, snaps and never aliases the target', () => {
        expectVec2Close(Vec2.MoveTowards(new Vec2(0, 0), new Vec2(10, 0), 3), 3, 0);
        const target = new Vec2(10, 0);
        const snapped = Vec2.MoveTowards(new Vec2(0, 0), target, 100);
        expectVec2Close(snapped, 10, 0);
        expect(snapped).not.toBe(target);
    });

    test('SmoothDamp moves towards the target without touching inputs', () => {
        const target = new Vec2(10, 0);
        const velocity = new Vec2(0, 0);
        const { value: out, velocity: vel } = Vec2.SmoothDamp(
            new Vec2(0, 0),
            target,
            velocity,
            0.3,
            Infinity,
            1 / 60
        );
        expect(out.x).toBeGreaterThan(0);
        expect(out.x).toBeLessThan(10);
        expect(out.y).toBeCloseTo(0, 6);
        expect(vel.x).toBeGreaterThan(0);
        // Inputs are untouched: state travels in the return value.
        expectVec2Close(target, 10, 0);
        expectVec2Close(velocity, 0, 0);
    });

    test('SmoothDamp clamps overshoot and zeroes velocity', () => {
        const { value: out, velocity: vel } = Vec2.SmoothDamp(
            new Vec2(0, 0),
            new Vec2(10, 0),
            new Vec2(1000, 0),
            0.3,
            Infinity,
            1 / 60
        );
        expect(out.x).toBe(10);
        expect(vel.x).toBe(0);
    });

    test('Set, copy and clone', () => {
        const v = new Vec2();
        v.Set(4, 5);
        expectVec2Close(v, 4, 5);

        const c = v.clone();
        c.x = 99;
        expect(v.x).toBe(4);

        const d = new Vec2();
        d.copy(v);
        expectVec2Close(d, 4, 5);
    });

    test('toVec2 / toVec3 / toVec4 conversions', () => {
        expectVec2Close(Vec2.ToVec2(new Vec3(1, 2, 3)), 1, 2);
        const v3 = Vec2.ToVec3(new Vec2(1, 2));
        expect(v3.x).toBe(1);
        expect(v3.y).toBe(2);
        expect(v3.z).toBe(0);
        const v4 = Vec2.ToVec4(new Vec2(1, 2));
        expect(v4.x).toBe(1);
        expect(v4.y).toBe(2);
        expect(v4.z).toBe(0);
        expect(v4.w).toBe(0);
    });
});

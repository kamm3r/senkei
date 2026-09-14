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
        expectVec2Close(Vec2.add(new Vec2(1, 2), new Vec2(3, 7)), 4, 9);
        expectVec2Close(Vec2.sub(new Vec2(1, 2), new Vec2(3, 7)), -2, -5);
    });

    test('component-wise mult and div', () => {
        expectVec2Close(Vec2.mult(new Vec2(2, 3), new Vec2(4, 5)), 8, 15);
        expectVec2Close(Vec2.div(new Vec2(8, 15), new Vec2(4, 5)), 2, 3);
    });

    test('scalar mult, div and negate', () => {
        expectVec2Close(Vec2.scalarMult(new Vec2(2, -4), 0.5), 1, -2);
        expectVec2Close(Vec2.scalarDiv(new Vec2(2, -4), 2), 1, -2);
        expectVec2Close(Vec2.negate(new Vec2(2, -1)), -2, 1);
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

    test('normalize returns unit vector', () => {
        expectVec2Close(new Vec2(3, 1).normalize, 0.9487, 0.3162);
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

    test('ClampMagnitude shortens long vectors only', () => {
        expectVec2Close(Vec2.ClampMagnitude(new Vec2(3, 4), 2), 1.2, 1.6);
        expectVec2Close(Vec2.ClampMagnitude(new Vec2(1, 0), 2), 1, 0);
    });

    test('Lerp clamps, LerpUnclamped extrapolates', () => {
        expectVec2Close(Vec2.Lerp(new Vec2(0, 0), new Vec2(10, 10), 0.25), 2.5, 2.5);
        expectVec2Close(Vec2.Lerp(new Vec2(0, 0), new Vec2(10, 10), 2), 10, 10);
        expectVec2Close(Vec2.LerpUnclamped(new Vec2(0, 0), new Vec2(10, 10), 2), 20, 20);
    });

    test('MoveTowards steps and snaps', () => {
        expectVec2Close(Vec2.MoveTowards(new Vec2(0, 0), new Vec2(10, 0), 3), 3, 0);
        expectVec2Close(Vec2.MoveTowards(new Vec2(0, 0), new Vec2(10, 0), 100), 10, 0);
    });

    test('SmoothDamp moves towards the target', () => {
        const out = Vec2.SmoothDamp(
            new Vec2(0, 0),
            new Vec2(10, 0),
            new Vec2(0, 0),
            0.3,
            Infinity,
            1 / 60
        );
        expect(out.x).toBeGreaterThan(0);
        expect(out.x).toBeLessThan(10);
        expect(out.y).toBeCloseTo(0, 6);
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

    test('toVec2 / toVec3 conversions', () => {
        expectVec2Close(Vec2.toVec2(new Vec3(1, 2, 3)), 1, 2);
        const v3 = Vec2.toVec3(new Vec2(1, 2));
        expect(v3.x).toBe(1);
        expect(v3.y).toBe(2);
        expect(v3.z).toBe(0);
    });
});

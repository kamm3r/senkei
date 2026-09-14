import { describe, expect, test } from 'vitest';
import { Vec3 } from '../src/Vec3';
import { expectVec3Close } from './helpers';

describe('Vec3', () => {
    test('create, no values given', () => {
        const v = new Vec3();
        expect(v.x).toBe(0);
        expect(v.y).toBe(0);
        expect(v.z).toBe(0);
    });

    test('create, values given', () => {
        const v = new Vec3(1, 2, 3);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
        expect(v.z).toBe(3);
    });

    test('static direction constants', () => {
        expectVec3Close(Vec3.zero, 0, 0, 0);
        expectVec3Close(Vec3.one, 1, 1, 1);
        expectVec3Close(Vec3.up, 0, 1, 0);
        expectVec3Close(Vec3.down, 0, -1, 0);
        expectVec3Close(Vec3.left, -1, 0, 0);
        expectVec3Close(Vec3.right, 1, 0, 0);
        expectVec3Close(Vec3.forward, 0, 0, 1);
        expectVec3Close(Vec3.back, 0, 0, -1);
    });

    test('add, sub and scalar ops', () => {
        expectVec3Close(Vec3.add(new Vec3(1, 2, 3), new Vec3(4, 5, 6)), 5, 7, 9);
        expectVec3Close(Vec3.sub(new Vec3(1, 2, 3), new Vec3(4, 5, 6)), -3, -3, -3);
        expectVec3Close(Vec3.mult(new Vec3(1, 2, 3), 2), 2, 4, 6);
        expectVec3Close(Vec3.div(new Vec3(2, 4, 6), 2), 1, 2, 3);
        expectVec3Close(
            Vec3.MultiplyWithVector(new Vec3(1, 2, 3), new Vec3(4, 5, 6)),
            4, 10, 18
        );
        expectVec3Close(Vec3.negate(new Vec3(1, -2, 3)), -1, 2, -3);
    });

    test('Min, Max and Clamp', () => {
        expectVec3Close(Vec3.Max(new Vec3(6, 5, 8), new Vec3(5, 7, 1)), 6, 7, 8);
        expectVec3Close(Vec3.Min(new Vec3(6, 5, 8), new Vec3(5, 7, 1)), 5, 5, 1);
        expectVec3Close(
            Vec3.Clamp(new Vec3(5, -1, 0.5), new Vec3(0, 0, 0), new Vec3(1, 1, 1)),
            1, 0, 0.5
        );
    });

    test('Dot and Cross', () => {
        expect(Vec3.Dot(new Vec3(1, 2, 3), new Vec3(4, -5, 6))).toBe(12);
        expectVec3Close(
            Vec3.Cross(new Vec3(1, 0, 0), new Vec3(0, 1, 0)),
            0, 0, 1
        );
    });

    test('magnitude and sqrMagnitude', () => {
        expect(new Vec3(2, 3, 6).magnitude).toBe(7);
        expect(new Vec3(2, 3, 6).sqrMagnitude).toBe(49);
        expect(Vec3.Magnitude(new Vec3(2, 3, 6))).toBe(7);
        expect(Vec3.SqrMagnitude(new Vec3(2, 3, 6))).toBe(49);
    });

    test('normalized and instance Normalize', () => {
        expectVec3Close(new Vec3(3, 1, 2).normalized, 0.8018, 0.2673, 0.5345);
        const v = new Vec3(3, 1, 2);
        v.Normalize();
        expectVec3Close(v, 0.8018, 0.2673, 0.5345);
    });

    test('Distance and SqrDistance', () => {
        expect(Vec3.Distance(new Vec3(2, 3, 0), new Vec3(5, 7, 0))).toBe(5);
        expect(Vec3.SqrDistance(new Vec3(2, 3, 0), new Vec3(5, 7, 0))).toBe(25);
    });

    test('Reflect mirrors across the normal', () => {
        expectVec3Close(
            Vec3.Reflect(new Vec3(1, -1, 0), new Vec3(0, 1, 0)),
            1, 1, 0
        );
    });

    test('Project returns the parallel component', () => {
        expectVec3Close(
            Vec3.Project(new Vec3(2, 3, 0), new Vec3(1, 0, 0)),
            2, 0, 0
        );
    });

    test('ProjectOnPlane removes the normal component', () => {
        expectVec3Close(
            Vec3.ProjectOnPlane(new Vec3(2, 3, 0), new Vec3(0, 1, 0)),
            2, 0, 0
        );
    });

    test('Angle, SignedAngle and AngleBetween in degrees/radians', () => {
        expect(Vec3.Angle(new Vec3(1, 0, 0), new Vec3(0, 1, 0))).toBeCloseTo(90, 4);
        expect(
            Vec3.SignedAngle(new Vec3(1, 0, 0), new Vec3(0, 1, 0), new Vec3(0, 0, 1))
        ).toBeCloseTo(90, 4);
        expect(
            Vec3.SignedAngle(new Vec3(0, 1, 0), new Vec3(1, 0, 0), new Vec3(0, 0, 1))
        ).toBeCloseTo(-90, 4);
        expect(
            Vec3.AngleBetween(new Vec3(1, 0, 0), new Vec3(0, 1, 0))
        ).toBeCloseTo(Math.PI / 2, 4);
    });

    test('ClampMagnitude shortens long vectors only', () => {
        expectVec3Close(Vec3.ClampMagnitude(new Vec3(0, 0, 10), 3), 0, 0, 3);
        expectVec3Close(Vec3.ClampMagnitude(new Vec3(0, 0, 1), 3), 0, 0, 1);
    });

    test('Lerp clamps, LerpUnclamped extrapolates', () => {
        expectVec3Close(
            Vec3.Lerp(new Vec3(0, 0, 0), new Vec3(10, 10, 10), 0.25),
            2.5, 2.5, 2.5
        );
        expectVec3Close(
            Vec3.LerpUnclamped(new Vec3(0, 0, 0), new Vec3(10, 10, 10), 2),
            20, 20, 20
        );
    });

    test('Slerp interpolates along the arc', () => {
        const a = new Vec3(1, 0, 0);
        const b = new Vec3(0, 1, 0);
        expectVec3Close(Vec3.Slerp(a, b, 0), 1, 0, 0);
        expectVec3Close(Vec3.Slerp(a, b, 1), 0, 1, 0);
        expectVec3Close(Vec3.Slerp(a, b, 0.5), Math.SQRT1_2, Math.SQRT1_2, 0);
        // Unclamped t=2 keeps walking the great circle: 180 degrees from a.
        expectVec3Close(Vec3.SlerpUnclamped(a, b, 2), -1, 0, 0);
    });

    test('MoveTowards steps and snaps', () => {
        expectVec3Close(
            Vec3.MoveTowards(new Vec3(0, 0, 0), new Vec3(10, 0, 0), 3),
            3, 0, 0
        );
        expectVec3Close(
            Vec3.MoveTowards(new Vec3(0, 0, 0), new Vec3(10, 0, 0), 100),
            10, 0, 0
        );
    });

    test('SmoothDamp moves towards the target without touching inputs', () => {
        const target = new Vec3(10, 0, 0);
        const velocity = new Vec3(0, 0, 0);
        const { value: out, velocity: vel } = Vec3.SmoothDamp(
            new Vec3(0, 0, 0),
            target,
            velocity,
            0.3,
            Infinity,
            1 / 60
        );
        expect(out.x).toBeGreaterThan(0);
        expect(out.x).toBeLessThan(10);
        expect(vel.x).toBeGreaterThan(0);
        expectVec3Close(target, 10, 0, 0);
        expectVec3Close(velocity, 0, 0, 0);
    });

    test('SmoothDamp clamps overshoot and zeroes velocity', () => {
        const { value: out, velocity: vel } = Vec3.SmoothDamp(
            new Vec3(0, 0, 0),
            new Vec3(10, 0, 0),
            new Vec3(1000, 0, 0),
            0.3,
            Infinity,
            1 / 60
        );
        expect(out.x).toBe(10);
        expect(vel.x).toBe(0);
    });

    test('instance Scale writes back', () => {
        const v = new Vec3(1, 2, 3);
        v.Scale(new Vec3(2, 3, 4));
        expectVec3Close(v, 2, 6, 12);
    });

    test('MultiplyWithVector matches Scale', () => {
        expectVec3Close(
            Vec3.MultiplyWithVector(new Vec3(1, 2, 3), new Vec3(4, 5, 6)),
            4, 10, 18
        );
    });

    test('toVec2 / toVec4 conversions', () => {
        const v2 = Vec3.toVec2(new Vec3(1, 2, 3));
        expect(v2.x).toBe(1);
        expect(v2.y).toBe(2);
        const v4 = Vec3.toVec4(new Vec3(1, 2, 3));
        expect(v4.x).toBe(1);
        expect(v4.z).toBe(3);
        expect(v4.w).toBe(0);
    });

    test('Set, copy, clone and predicates', () => {
        const v = new Vec3();
        v.Set(1, 2, 3);
        expectVec3Close(v, 1, 2, 3);

        const c = v.clone();
        c.x = 99;
        expect(v.x).toBe(1);

        const d = new Vec3();
        d.copy(v);
        expect(d.almostEquals(v)).toBe(true);
        expect(new Vec3().almostZero()).toBe(true);
        expect(v.isZero()).toBe(false);

        expect(v.toArray()).toEqual([1, 2, 3]);
        expect(v.toString()).toBe('1,2,3');
    });
});

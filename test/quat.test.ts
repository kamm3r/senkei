import { describe, expect, test } from 'vitest';
import { Quaternion } from '../src/Quat';
import { Vec3 } from '../src/Vec3';
import { expectQuatClose, expectVec3Close } from './helpers';

const SQRT_HALF = Math.SQRT1_2; // sin/cos 45 degrees

describe('Quaternion', () => {
    test('create, no values given defaults to identity', () => {
        const v = new Quaternion();
        expectQuatClose(v, 0, 0, 0, 1);
    });

    test('create, values given', () => {
        const v = new Quaternion(1, 2, 3, 1);
        expectQuatClose(v, 1, 2, 3, 1);
    });

    test('identity constant', () => {
        expectQuatClose(Quaternion.identity, 0, 0, 0, 1);
    });

    test('Normalize returns unit quaternion', () => {
        expectQuatClose(
            Quaternion.Normalize(new Quaternion(3, 1, 2, 1)),
            0.7746, 0.2582, 0.5164, 0.2582
        );
    });

    test('instance Normalize writes back', () => {
        const q = new Quaternion(3, 1, 2, 1);
        q.Normalize();
        expectQuatClose(q, 0.7746, 0.2582, 0.5164, 0.2582);
    });

    test('Inverse conjugates over the squared magnitude', () => {
        // |q|^2 = 9 + 1 + 4 + 1 = 15, w keeps its sign.
        expectQuatClose(
            Quaternion.Inverse(new Quaternion(3, 1, 2, 1)),
            -0.2, -0.0667, -0.1333, 0.0667
        );
    });

    test('Inverse does not modify its input', () => {
        const q = new Quaternion(3, 1, 2, 1);
        Quaternion.Inverse(q);
        expectQuatClose(q, 3, 1, 2, 1);
    });

    test('q * Inverse(q) is identity for unit quaternions', () => {
        const q = Quaternion.AngleAxis(90, new Vec3(0, 1, 0));
        expectQuatClose(Quaternion.mult(q, Quaternion.Inverse(q)), 0, 0, 0, 1);
    });

    test('mult with identity is a no-op', () => {
        const q = new Quaternion(1, 2, 3, 4);
        expectQuatClose(Quaternion.mult(Quaternion.identity, q), 1, 2, 3, 4);
        expectQuatClose(Quaternion.mult(q, Quaternion.identity), 1, 2, 3, 4);
    });

    test('AngleAxis takes degrees and leaves the axis alone', () => {
        const axis = new Vec3(0, 1, 0);
        const q = Quaternion.AngleAxis(90, axis);
        expectQuatClose(q, 0, SQRT_HALF, 0, SQRT_HALF);
        expectVec3Close(axis, 0, 1, 0);

        // +90 degrees about +Y sends +X to -Z.
        expectVec3Close(
            Quaternion.multiplyWithVec3(q, new Vec3(1, 0, 0)),
            0, 0, -1
        );
    });

    test('Euler round-trips through eulerAngles away from the poles', () => {
        const q = Quaternion.Euler(new Vec3(10, 20, 30));
        expectVec3Close(q.eulerAngles, 10, 20, 30);
        expectVec3Close(Quaternion.identity.eulerAngles, 0, 0, 0);
    });

    test('Euler 90-degree pitch maps +Z to +X', () => {
        const q = Quaternion.Euler(new Vec3(0, 90, 0));
        expectQuatClose(q, 0, SQRT_HALF, 0, SQRT_HALF);
        // At pitch +/-90 roll and yaw are ambiguous (gimbal lock), so only
        // the mapped direction is asserted, like Unity's eulerAngles.
        expectVec3Close(
            Quaternion.multiplyWithVec3(q, new Vec3(0, 0, 1)),
            1, 0, 0
        );
    });

    test('eulerAngles setter assigns', () => {
        const q = new Quaternion();
        q.eulerAngles = new Vec3(0, 90, 0);
        expectVec3Close(
            Quaternion.multiplyWithVec3(q, new Vec3(0, 0, 1)),
            1, 0, 0
        );
    });

    test('Dot and Angle', () => {
        expect(
            Quaternion.Dot(Quaternion.identity, Quaternion.identity)
        ).toBe(1);
        expect(
            Quaternion.Angle(
                Quaternion.identity,
                Quaternion.AngleAxis(90, new Vec3(0, 1, 0))
            )
        ).toBeCloseTo(90, 4);
        expect(Quaternion.Angle(Quaternion.identity, Quaternion.identity)).toBe(0);
    });

    test('Slerp endpoints, midpoint and input purity', () => {
        const a = Quaternion.identity;
        const b = Quaternion.AngleAxis(90, new Vec3(0, 1, 0));
        expectQuatClose(Quaternion.Slerp(a, b, 0), 0, 0, 0, 1);
        expectQuatClose(Quaternion.Slerp(a, b, 1), 0, SQRT_HALF, 0, SQRT_HALF);
        // Halfway is a 45 degree turn: sin/cos of 22.5 degrees.
        expectQuatClose(
            Quaternion.Slerp(a, b, 0.5),
            0, 0.3827, 0, 0.9239
        );
        // Clamped: t=2 behaves like t=1.
        expectQuatClose(
            Quaternion.Slerp(a, b, 2),
            0, SQRT_HALF, 0, SQRT_HALF
        );
        // Inputs are untouched (no sign-flip aliasing).
        expectQuatClose(a, 0, 0, 0, 1);
        expectQuatClose(b, 0, SQRT_HALF, 0, SQRT_HALF);
    });

    test('SlerpUnclamped extrapolates past b', () => {
        const a = Quaternion.identity;
        const b = Quaternion.AngleAxis(90, new Vec3(0, 1, 0));
        // t=2 walks twice the arc: a 180 degree turn about Y.
        expectQuatClose(Quaternion.SlerpUnclamped(a, b, 2), 0, 1, 0, 0);
    });

    test('FromToRotation maps one direction to another', () => {
        const q = Quaternion.FromToRotation(new Vec3(0, 1, 0), new Vec3(0, 0, 1));
        expectVec3Close(
            Quaternion.multiplyWithVec3(q, new Vec3(0, 1, 0)),
            0, 0, 1
        );
    });

    test('FromToRotation handles opposite vectors', () => {
        const q = Quaternion.FromToRotation(new Vec3(1, 0, 0), new Vec3(-1, 0, 0));
        expectVec3Close(
            Quaternion.multiplyWithVec3(q, new Vec3(1, 0, 0)),
            -1, 0, 0
        );
    });

    test('LookRotation points +Z at forward', () => {
        const q = Quaternion.LookRotation(new Vec3(0, 0, 1));
        expectQuatClose(q, 0, 0, 0, 1);

        const q2 = Quaternion.LookRotation(new Vec3(1, 0, 0));
        expectVec3Close(
            Quaternion.multiplyWithVec3(q2, Vec3.forward),
            1, 0, 0
        );
        expectVec3Close(
            Quaternion.multiplyWithVec3(q2, Vec3.up),
            0, 1, 0
        );
    });

    test('RotateTowards is capped by maxDegreesDelta', () => {
        const from = Quaternion.identity;
        // 170 degrees (exact 180 is an ambiguous antipode for any slerp).
        const to = Quaternion.AngleAxis(170, new Vec3(0, 1, 0));
        const capped = Quaternion.RotateTowards(from, to, 90);
        expect(Quaternion.Angle(from, capped)).toBeCloseTo(90, 3);
        expect(Quaternion.Angle(capped, to)).toBeCloseTo(80, 3);
        const full = Quaternion.RotateTowards(from, to, 999);
        expect(Math.abs(Quaternion.Dot(full, to))).toBeCloseTo(1, 4);
    });

    test('Lerp clamps, LerpUnclamped does not', () => {
        const a = Quaternion.identity;
        const b = new Quaternion(0, 0, 0, 0);
        expectQuatClose(Quaternion.Lerp(a, b, 0.5), 0, 0, 0, 0.5);
        expectQuatClose(Quaternion.Lerp(a, b, 2), 0, 0, 0, 0);
        expectQuatClose(Quaternion.LerpUnclamped(a, b, 2), 0, 0, 0, -1);
    });

    test('Nlerp normalizes the blend', () => {
        const out = Quaternion.Nlerp(
            Quaternion.identity,
            Quaternion.AngleAxis(90, new Vec3(0, 1, 0)),
            0.5
        );
        const len = Math.sqrt(
            out.x * out.x + out.y * out.y + out.z * out.z + out.w * out.w
        );
        expect(len).toBeCloseTo(1, 6);
    });

    test('Set, copy, clone and toArray', () => {
        const q = new Quaternion();
        q.Set(1, 2, 3, 4);
        expectQuatClose(q, 1, 2, 3, 4);

        const c = q.clone();
        c.w = 99;
        expect(q.w).toBe(4);

        const d = new Quaternion();
        d.copy(q);
        expectQuatClose(d, 1, 2, 3, 4);
        expect(d.toArray()).toEqual([1, 2, 3, 4]);
        expect(d.toString()).toBe('1,2,3,4');
    });
});

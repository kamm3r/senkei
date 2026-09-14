import { describe, expect, test } from 'vitest';
import { Vec4 } from '../src/Vec4';
import { Vec2 } from '../src/Vec2';
import { Vec3 } from '../src/Vec3';
import { expectVec4Close } from './helpers';

describe('Vec4', () => {
    test('create, no values given', () => {
        const v = new Vec4();
        expect(v.x).toBe(0);
        expect(v.y).toBe(0);
        expect(v.z).toBe(0);
        expect(v.w).toBe(0);
    });

    test('create, values given', () => {
        const v = new Vec4(1, 2, 3, 4);
        expect(v.x).toBe(1);
        expect(v.y).toBe(2);
        expect(v.z).toBe(3);
        expect(v.w).toBe(4);
    });

    test('static constants', () => {
        expectVec4Close(Vec4.zero, 0, 0, 0, 0);
        expectVec4Close(Vec4.one, 1, 1, 1, 1);
    });

    test('add, sub and scalar ops', () => {
        expectVec4Close(
            Vec4.add(new Vec4(1, 2, 3, 4), new Vec4(5, 6, 7, 8)),
            6, 8, 10, 12
        );
        expectVec4Close(
            Vec4.sub(new Vec4(1, 2, 3, 4), new Vec4(5, 6, 7, 8)),
            -4, -4, -4, -4
        );
        expectVec4Close(Vec4.mult(new Vec4(1, 2, 3, 4), 2), 2, 4, 6, 8);
        expectVec4Close(Vec4.div(new Vec4(2, 4, 6, 8), 2), 1, 2, 3, 4);
        expectVec4Close(
            Vec4.MultiplyWithVector(new Vec4(1, 2, 3, 4), new Vec4(2, 2, 2, 2)),
            2, 4, 6, 8
        );
        expectVec4Close(Vec4.negate(new Vec4(1, -2, 3, -4)), -1, 2, -3, 4);
    });

    test('Min, Max and Scale', () => {
        expectVec4Close(
            Vec4.Min(new Vec4(6, 5, 8, 0), new Vec4(5, 7, 1, 9)),
            5, 5, 1, 0
        );
        expectVec4Close(
            Vec4.Max(new Vec4(6, 5, 8, 0), new Vec4(5, 7, 1, 9)),
            6, 7, 8, 9
        );
        expectVec4Close(
            Vec4.Scale(new Vec4(1, 2, 3, 4), new Vec4(2, 2, 2, 2)),
            2, 4, 6, 8
        );
        const v = new Vec4(1, 2, 3, 4);
        v.Scale(new Vec4(2, 2, 2, 2));
        expectVec4Close(v, 2, 4, 6, 8);
    });

    test('magnitude includes w', () => {
        expect(new Vec4(1, 2, 2, 4).magnitude).toBe(5);
        expect(new Vec4(1, 2, 2, 4).sqrMagnitude).toBe(25);
        expect(Vec4.Magnitude(new Vec4(1, 2, 2, 4))).toBe(5);
        expect(Vec4.SqrMagnitude(new Vec4(1, 2, 2, 4))).toBe(25);
    });

    test('Normalize divides by the full length', () => {
        expectVec4Close(Vec4.Normalize(new Vec4(3, 1, 2, 4)), 0.5477, 0.1826, 0.3651, 0.7303);
        expectVec4Close(new Vec4(3, 1, 2, 4).normalized, 0.5477, 0.1826, 0.3651, 0.7303);
        const v = new Vec4(3, 1, 2, 4);
        v.Normalize();
        expectVec4Close(v, 0.5477, 0.1826, 0.3651, 0.7303);
    });

    test('Dot, Distance and SqrDistance use all components', () => {
        expect(Vec4.Dot(new Vec4(1, 2, 3, 4), new Vec4(5, 6, 7, 8))).toBe(70);
        expect(Vec4.Distance(new Vec4(2, 3, 0, 2), new Vec4(5, 7, 0, 2))).toBe(5);
        expect(Vec4.Distance(new Vec4(0, 0, 0, 0), new Vec4(0, 0, 0, 5))).toBe(5);
        expect(Vec4.SqrDistance(new Vec4(0, 0, 0, 0), new Vec4(0, 0, 0, 5))).toBe(25);
    });

    test('Project onto another vector', () => {
        expectVec4Close(
            Vec4.Project(new Vec4(2, 5, 0, 0), new Vec4(1, 0, 0, 0)),
            2, 0, 0, 0
        );
    });

    test('Lerp clamps, LerpUnclamped extrapolates every component', () => {
        expectVec4Close(
            Vec4.Lerp(new Vec4(0, 0, 0, 0), new Vec4(4, 4, 4, 4), 0.5),
            2, 2, 2, 2
        );
        expectVec4Close(
            Vec4.LerpUnclamped(new Vec4(0, 0, 0, 0), new Vec4(4, 4, 4, 4), 2),
            8, 8, 8, 8
        );
    });

    test('MoveTowards steps and snaps', () => {
        expectVec4Close(
            Vec4.MoveTowards(new Vec4(0, 0, 0, 0), new Vec4(10, 0, 0, 0), 3),
            3, 0, 0, 0
        );
        expectVec4Close(
            Vec4.MoveTowards(new Vec4(0, 0, 0, 0), new Vec4(10, 0, 0, 0), 100),
            10, 0, 0, 0
        );
    });

    test('MultiplyWithVector matches Scale, Clamp works', () => {
        expectVec4Close(
            Vec4.MultiplyWithVector(new Vec4(1, 2, 3, 4), new Vec4(2, 2, 2, 2)),
            2, 4, 6, 8
        );
        expectVec4Close(
            Vec4.Clamp(
                new Vec4(5, -1, 0.5, 2),
                new Vec4(0, 0, 0, 0),
                new Vec4(1, 1, 1, 1)
            ),
            1, 0, 0.5, 1
        );
    });

    test('Set, copy and clone', () => {
        const v = new Vec4();
        v.Set(1, 2, 3, 4);
        expectVec4Close(v, 1, 2, 3, 4);

        const c = v.clone();
        c.w = 99;
        expect(v.w).toBe(4);

        const d = new Vec4();
        d.copy(v);
        expectVec4Close(d, 1, 2, 3, 4);
    });

    test('dimension conversions', () => {
        expectVec4Close(Vec4.Vec3toVec4(new Vec3(1, 2, 3)), 1, 2, 3, 0);
        expectVec4Close(Vec4.Vec2toVec4(new Vec2(1, 2)), 1, 2, 0, 0);
        const v3 = Vec4.toVec3(new Vec4(1, 2, 3, 4));
        expect(v3.x).toBe(1);
        expect(v3.z).toBe(3);
        const v2 = Vec4.toVec2(new Vec4(1, 2, 3, 4));
        expect(v2.x).toBe(1);
        expect(v2.y).toBe(2);
    });
});

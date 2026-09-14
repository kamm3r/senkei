import { describe, expect, test } from 'vitest';
import { Mat4 } from '../src/Mat4';
import { Vec4 } from '../src/Vec4';
import { Vec3 } from '../src/Vec3';
import { Quaternion } from '../src/Quat';
import { expectVec3Close } from './helpers';

function roundTo(value: number, decimal: number): number {
    return parseFloat(value.toFixed(decimal));
}

describe('Mat4', () => {
    test('new 4x4 matrix from columns', () => {
        const mat = new Mat4(
            new Vec4(1, 0, 0, 0),
            new Vec4(0, 1, 0, 0),
            new Vec4(0, 0, 1, 0),
            new Vec4(0, 0, 0, 1)
        );
        expect(mat.m00).toBe(1);
        expect(mat.m10).toBe(0);
        expect(mat.m20).toBe(0);
        expect(mat.m30).toBe(0);

        expect(mat.m01).toBe(0);
        expect(mat.m11).toBe(1);
        expect(mat.m21).toBe(0);
        expect(mat.m31).toBe(0);

        expect(mat.m02).toBe(0);
        expect(mat.m12).toBe(0);
        expect(mat.m22).toBe(1);
        expect(mat.m32).toBe(0);

        expect(mat.m03).toBe(0);
        expect(mat.m13).toBe(0);
        expect(mat.m23).toBe(0);
        expect(mat.m33).toBe(1);
    });

    test('identity and zero', () => {
        expect(Mat4.identity.GetRow(0)).toEqual(new Vec4(1, 0, 0, 0));
        expect(Mat4.zero.GetRow(3)).toEqual(new Vec4(0, 0, 0, 0));
    });

    test('matrix multiplication', () => {
        const mat1 = new Mat4(
            new Vec4(1, 2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(9, 10, 11, 12),
            new Vec4(13, 14, 15, 16)
        );
        const mat2 = new Mat4(
            new Vec4(1, 2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(9, 10, 11, 12),
            new Vec4(13, 14, 15, 16)
        );
        const mat3 = Mat4.Multiply(mat1, mat2);
        expect(mat3.m00).toBe(90);
        expect(mat3.m10).toBe(100);
        expect(mat3.m20).toBe(110);
        expect(mat3.m30).toBe(120);
        expect(mat3.m01).toBe(202);
        expect(mat3.m11).toBe(228);
        expect(mat3.m21).toBe(254);
        expect(mat3.m31).toBe(280);
        expect(mat3.m02).toBe(314);
        expect(mat3.m12).toBe(356);
        expect(mat3.m22).toBe(398);
        expect(mat3.m32).toBe(440);
        expect(mat3.m03).toBe(426);
        expect(mat3.m13).toBe(484);
        expect(mat3.m23).toBe(542);
        expect(mat3.m33).toBe(600);
    });

    test('mult by identity is a no-op', () => {
        const mat = Mat4.Translate(new Vec3(1, 2, 3));
        const out = Mat4.Multiply(mat, Mat4.identity);
        expectVec3Close(out.GetPosition(), 1, 2, 3);
        expect(out.m33).toBe(1);
    });

    test('inverse of identity matrix', () => {
        const inv = Mat4.identity.inverse;
        expect(inv.m00).toBe(1);
        expect(inv.m11).toBe(1);
        expect(inv.m22).toBe(1);
        expect(inv.m33).toBe(1);
        expect(inv.m03).toBe(0);
        expect(inv.m30).toBe(0);
    });

    test('inverse of matrix', () => {
        const mat = new Mat4(
            new Vec4(-1, -2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(-9, -10, 11, 12),
            new Vec4(13, 14, -15, 16)
        );
        const inv = mat.inverse;
        expect(roundTo(inv.m00, 4)).toBe(1.2277);
        expect(roundTo(inv.m10, 4)).toBe(-0.0714);
        expect(roundTo(inv.m20, 4)).toBe(-0.3259);
        expect(roundTo(inv.m30, 4)).toBe(-0.0268);
        expect(roundTo(inv.m01, 4)).toBe(-1.0647);
        expect(roundTo(inv.m11, 4)).toBe(0.1429);
        expect(roundTo(inv.m21, 4)).toBe(0.2299);
        expect(roundTo(inv.m31, 4)).toBe(0.0223);
        expect(roundTo(inv.m02, 4)).toBe(0.0536);
        expect(roundTo(inv.m12, 4)).toBe(0.0714);
        expect(roundTo(inv.m22, 4)).toBe(-0.0179);
        expect(roundTo(inv.m32, 4)).toBe(-0.0357);
        expect(roundTo(inv.m03, 4)).toBe(-0.0156);
        expect(roundTo(inv.m13, 4)).toBe(0);
        expect(roundTo(inv.m23, 4)).toBe(0.0469);
        expect(roundTo(inv.m33, 4)).toBe(0.0313);
    });

    test('inverse of a singular matrix throws instead of NaN', () => {
        expect(() => Mat4.zero.inverse).toThrow();
        expect(() => Mat4.Scale(new Vec3(0, 0, 0)).inverse).toThrow();
    });

    test('matrix times its inverse is identity', () => {        const mat = Mat4.TRS(
            new Vec3(20, 1, 5),
            Quaternion.Euler(new Vec3(10, 20, 30)),
            new Vec3(2, 2, 2)
        );
        const out = Mat4.Multiply(mat, mat.inverse);
        expect(roundTo(out.m00, 3)).toBe(1);
        expect(roundTo(out.m11, 3)).toBe(1);
        expect(roundTo(out.m22, 3)).toBe(1);
        expect(roundTo(out.m33, 3)).toBe(1);
        expect(roundTo(out.m03, 3)).toBe(0);
        expect(roundTo(out.m10, 3)).toBe(0);
    });

    test('transpose swaps rows and columns', () => {
        const mat = new Mat4(
            new Vec4(1, 2, 3, 4),
            new Vec4(5, 6, 7, 8),
            new Vec4(9, 10, 11, 12),
            new Vec4(13, 14, 15, 16)
        );
        const trans = mat.transpose;
        expect(trans.m00).toBe(1);
        expect(trans.m10).toBe(5);
        expect(trans.m20).toBe(9);
        expect(trans.m30).toBe(13);
        expect(trans.m01).toBe(2);
        expect(trans.m11).toBe(6);
        expect(trans.m21).toBe(10);
        expect(trans.m31).toBe(14);
        expect(trans.m02).toBe(3);
        expect(trans.m12).toBe(7);
        expect(trans.m22).toBe(11);
        expect(trans.m32).toBe(15);
        expect(trans.m03).toBe(4);
        expect(trans.m13).toBe(8);
        expect(trans.m23).toBe(12);
        expect(trans.m33).toBe(16);
    });

    test('translate stores translation in the last column', () => {
        const mat = Mat4.Translate(new Vec3(20, 1, 5));
        expect(mat.m00).toBe(1);
        expect(mat.m11).toBe(1);
        expect(mat.m22).toBe(1);
        expect(mat.m33).toBe(1);
        expect(mat.m03).toBe(20);
        expect(mat.m13).toBe(1);
        expect(mat.m23).toBe(5);
        expect(mat.m30).toBe(0);
        expect(mat.m31).toBe(0);
        expect(mat.m32).toBe(0);
        expectVec3Close(mat.GetPosition(), 20, 1, 5);
        expectVec3Close(mat.MultiplyPoint3x4(new Vec3(0, 0, 0)), 20, 1, 5);
    });

    test('rotate Quaternion{3, 5, 7, 1} normalized', () => {
        const mat = Mat4.Rotate(new Quaternion(3, 5, 7, 1).normalized);
        expect(roundTo(mat.m00, 2)).toBe(-0.76);
        expect(roundTo(mat.m10, 2)).toBe(0.52);
        expect(roundTo(mat.m20, 2)).toBe(0.38);
        expect(roundTo(mat.m30, 2)).toBe(0);
        expect(roundTo(mat.m01, 2)).toBe(0.19);
        expect(roundTo(mat.m11, 2)).toBe(-0.38);
        expect(roundTo(mat.m21, 2)).toBe(0.9);
        expect(roundTo(mat.m31, 2)).toBe(0);
        expect(roundTo(mat.m02, 2)).toBe(0.62);
        expect(roundTo(mat.m12, 2)).toBe(0.76);
        expect(roundTo(mat.m22, 2)).toBe(0.19);
        expect(roundTo(mat.m32, 2)).toBe(0);
        expect(roundTo(mat.m03, 2)).toBe(0);
        expect(roundTo(mat.m13, 2)).toBe(0);
        expect(roundTo(mat.m23, 2)).toBe(0);
        expect(roundTo(mat.m33, 2)).toBe(1);
    });

    test('rotate identity is identity', () => {
        const mat = Mat4.Rotate(Quaternion.identity);
        expect(mat.m00).toBe(1);
        expect(mat.m11).toBe(1);
        expect(mat.m22).toBe(1);
        expect(mat.m33).toBe(1);
        expect(mat.m01).toBe(0);
        expect(mat.m10).toBe(0);
    });

    test('rotation round-trips through quaternion', () => {
        const q = Quaternion.Euler(new Vec3(10, 20, 30));
        const back = Mat4.Rotate(q).rotation;
        expect(Math.abs(Quaternion.Dot(q, back))).toBeCloseTo(1, 4);
    });

    test('scale Vec3{2, 2, 2}', () => {
        const mat = Mat4.Scale(new Vec3(2, 2, 2));
        expect(mat.m00).toBe(2);
        expect(mat.m10).toBe(0);
        expect(mat.m20).toBe(0);
        expect(mat.m30).toBe(0);
        expect(mat.m01).toBe(0);
        expect(mat.m11).toBe(2);
        expect(mat.m21).toBe(0);
        expect(mat.m31).toBe(0);
        expect(mat.m02).toBe(0);
        expect(mat.m12).toBe(0);
        expect(mat.m22).toBe(2);
        expect(mat.m32).toBe(0);
        expect(mat.m03).toBe(0);
        expect(mat.m13).toBe(0);
        expect(mat.m23).toBe(0);
        expect(mat.m33).toBe(1);
    });

    test('TRS composes translation, rotation and scale', () => {
        const mat = Mat4.TRS(
            new Vec3(20, 1, 5),
            Quaternion.AngleAxis(90, new Vec3(0, 1, 0)),
            new Vec3(1, 1, 1)
        );
        // Translation lands in the last column untouched by rotation.
        expectVec3Close(mat.GetPosition(), 20, 1, 5);
        // +X rotated 90 degrees about Y is -Z, then translated.
        expectVec3Close(mat.MultiplyPoint3x4(new Vec3(1, 0, 0)), 20, 1, 4);
        // Rotation extracts back out.
        const back = mat.rotation;
        expect(Math.abs(Quaternion.Dot(back, Quaternion.AngleAxis(90, new Vec3(0, 1, 0))))).toBeCloseTo(1, 4);
    });

    test('TRS applies scale before rotation', () => {
        const mat = Mat4.TRS(
            new Vec3(0, 0, 0),
            Quaternion.identity,
            new Vec3(2, 2, 2)
        );
        expectVec3Close(mat.MultiplyPoint3x4(new Vec3(1, 1, 1)), 2, 2, 2);
    });

    test('SetTRS writes the matrix in place', () => {
        const mat = Mat4.identity;
        mat.SetTRS(new Vec3(20, 1, 5), Quaternion.identity, new Vec3(1, 1, 1));
        expectVec3Close(mat.GetPosition(), 20, 1, 5);
        expectVec3Close(mat.MultiplyPoint3x4(new Vec3(1, 0, 0)), 21, 1, 5);
    });

    test('Get/SetColumn and Get/SetRow', () => {
        const mat = Mat4.identity;
        mat.SetColumn(3, new Vec4(7, 8, 9, 1));
        expectVec3Close(mat.GetPosition(), 7, 8, 9);
        expect(mat.GetColumn(3)).toEqual(new Vec4(7, 8, 9, 1));

        mat.SetRow(0, new Vec4(1, 2, 3, 4));
        expect(mat.GetRow(0)).toEqual(new Vec4(1, 2, 3, 4));

        expect(() => mat.GetColumn(4)).toThrow();
        expect(() => mat.GetRow(-1)).toThrow();
        expect(() => mat.SetColumn(4, new Vec4())).toThrow();
    });

    test('multiplyPoint, multiplyPoint3x4 and multiplyVector', () => {
        const mat = Mat4.Translate(new Vec3(10, 0, 0));
        expectVec3Close(mat.MultiplyPoint3x4(new Vec3(1, 2, 3)), 11, 2, 3);
        expectVec3Close(mat.MultiplyPoint(new Vec3(1, 2, 3)), 11, 2, 3);
        // Directions ignore translation.
        expectVec3Close(mat.MultiplyVector(new Vec3(1, 2, 3)), 1, 2, 3);
        const v4 = Mat4.Multiply(mat, new Vec4(1, 2, 3, 0));
        expect(v4.x).toBeCloseTo(1, 4);
        expect(v4.y).toBeCloseTo(2, 4);
        expect(v4.z).toBeCloseTo(3, 4);
    });

    test('lookAt builds a view matrix', () => {
        const eye = new Vec3(0, 0, 5);
        const mat = Mat4.LookAt(eye, new Vec3(0, 0, 0), new Vec3(0, 1, 0));
        // The eye maps to the origin.
        expectVec3Close(mat.MultiplyPoint3x4(eye), 0, 0, 0);
        // The looked-at origin sits 5 units down -Z in view space.
        expectVec3Close(mat.MultiplyPoint3x4(new Vec3(0, 0, 0)), 0, 0, -5);
        expectVec3Close(mat.GetPosition(), 0, 0, -5);
    });

    test('ortho maps the box corners', () => {
        const mat = Mat4.Ortho(-1, 1, -1, 1, 0.1, 100);
        expect(mat.m00).toBe(1);
        expect(mat.m11).toBe(1);
        expect(mat.m22).toBeCloseTo(-2 / 99.9, 6);
        expect(mat.m33).toBe(1);
    });

    test('frustum perspective divide sign', () => {
        const mat = Mat4.Frustum(-1, 1, -1, 1, 1, 10);
        expect(mat.m00).toBe(1);
        expect(mat.m11).toBe(1);
        expect(mat.m22).toBeCloseTo(-11 / 9, 6);
        expect(mat.m23).toBe(-1);
        expect(mat.m32).toBeCloseTo(-20 / 9, 6);
    });

    test('perspective with a 90 degree vertical fov', () => {
        const mat = Mat4.Perspective(Math.PI / 2, 1, 1, 10);
        expect(mat.m00).toBeCloseTo(1, 6);
        expect(mat.m11).toBeCloseTo(1, 6);
        expect(mat.m22).toBeCloseTo(-11 / 9, 6);
        expect(mat.m23).toBe(-1);
    });
});

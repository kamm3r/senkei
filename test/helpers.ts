import { expect } from 'vitest';
import type { Vec2 } from '../src/Vec2';
import type { Vec3 } from '../src/Vec3';
import type { Vec4 } from '../src/Vec4';
import type { Quaternion } from '../src/Quat';

export function expectVec2Close(
    v: Vec2,
    x: number,
    y: number,
    precision = 4
): void {
    expect(v.x).toBeCloseTo(x, precision);
    expect(v.y).toBeCloseTo(y, precision);
}

export function expectVec3Close(
    v: Vec3,
    x: number,
    y: number,
    z: number,
    precision = 4
): void {
    expect(v.x).toBeCloseTo(x, precision);
    expect(v.y).toBeCloseTo(y, precision);
    expect(v.z).toBeCloseTo(z, precision);
}

export function expectVec4Close(
    v: Vec4,
    x: number,
    y: number,
    z: number,
    w: number,
    precision = 4
): void {
    expect(v.x).toBeCloseTo(x, precision);
    expect(v.y).toBeCloseTo(y, precision);
    expect(v.z).toBeCloseTo(z, precision);
    expect(v.w).toBeCloseTo(w, precision);
}

export function expectQuatClose(
    q: Quaternion,
    x: number,
    y: number,
    z: number,
    w: number,
    precision = 4
): void {
    expect(q.x).toBeCloseTo(x, precision);
    expect(q.y).toBeCloseTo(y, precision);
    expect(q.z).toBeCloseTo(z, precision);
    expect(q.w).toBeCloseTo(w, precision);
}

import *as vec3 from "./vec3"
import { Vec3 } from "./types"
import { EPSILON, kEpsilon } from "./utils/floatingPoints"

type Quat = Float32Array

export const create = (x = 0, y = 0, z = 0, w = 0): Quat => new Float32Array([x, y, z, w])
export const identityQuaternion = (): Quat => create(0, 0, 0, 1)
// Combines rotations /lhs/ and /rhs/
export const multiply = (lhs: Quat, rhs: Quat): Quat => new Float32Array([
    lhs[3] * rhs[0] + lhs[0] * rhs[3] + lhs[1] * rhs[2] - lhs[2] * rhs[1],
    lhs[3] * rhs[1] + lhs[1] * rhs[3] + lhs[2] * rhs[0] - lhs[0] * rhs[2],
    lhs[3] * rhs[2] + lhs[2] * rhs[3] + lhs[0] * rhs[1] - lhs[1] * rhs[0],
    lhs[3] * rhs[3] - lhs[0] * rhs[0] - lhs[1] * rhs[1] - lhs[2] * rhs[2]])
// Rotates the point /point/ with /rotation/.
export const multiplyfromvec3 = (rotation: Quat, point: vec3.vec3): vec3.vec3 => {
    const x = rotation[0] * 2
    const y = rotation[1] * 2
    const z = rotation[2] * 2
    const xx = rotation[0] * x;
    const yy = rotation[1] * y;
    const zz = rotation[2] * z;
    const xy = rotation[0] * y;
    const xz = rotation[0] * z;
    const yz = rotation[1] * z;
    const wx = rotation[3] * x;
    const wy = rotation[3] * y;
    const wz = rotation[3] * z;

    let res = vec3.creates()
    res[0] = (1 - (yy + zz)) * point[0] + (xy - wz) * point[1] + (xz + wy) * point[2];
    res[1] = (xy + wz) * point[0] + (1 - (xx + zz)) * point[1] + (yz - wx) * point[2];
    res[2] = (xz - wy) * point[0] + (yz + wx) * point[1] + (1 - (xx + yy)) * point[2];
    return res;
}
// Is the dot product of two quaternions within tolerance for them to be considered equal?
export const isEqualUsingDot = (dot: number): boolean => dot > 1 - kEpsilon
// Are two quaternions equal to each other?
export const equals = (lhs: Quat, rhs: Quat): boolean => isEqualUsingDot(dot(lhs, rhs))
// Are two quaternions different from each other?
export const differentEquals = (lhs: Quat, rhs: Quat): boolean => lhs !== rhs

export const identity = (): Quat => identityQuaternion()

export const eualerAngles = (a: number, b: number, c: number): Quat => new Float32Array()
export const normalized = (q: Quat): Quat => Math.sqrt(dot(q, q)) < EPSILON ? identity() : create()
export const setFromToRotation = (a: number, b: number, c: number): Quat => new Float32Array()
export const setLookRotation = (view: Vec3): void => {
    const up = vec3.up

}
export const toAngleAxis = (a: number, v: Vec3): Quat => new Float32Array()
export const toString = (a: number, v: Vec3): Quat => new Float32Array()
export const angle = (a: Quat, b: Quat): number => 1
export const angleAxis = (a: number, v: Vec3): Quat => new Float32Array()
export const dot = (a: Quat, b: Quat): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
export const eualer = (a: number, b: number, c: number): Quat => new Float32Array()
export const fromToRotation = (a: number, b: number, c: number): Quat => new Float32Array()
export const inverse = (a: number): Quat => new Float32Array()
export const lerp = (a: number): Quat => new Float32Array()
export const lerpUnclamped = (a: number): Quat => new Float32Array()
export const lookRotation = (a: number): Quat => new Float32Array()
export const normalize = (q: Quat): Quat => Math.sqrt(dot(q, q)) < EPSILON ? identity() : create()
export const rotateTowards = (a: number): Quat => new Float32Array()
export const slerp = (a: number): Quat => new Float32Array()
export const slerpUnclamped = (a: number): Quat => new Float32Array()
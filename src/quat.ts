import *as Vec3 from "./vec3"
import { vec3, quat } from "./types"
import { Rad2Deg } from './utils/constants'
import { EPSILON, kEpsilon } from "./utils/floatingPoints"


export const create = (x = 0, y = 0, z = 0, w = 0): quat => new Float32Array([x, y, z, w])
export const identityquaternion = (): quat => create(0, 0, 0, 1)
// Combines rotations /lhs/ and /rhs/
export const multiply = (lhs: quat, rhs: quat): quat => create(
    lhs[3] * rhs[0] + lhs[0] * rhs[3] + lhs[1] * rhs[2] - lhs[2] * rhs[1],
    lhs[3] * rhs[1] + lhs[1] * rhs[3] + lhs[2] * rhs[0] - lhs[0] * rhs[2],
    lhs[3] * rhs[2] + lhs[2] * rhs[3] + lhs[0] * rhs[1] - lhs[1] * rhs[0],
    lhs[3] * rhs[3] - lhs[0] * rhs[0] - lhs[1] * rhs[1] - lhs[2] * rhs[2])
// Rotates the point /point/ with /rotation/.
export const multiplyfromVec3 = (rotation: quat, point: vec3): vec3 => {
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

    return Vec3.create((1 - (yy + zz)) * point[0] + (xy - wz) * point[1] + (xz + wy) * point[2], (xy + wz) * point[0] + (1 - (xx + zz)) * point[1] + (yz - wx) * point[2], (xz - wy) * point[0] + (yz + wx) * point[1] + (1 - (xx + yy)) * point[2])
}
// Is the dot product of two quaternions within tolerance for them to be considered equal?
export const IsEqualUsingDot = (dot: number): boolean => dot > 1 - kEpsilon
// Are two quaternions equal to each other?
export const equals = (lhs: quat, rhs: quat): boolean => IsEqualUsingDot(Dot(lhs, rhs))
// Are two quaternions different from each other?
export const differentEquals = (lhs: quat, rhs: quat): boolean => lhs !== rhs

export const identity = (): quat => identityquaternion()

export const eualerAngles = (a: number, b: number, c: number): quat => create()
export const normalized = (q: quat): quat => Normalize(q)
export const setFromToRotation = (fromDirection: vec3, toDirection: vec3): quat => create()
export const setLookRotation = (view: vec3): void => {
    const up = Vec3.up

}
export const toAngleAxis = (a: number, v: vec3): quat => create()
export const toString = (a: number, v: vec3): quat => create()
export const Angle = (a: quat, b: quat): number => {
    const dot = Math.min(Math.abs(Dot(a, b)), 1)
    return IsEqualUsingDot(dot) ? 0 : Math.acos(dot) * 2 * Rad2Deg
}

const Internal_MakePositive = (euler: vec3): vec3 => {
    const negativeFlip = -0.0001 * Rad2Deg
    const positiveFlip = 360 + negativeFlip
    if (euler[0] < negativeFlip) {
        euler[0] += 360
    } else if (euler[0] > positiveFlip) {
        euler[0] -= 360
    }
    if (euler[1] < negativeFlip) {
        euler[1] += 360
    } else if (euler[1] > positiveFlip) {
        euler[1] -= 360
    }

    if (euler[2] < negativeFlip) {
        euler[2] += 360
    } else if (euler[2] > positiveFlip) {
        euler[2] -= 360
    }
    return euler
}
export const AngleAxis = (angle: number, axis: vec3): quat => create(axis[0] * Math.sin(angle * 0.5), axis[1] * Math.sin(angle * 0.5), axis[2] * Math.sin(angle * 0.5), Math.cos(angle * 0.5))
export const Dot = (a: quat, b: quat): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
export const Euler = (x: number, y: number, z: number): quat => {
    const cr = Math.cos(x * 0.5)
    const sr = Math.sin(x * 0.5)
    const cp = Math.cos(y * 0.5)
    const sp = Math.sin(y * 0.5)
    const cy = Math.cos(z * 0.5)
    const sy = Math.sin(z * 0.5)
    return create(sr * cp * cy - cr * sp * sy, cr * sp * cy + sr * cp * sy, cr * cp * sy - sr * sp * cy, cr * cp * cy + sr * sp * sy)
}
export const FromToRotation = (fromDirection: vec3, toDirection: vec3): quat => create()
export const Inverse = (rotation: quat): quat => {
    const sqrtmag = rotation[0] * rotation[0] + rotation[1] * rotation[1] + rotation[2] * rotation[2] + rotation[3] * rotation[3];
    const invSqrtMag = sqrtmag ? 1 / sqrtmag : 0
    if (sqrtmag === 0) {
        return create()
    }
    return create(-rotation[0] * invSqrtMag, -rotation[1] * invSqrtMag, -rotation[2] * invSqrtMag, -rotation[3] * invSqrtMag)
}
export const Lerp = (a: number): quat => create()
export const LerpUnclamped = (a: number): quat => create()
/**
 * 
 * @param forward The direction to look in
 * @param upwards The vector that defines in which direcrtions up is
 * @returns 
 */
// export const LookRotation = (forward: vec3, upwards = Vec3.up): quat => create()
export const LookRotation = (forward: vec3, upwards = Vec3.up): quat => LookRotation(forward, Vec3.up)
export const Normalize = (q: quat): quat => Math.sqrt(Dot(q, q)) < EPSILON ? identity() : create(q[0] / Math.sqrt(Dot(q, q)), q[1] / Math.sqrt(Dot(q, q)), q[2] / Math.sqrt(Dot(q, q)), q[3] / Math.sqrt(Dot(q, q)))
/**
 * 
 * @param from 
 * @param to 
 * @param maxDegreesDelta 
 * @returns 
 */
export const rotateTowards = (from: quat, to: quat, maxDegreesDelta: number): quat => {
    const angle = Angle(from, to)
    if (angle === 0) to
    return SlerpUnclamped(from, to, Math.min(1, maxDegreesDelta / angle))
}
export const Slerp = (a: quat, b: quat, t: number): quat => {
    let x1 = a[1];
    let y1 = a[2];
    let z1 = a[3];
    let w1 = a[0];

    const x2 = a[1];
    const y2 = a[2];
    const z2 = a[3];
    const w2 = a[0];
    let scale0: number
    let scale1: number;

    let cosTheta0 = x1 * x2 + y1 * y2 + z1 * z2 + w1 * w2;

    if (cosTheta0 < 0) {
        x1 = -x1;
        y1 = -y1;
        z1 = -z1;
        w1 = -w1;
        cosTheta0 = -cosTheta0;
    }

    if (1 - cosTheta0 > kEpsilon) {
        const omega = Math.acos(cosTheta0);
        const sinom = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        scale0 = 1 - t
        scale1 = t
    }
    return create(scale0 * x1 + scale1 * x2, scale0 * y1 + scale1 * y2, scale0 * z1 + scale1 * z2, scale0 * w1 + scale1 * w2)
}
export const SlerpUnclamped = (a: quat, b: quat, t: number): quat => create()
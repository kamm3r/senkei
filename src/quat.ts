import * as Vec3 from "./vec3"
import * as Vec4 from "./vec4"
import * as Mat4 from "./mat4"
import { vec3, quat, RotationOrder, rotationOrder, mat4, vec4 } from "./types"
import * as mathf from "./utils"


export const create = (x = 0, y = 0, z = 0, w = 0): quat => new Float32Array([x, y, z, w])
export const approximatelyEqual = (v1: vec3, v2: vec3): boolean => v1[0] == v2[0] && v1[1] == v2[1] && v1[2] == v2[2]

export const scalarAddition = (q: quat, k: number): quat => create(q[0] + k, q[1] + k, q[2] + k, q[3] + k)
export const scalarSubtraction = (q: quat, k: number): quat => create(q[0] - k, q[1] - k, q[2] - k, q[3] - k)
export const add = (q1: quat, q2: quat): quat => create(q1[0] + q2[0], q1[1] + q2[1], q1[2] + q2[2], q1[3] + q2[3])
export const subtract = (q1: quat, q2: quat): quat => create(q1[0] - q2[0], q1[1] - q2[1], q1[2] - q2[2], q1[3] - q2[3])
export const divide = (q1: quat, q2: quat): quat => create(q1[0] / q2[0], q1[1] / q2[1], q1[2] / q2[2], q1[3] / q2[3])
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
export const Scale = (q: quat, scale: number): quat => create(q[0] * scale, q[1] * scale, q[2] * scale, q[3] * scale)
// Is the dot product of two quaternions within tolerance for them to be considered equal?
export const IsEqualUsingDot = (dot: number): boolean => dot > 1 - mathf.kEpsilon
// Are two quaternions equal to each other?
export const equals = (lhs: quat, rhs: quat): boolean => IsEqualUsingDot(Dot(lhs, rhs))
// Are two quaternions different from each other?
export const differentEquals = (lhs: quat, rhs: quat): boolean => lhs !== rhs

export const identity = create(0, 0, 0, 1)
/**
 * @returns Returns or sets the euler angle representation of the rotation
 */
export const eualerAngles = () => {
    return {
        get: () => Internal_MakePositive(Vec3.create(3 * mathf.Rad2Deg, 3 * mathf.Rad2Deg, 3 * mathf.Rad2Deg)),
        set: () => Internal_MakePositive(Vec3.create(3 * mathf.Deg2Rad, 3 * mathf.Deg2Rad, 3 * mathf.Deg2Rad))
    }
}

export const Conjugate = (q: quat): quat => create(q[0] *= -1, q[1] *= -1, q[2] *= -1, q[0] *= 1)
export const normalized = (q: quat): quat => Normalize(q)
export const setFromToRotation = (fromDirection: vec3, toDirection: vec3): quat => create()
export const setLookRotation = (view: vec3, up = Vec3.up): void => {
    LookRotation(view, up)
}
export const magnitude = (q: quat): number => Math.sqrt(magnitudeSqrt(q))
export const magnitudeSqrt = (q: quat): number => q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]
export const AxisAngle = (axis: vec3, angle: number): quat => {
    const sina = Math.sin(0.5 * angle)
    return create(axis[0] * sina, axis[1] * sina, axis[2] * sina, Math.cos(0.5 * angle))
}
export const EulerXYZ = (x: number, y: number, z: number): quat => {
    const s = Vec3.create(Math.sin(0.5 * x), Math.sin(0.5 * y), Math.sin(0.5 * z))
    const c = Vec3.create(Math.cos(0.5 * x), Math.cos(0.5 * y), Math.cos(0.5 * z))
    return create(
        s[0] * c[1] * c[2] - s[1] * s[2] * c[0],
        s[1] * c[0] * c[2] + s[0] * s[2] * c[1],
        s[2] * c[0] * c[1] - s[0] * s[1] * c[2],
        c[0] * c[1] * c[2] + s[1] * s[2] * s[0])
}
export const EulerXZY = (x: number, y: number, z: number): quat => {
    const s = Vec3.create(Math.sin(0.5 * x), Math.sin(0.5 * y), Math.sin(0.5 * z))
    const c = Vec3.create(Math.cos(0.5 * x), Math.cos(0.5 * y), Math.cos(0.5 * z))
    return create(
        s[0] * c[1] * c[2] + s[1] * s[2] * c[0],
        s[1] * c[0] * c[2] + s[0] * s[2] * c[1],
        s[2] * c[0] * c[1] - s[0] * s[1] * c[2],
        c[0] * c[1] * c[2] - s[1] * s[2] * s[0])
}
export const EulerYXZ = (x: number, y: number, z: number): quat => {
    const s = Vec3.create(Math.sin(0.5 * x), Math.sin(0.5 * y), Math.sin(0.5 * z))
    const c = Vec3.create(Math.cos(0.5 * x), Math.cos(0.5 * y), Math.cos(0.5 * z))
    return create(
        s[0] * c[1] * c[2] - s[1] * s[2] * c[0],
        s[1] * c[0] * c[2] + s[0] * s[2] * c[1],
        s[2] * c[0] * c[1] + s[0] * s[1] * c[2],
        c[0] * c[1] * c[2] - s[1] * s[2] * s[0])
}
export const EulerYZX = (x: number, y: number, z: number): quat => {
    const s = Vec3.create(Math.sin(0.5 * x), Math.sin(0.5 * y), Math.sin(0.5 * z))
    const c = Vec3.create(Math.cos(0.5 * x), Math.cos(0.5 * y), Math.cos(0.5 * z))
    return create(
        s[0] * c[1] * c[2] - s[1] * s[2] * c[0],
        s[1] * c[0] * c[2] - s[0] * s[2] * c[1],
        s[2] * c[0] * c[1] + s[0] * s[1] * c[2],
        c[0] * c[1] * c[2] + s[1] * s[2] * s[0])
}
export const EulerZXY = (x: number, y: number, z: number): quat => {
    const s = Vec3.create(Math.sin(0.5 * x), Math.sin(0.5 * y), Math.sin(0.5 * z))
    const c = Vec3.create(Math.cos(0.5 * x), Math.cos(0.5 * y), Math.cos(0.5 * z))
    return create(
        s[0] * c[1] * c[2] + s[1] * s[2] * c[0],
        s[1] * c[0] * c[2] - s[0] * s[2] * c[1],
        s[2] * c[0] * c[1] - s[0] * s[1] * c[2],
        c[0] * c[1] * c[2] + s[1] * s[2] * s[0])
}
export const EulerZYX = (x: number, y: number, z: number): quat => {
    const s = Vec3.create(Math.sin(0.5 * x), Math.sin(0.5 * y), Math.sin(0.5 * z))
    const c = Vec3.create(Math.cos(0.5 * x), Math.cos(0.5 * y), Math.cos(0.5 * z))
    return create(
        s[0] * c[1] * c[2] + s[1] * s[2] * c[0],
        s[1] * c[0] * c[2] - s[0] * s[2] * c[1],
        s[2] * c[0] * c[1] + s[0] * s[1] * c[2],
        c[0] * c[1] * c[2] - s[1] * s[2] * s[0])
}
type EulerType = (x: number, y: number, z: number, order: RotationOrder) => quat
export const Eulers: EulerType = (x, y, z, order = 'XYZ') => {
    switch (order) {
        case rotationOrder.XYZ:
            return EulerXYZ(x, y, z);
            break;
        case rotationOrder.XZY:
            return EulerXZY(x, y, z);
            break;
        case rotationOrder.YXZ:
            return EulerYXZ(x, y, z);
            break;
        case rotationOrder.YZX:
            return EulerYZX(x, y, z);
            break;
        case rotationOrder.ZXY:
            return EulerZXY(x, y, z);
            break;
        case rotationOrder.ZYX:
            return EulerZYX(x, y, z);
            break;
        default:
            return identity;
            break;
    }
}
export const toAngleAxis = (angle: number, axis: vec3): void => {
    // ToAxisAngleRad(s, axis, angle)
    angle *= mathf.Rad2Deg
}
export const toString = (a: number, v: vec3): quat => create()
export const Angle = (a: quat, b: quat): number => {
    const dot = Math.min(Math.abs(Dot(a, b)), 1)
    return IsEqualUsingDot(dot) ? 0 : Math.acos(dot) * 2 * mathf.Rad2Deg
}

const Internal_MakePositive = (euler: vec3): vec3 => {
    const negativeFlip = -0.0001 * mathf.Rad2Deg
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

/**
 * 
 * @param angle rotate angle in degrees
 * @param axis normalized vector
 * @returns 
 */

// axis = normalized vector
// angle= 2xatan2(mag, w) 
//fromAngleAxis
export const AngleAxis = (angle: number, axis: vec3): quat => {
    if (Vec3.magnitudeSqrt(axis) === 0) identity

    const res = identity
    let rad = angle * mathf.Deg2Rad
    rad *= 0.5
    let vn = Vec3.normalized(axis)
    vn = create(axis[0] * Math.sin(rad), axis[1] * Math.sin(rad), axis[2] * Math.sin(rad))
    res[0] = axis[0];
    res[1] = axis[1];
    res[2] = axis[2];
    res[3] = Math.cos(rad);

    return Normalize(res)
}
// export const AngleAxis = (angle: number, axis: vec3): quat => create(axis[0] * Math.sin(angle * 0.5), axis[1] * Math.sin(angle * 0.5), axis[2] * Math.sin(angle * 0.5), Math.cos(angle * 0.5))
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
/**
 * 
 * @param rotation 
 * @returns Returns the inverse of rotation
 */
export const Inverse = (rotation: quat): quat => {
    const sqrtmag = rotation[0] * rotation[0] + rotation[1] * rotation[1] + rotation[2] * rotation[2] + rotation[3] * rotation[3];
    const invSqrtMag = sqrtmag ? 1 / sqrtmag : 0
    if (sqrtmag === 0) {
        return create()
    }
    return create(-rotation[0] * invSqrtMag, -rotation[1] * invSqrtMag, -rotation[2] * invSqrtMag, -rotation[3] * invSqrtMag)
}
/**
 * 
 * @param a Start value, returned when t = 0
 * @param b End value, returned when t = 0
 * @param t Interpolation ratio
 * @returns A quaternion interpolatied between quaternions a and b
 */
export const Lerp = (a: quat, b: quat, t: number): quat => create(mathf.LerpClamped(a[0], b[0], t), mathf.LerpClamped(a[1], b[1], t), mathf.LerpClamped(a[2], b[2], t), mathf.LerpClamped(a[3], b[3], t))
export const Lerps = (a: quat, b: quat, t: quat): quat => create(mathf.Lerp(a[0], b[0], t[0]), mathf.Lerp(a[1], b[1], t[1]), mathf.Lerp(a[2], b[2], t[2]), mathf.Lerp(a[3], b[3], t[3]))
export const LerpUnclamped = (a: quat, b: quat, t: number): quat => create(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, a[3] + (b[3] - a[3]) * t)

/**
 * 
 * @param forward The direction to look in
 * @param upwards The vector that defines in which direcrtions up is
 * 
 */
export const LookRotation = (forward: vec3, upwards: vec3): quat => {
    forward = Vec3.normalized(forward)
    const right = Vec3.normalized(Vec3.Cross(upwards, forward))
    const up = Vec3.Cross(forward, right)
    const m00 = right[0];
    const m01 = right[1];
    const m02 = right[2];
    const m10 = up[0];
    const m11 = up[1];
    const m12 = up[2];
    const m20 = forward[0];
    const m21 = forward[1];
    const m22 = forward[2];

    const num8 = (m00 + m11) + m22
    const quat = create()
    if (num8 > 0) {
        let num = Math.sqrt(num8 + 1)
        quat[3] = num * 0.5
        num = 0.5 / num
        quat[0] = (m12 - m21) * num
        quat[1] = (m20 - m02) * num
        quat[2] = (m01 - m10) * num
        return quat
    }
    if ((m00 >= m11) && (m00 >= m22)) {
        let num7 = Math.sqrt(((1 + m00) - m11) - m22)
        let num4 = 0.5 / num7
        quat[0] = 0.5 * num7
        quat[1] = (m01 + m10) * num4
        quat[2] = (m02 + m20) * num4
        quat[3] = (m12 - m21) * num4
        return quat
    }
    if (m11 > m22) {
        let num6 = Math.sqrt(((1 + m11) - m00) - m22)
        let num3 = 0.5 / num6
        quat[0] = (m10 + m01) * num3
        quat[1] = 0.5 * num6
        quat[2] = (m21 + m12) * num3
        quat[3] = (m20 - m02) * num3
        return quat
    }
    let num5 = Math.sqrt(((1 + m22) - m00) - m11)
    let num2 = 0.5 / num5
    quat[0] = (m20 + m02) * num2
    quat[1] = (m21 + m12) * num2
    quat[2] = 0.5 * num5
    quat[3] = (m01 - m10) * num2
    return quat
}

export const Normalize = (q: quat): quat => Math.sqrt(Dot(q, q)) < mathf.Epsilon ? identity : create(q[0] / Math.sqrt(Dot(q, q)), q[1] / Math.sqrt(Dot(q, q)), q[2] / Math.sqrt(Dot(q, q)), q[3] / Math.sqrt(Dot(q, q)))
/**
 * 
 * @param from 
 * @param to 
 * @param maxDegreesDelta 
 * @returns TODO
 */
export const rotateTowards = (from: quat, to: quat, maxDegreesDelta: number): quat => {
    const angle = Angle(from, to)
    if (angle === 0) to
    return SlerpUnclamped(from, to, Math.min(1, maxDegreesDelta / angle))
}
export const nLerp = (a: quat, b: quat, t: number): quat => {
    const res = create()
    res[0] = mathf.Lerp(a[0], b[0], t)
    res[1] = mathf.Lerp(a[1], b[1], t)
    res[2] = mathf.Lerp(a[2], b[2], t)
    res[3] = mathf.Lerp(a[3], b[3], t)

    let q = Normalize(res)
    let mag = Math.sqrt(magnitudeSqrt(q))
    if (mag === 0) mag = 1
    const imag = 1 / mag

    res[0] = q[0] * imag
    res[1] = q[1] * imag
    res[2] = q[2] * imag
    res[3] = q[3] * imag

    return res
}
// export const nlerps = (a: quat, b: quat, t: number): quat => {
//     return Normalize(q1.value + t * (chgsign(q2.value, dot(q1, q2)) - q1.value));
// }
export const Slerp = (a: quat, b: quat, t: number): quat => {

    let dt = Dot(a, b);

    if (dt < 0) {
        a[0] *= -1;
        a[1] *= -1;
        a[2] *= -1;
        a[3] *= -1;
        dt *= -1;
    }

    if (dt < 0.9995) {
        const angle = Math.acos(dt)
        const s = 1 / Math.sin(angle)
        const w1 = Math.sin(angle * (1 - t)) * s
        const w2 = Math.sin(angle * t) * s
        return create((a[0] * w1) + (b[0] * w2), (a[1] * w1) + (b[1] * w2), (a[2] * w1) + (b[2] * w2), (a[3] * w1) + (b[3] * w2))
    } else {
        return nLerp(a, b, t)
    }
}
export const Slerps = (a: quat, b: quat, t: number): quat => {
    let cosTheta = Dot(a, a)
    let temp = b
    if (cosTheta < 0) {
        // negate function
        temp[0] *= -1
        temp[1] *= -1
        temp[2] *= -1
        temp[3] *= -1
        cosTheta *= -1;
    }
    const theta = Math.acos(cosTheta)
    const sinTheta = 1 / Math.sin(theta)

    return create(sinTheta * ((a[0] * Math.sin(theta * (1 * t)) + (temp[0] * Math.sin(t * theta)))), sinTheta * ((a[1] * Math.sin(theta * (1 * t)) + (temp[1] * Math.sin(t * theta)))), sinTheta * ((a[2] * Math.sin(theta * (1 * t)) + (temp[2] * Math.sin(t * theta)))), sinTheta * ((a[3] * Math.sin(theta * (1 * t)) + (temp[3] * Math.sin(t * theta)))))
}
// TODO
export const SlerpUnclamped = (a: quat, b: quat, t: number): quat => {
    if (magnitudeSqrt(a) == 0.0) {
        if (magnitudeSqrt(b) == 0.0) {
            return identity
        }
        return b
    }
    else if (magnitudeSqrt(b) == 0.0) {
        return a;
    }

    return create()
}


export const vec4ToQuat = (v: vec4): quat => create(v[0], v[1], v[2], v[3])
// export const mat3ToQuat = ():quat=>
// export const mat4ToQuat = (m: mat4): quat => {
//     const u = Vec4.create(m[0], m[1], m[2], m[3])
//     const v = Vec4.create(m[4], m[5], m[6], m[7])
//     const w = Vec4.create(m[8], m[9], m[10], m[11])

//     const u_sign = 2
// }

export const fromAxisAngle = (axis: vec3, angle: number): quat => {
    const res = create(0, 0, 0, 1)
    const axisMag = Vec3.magnitude(axis)

    if (axisMag != 0) {
        angle *= 0.5

        let mag = 0
        let imag = 0

        const v = Vec3.normalized(axis)
        mag = mathf.Sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        if (mag == 0.0) mag = 1.0;
        imag = 1.0 / mag;
        axis[0] *= imag;
        axis[1] *= imag;
        axis[2] *= imag;


        const sinres = mathf.Sin(angle)
        const cosres = mathf.Cos(angle)

        res[0] = axis[0] * sinres
        res[1] = axis[1] * sinres
        res[2] = axis[2] * sinres
        res[3] = cosres

        const q = Normalize(res)
        mag = mathf.Sqrt(q[0] * q[0] + q[1] * q[1] + q[2] * q[2] + q[3] * q[3]);
        if (mag == 0.0) mag = 1.0;
        imag = 1.0 / mag;
        res[0] = q[0] * imag
        res[1] = q[1] * imag
        res[2] = q[2] * imag
        res[3] = q[3] * imag
    }
    return res
}
// Get the rotation angle and axis for a given quaternion
export const toAxisAngle = (q: quat, axis: vec3, angle: number): void => {
    if (mathf.Abs(q[3]) > 1) {
        Normalize(q)
    }
    const resAxis = Vec3.create()
    const resAngle = 2 * mathf.Acos(q[3])
    const den = mathf.Sqrt(1 - q[3] * q[3])
    if (den > 0.0001) {
        resAxis[0] = q[0] / den
        resAxis[1] = q[1] / den
        resAxis[2] = q[2] / den
    } else {
        // This occurs when the angle is zero.
        // Not a problem: just set an arbitrary normalized axis.
        resAxis[0] = 1
    }
    axis = resAxis
    angle = resAngle
}
// Get the quaternion equivalent to Euler angles
// NOTE: Rotation order is ZYX
export const fromEuler = (pitch: number, yaw: number, roll: number): quat => {
    const res = create();

    const x0 = mathf.Cos(pitch * 0.5);
    const x1 = mathf.Sin(pitch * 0.5);
    const y0 = mathf.Cos(yaw * 0.5);
    const y1 = mathf.Sin(yaw * 0.5);
    const z0 = mathf.Cos(roll * 0.5);
    const z1 = mathf.Sin(roll * 0.5);

    res[0] = x1 * y0 * z0 - x0 * y1 * z1;
    res[1] = x0 * y1 * z0 + x1 * y0 * z1;
    res[2] = x0 * y0 * z1 - x1 * y1 * z0;
    res[3] = x0 * y0 * z0 + x1 * y1 * z1;

    return res
}
// Get the Euler angles equivalent to quaternion (roll, pitch, yaw)
// NOTE: Angles are returned in a Vector3 struct in radians
export const toEuler = (q: quat): vec3 => {
    const res = Vec3.create()
    // Roll (x-axis rotation)
    const x0 = 2 * (q[3] * q[0] + q[1] * q[2])
    const x1 = 1 - 2 * (q[0] * q[0] + q[1] * q[1])
    res[0] = mathf.Atan2(x0, x1)
    // Pitch (y-axis rotation)
    let y0 = 2 * (q[3] * q[1] - q[2] * q[0])
    y0 = y0 > 1 ? 1 : y0
    y0 = y0 < -1 ? -1 : y0
    res[1] = mathf.Asin(y0)
    // Yaw (z-axis rotation)
    const z0 = 2 * (q[3] * q[2] + q[0] * q[2])
    const z1 = 1 - 2 * (q[1] * q[1] + q[2] * q[2])
    res[2] = mathf.Atan2(z0, z1)

    return res
}
// Transform a quaternion given a transformation matrix
export const TransformQuat = (q: quat, m: mat4): quat => {
    const res = create(0, 0, 0, 0)

    res[0] = m[0] * q[0] + m[1] * q[1] + m[2] * q[2] + m[3] * q[3];
    res[1] = m[4] * q[0] + m[5] * q[1] + m[6] * q[2] + m[7] * q[3];
    res[2] = m[8] * q[0] + m[9] * q[1] + m[10] * q[2] + m[11] * q[3];
    res[3] = m[12] * q[0] + m[13] * q[1] + m[14] * q[2] + m[15] * q[3];

    return res;
}
// Get a quaternion for a given rotation matrix
export const fromMatrix = (mat: mat4): quat => {
    const res = create()
    const fourWSquaredMinus1 = mat[0] + mat[5] + mat[10];
    const fourXSquaredMinus1 = mat[0] - mat[5] - mat[10];
    const fourYSquaredMinus1 = mat[5] - mat[0] - mat[10];
    const fourZSquaredMinus1 = mat[10] - mat[0] - mat[5];

    let biggestIndex = 0
    let fourBiggestSquaredMinus1 = fourWSquaredMinus1
    if (fourXSquaredMinus1 > fourBiggestSquaredMinus1) {
        fourBiggestSquaredMinus1 = fourXSquaredMinus1;
        biggestIndex = 1;
    }

    if (fourYSquaredMinus1 > fourBiggestSquaredMinus1) {
        fourBiggestSquaredMinus1 = fourYSquaredMinus1;
        biggestIndex = 2;
    }

    if (fourZSquaredMinus1 > fourBiggestSquaredMinus1) {
        fourBiggestSquaredMinus1 = fourZSquaredMinus1;
        biggestIndex = 3;
    }

    const biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1.0) * 0.5
    const mult = 0.25 / biggestVal

    switch (biggestIndex) {
        case 0:
            res[3] = biggestVal;
            res[0] = (mat[9] - mat[6]) * mult;
            res[1] = (mat[2] - mat[8]) * mult;
            res[2] = (mat[4] - mat[1]) * mult;
            break;
        case 1:
            res[0] = biggestVal;
            res[3] = (mat[9] - mat[6]) * mult;
            res[1] = (mat[4] + mat[1]) * mult;
            res[2] = (mat[2] + mat[8]) * mult;
            break;
        case 2:
            res[1] = biggestVal;
            res[3] = (mat[2] - mat[8]) * mult;
            res[0] = (mat[4] + mat[1]) * mult;
            res[2] = (mat[9] + mat[6]) * mult;
            break;
        case 3:
            res[2] = biggestVal;
            res[3] = (mat[4] - mat[1]) * mult;
            res[0] = (mat[2] + mat[8]) * mult;
            res[1] = (mat[9] + mat[6]) * mult;
            break;
    }

    return res
}
// Get a matrix for a given quaternion
export const toMatrix = (q: quat): mat4 => {
    const res = Mat4.create()

    const a2 = q[0] * q[0];
    const b2 = q[1] * q[1];
    const c2 = q[2] * q[2];
    const ac = q[0] * q[2];
    const ab = q[0] * q[1];
    const bc = q[1] * q[2];
    const ad = q[3] * q[0];
    const bd = q[3] * q[1];
    const cd = q[3] * q[2];

    res[0] = 1 - 2 * (b2 + c2)
    res[4] = 2 * (ab + cd)
    res[8] = 2 * (ac - bd)

    res[1] = 2 * (ab - cd)
    res[5] = 1 - 2 * (a2 + c2)
    res[9] = 2 * (bc + ad)

    res[2] = 2 * (ac + bd)
    res[6] = 2 * (bc - ad)
    res[10] = 1 - 2 * (a2 + b2)

    return res
}
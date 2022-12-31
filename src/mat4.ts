import { mat4, quat, vec3, vec4 } from "./types"
import * as Vec3 from "./vec3"
import * as Vec4 from "./vec4"
import * as Quat from "./quat"


export const create = (m00 = 1, m01 = 0, m02 = 0, m03 = 0, m10 = 0, m11 = 1, m12 = 0, m13 = 0, m20 = 0, m21 = 0, m22 = 1, m23 = 0, m30 = 0, m31 = 0, m32 = 0, m33 = 1): mat4 => {
    return new Float32Array([
        m00, m01, m02, m03,
        m10, m11, m12, m13,
        m20, m21, m22, m23,
        m30, m31, m32, m33
    ])
}
export const identity = create(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
export const zero = create(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
// Add two matrices
export const add = (m1: mat4, m2: mat4): mat4 => create(m1[0] + m2[0], m1[1] + m2[1], m1[2] + m2[2], m1[3] + m2[3], m1[4] + m2[4], m1[5] + m2[5], m1[6] + m2[6], m1[7] + m2[7], m1[8] + m2[8], m1[9] + m2[9], m1[10] + m2[10], m1[11] + m2[11], m1[12] + m2[12], m1[13] + m2[13], m1[14] + m2[14], m1[15] + m2[15])
// Subtract two matrices (m1 - m2)
export const subtract = (m1: mat4, m2: mat4): mat4 => create(m1[0] - m2[0], m1[1] - m2[1], m1[2] - m2[2], m1[3] - m2[3], m1[4] - m2[4], m1[5] - m2[5], m1[6] - m2[6], m1[7] - m2[7], m1[8] - m2[8], m1[9] - m2[9], m1[10] - m2[10], m1[11] - m2[11], m1[12] - m2[12], m1[13] - m2[13], m1[14] - m2[14], m1[15] - m2[15])
// Get two matrix multiplication
// NOTE: When multiplying matrices... the order matters!
export const multiply = (m1: mat4, m2: mat4): mat4 => create(
    m1[0] * m2[0] + m1[4] * m2[1] + m1[8] * m2[2] + m1[12] * m2[3],
    m1[0] * m2[4] + m1[4] * m2[5] + m1[8] * m2[6] + m1[12] * m2[7],
    m1[0] * m2[8] + m1[4] * m2[9] + m1[8] * m2[10] + m1[12] * m2[11],
    m1[0] * m2[12] + m1[4] * m2[13] + m1[8] * m2[14] + m1[12] * m2[15],
    m1[1] * m2[0] + m1[5] * m2[1] + m1[9] * m2[2] + m1[13] * m2[3],
    m1[1] * m2[4] + m1[5] * m2[5] + m1[9] * m2[6] + m1[13] * m2[7],
    m1[1] * m2[8] + m1[5] * m2[9] + m1[9] * m2[10] + m1[13] * m2[11],
    m1[1] * m2[12] + m1[5] * m2[13] + m1[9] * m2[14] + m1[13] * m2[15],
    m1[2] * m2[0] + m1[6] * m2[1] + m1[10] * m2[2] + m1[14] * m2[3],
    m1[2] * m2[4] + m1[6] * m2[5] + m1[10] * m2[6] + m1[14] * m2[7],
    m1[2] * m2[8] + m1[6] * m2[9] + m1[10] * m2[10] + m1[14] * m2[11],
    m1[2] * m2[12] + m1[6] * m2[13] + m1[10] * m2[14] + m1[14] * m2[15],
    m1[3] * m2[0] + m1[7] * m2[1] + m1[11] * m2[2] + m1[15] * m2[3],
    m1[3] * m2[4] + m1[7] * m2[5] + m1[11] * m2[6] + m1[15] * m2[7],
    m1[3] * m2[8] + m1[7] * m2[9] + m1[11] * m2[10] + m1[15] * m2[11],
    m1[3] * m2[12] + m1[7] * m2[13] + m1[11] * m2[14] + m1[15] * m2[15])

// Transforms a position by this matrix, with a perspective divide. (generic)
export const multiplyPoint = (m: mat4, point: vec3): vec3 => {
    const res = Vec3.create()
    let w
    res[0] = m[0] * point[0] + m[1] * point[1] + m[2] * point[2] + m[3]
    res[1] = m[4] * point[0] + m[5] * point[1] + m[6] * point[2] + m[7]
    res[2] = m[8] * point[0] + m[9] * point[1] + m[10] * point[2] + m[11]
    w = m[12] * point[0] + m[13] * point[1] + m[14] * point[2] + m[15]

    w = 1 / w
    res[0] *= w
    res[1] *= w
    res[2] *= w
    return res
}
// Transforms a position by this matrix, without a perspective divide. (fast)
export const multiplyPoint3x4 = (m: mat4, point: vec3): vec3 => {
    const res = Vec3.create()
    res[0] = m[0] * point[0] + m[1] * point[1] + m[2] * point[2] + m[3]
    res[1] = m[4] * point[0] + m[5] * point[1] + m[6] * point[2] + m[7]
    res[2] = m[8] * point[0] + m[9] * point[1] + m[10] * point[2] + m[11]
    return res
}
// Transforms a direction by this matrix.
export const multiplyFromVec3 = (m: mat4, v: vec3): vec3 => {
    const res = Vec3.create()
    res[0] = m[0] * v[0] + m[1] * v[1] + m[2] * v[2]
    res[1] = m[4] * v[0] + m[5] * v[1] + m[6] * v[2]
    res[2] = m[8] * v[0] + m[9] * v[1] + m[10] * v[2]
    return res
}

export const GetColumn = (m: mat4, i: number): vec4 => {
    switch (i) {
        case 0: return Vec4.create(m[0], m[4], m[8], m[12]);
        case 1: return Vec4.create(m[1], m[5], m[9], m[13]);
        case 2: return Vec4.create(m[2], m[6], m[10], m[14]);
        case 3: return Vec4.create(m[3], m[7], m[11], m[15]);
        default:
            throw new Error("Invalid column index!");
    }

}
export const GetRow = (m: mat4, i: number): vec4 => {
    switch (i) {
        case 0: return Vec4.create(m[0], m[1], m[2], m[3]);
        case 1: return Vec4.create(m[4], m[5], m[6], m[7]);
        case 2: return Vec4.create(m[8], m[9], m[10], m[11]);
        case 3: return Vec4.create(m[12], m[13], m[14], m[15]);
        default:
            throw new Error("Invalid row index!");
    }

}
export const GetPosition = (m: mat4): vec3 => Vec3.create(m[3], m[7], m[11])

// export const TransformPlane = ():any=>

// Compute matrix determinant
export const Determinant = (mat: mat4): number => {
    let a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3]
    let a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7]
    let a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11]
    let a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15]

    return a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
        a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
        a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
        a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
        a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
        a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33;
}

// Get a quaternion for a given rotation matrix
export const rotation = (mat: mat4): quat => {
    const res = Quat.create(0, 0, 0, 0)
    let fourWSquaredMinus1 = mat[0] + mat[5] + mat[10];
    let fourXSquaredMinus1 = mat[0] - mat[5] - mat[10];
    let fourYSquaredMinus1 = mat[5] - mat[0] - mat[10];
    let fourZSquaredMinus1 = mat[10] - mat[0] - mat[5];

    let biggestIndex = 0
    let fourBiggestSquaredMinus1 = fourWSquaredMinus1;
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

    let biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1) * 0.5;
    let mult = 0.25 / biggestVal;

    switch (biggestIndex) {
        case 0:
            res[3] = biggestVal;
            res[0] = (mat[9] - mat[6]) * mult;
            res[1] = (mat[2] - mat[8]) * mult;
            res[2] = (mat[4] - mat[1]) * mult;
            break;
        case 1:
            res[3] = biggestVal;
            res[0] = (mat[9] - mat[6]) * mult;
            res[1] = (mat[4] + mat[1]) * mult;
            res[2] = (mat[2] + mat[8]) * mult;
            break;
        case 2:
            res[3] = biggestVal;
            res[0] = (mat[2] - mat[8]) * mult;
            res[1] = (mat[4] + mat[1]) * mult;
            res[2] = (mat[9] + mat[6]) * mult;
            break;
        case 3:
            res[3] = biggestVal;
            res[0] = (mat[4] - mat[1]) * mult;
            res[1] = (mat[2] + mat[8]) * mult;
            res[2] = (mat[9] + mat[6]) * mult;
            break;
    }

    return res;
}

// Get the trace of the matrix (sum of the values along the diagonal)
export const Trace = (mat: mat4): number => mat[0] + mat[5] + mat[10] + mat[15]
// Transposes provided matrix
export const Transpose = (mat: mat4): mat4 => create(mat[0], mat[4], mat[8], mat[12], mat[1], mat[5], mat[9], mat[13], mat[2], mat[6], mat[10], mat[14], mat[3], mat[7], mat[11], mat[15])
// Invert provided matrix
export const Invert = (mat: mat4): mat4 => {
    let a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3]
    let a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7]
    let a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11]
    let a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15]

    const b00 = a00 * a11 - a01 * a10;
    const b01 = a00 * a12 - a02 * a10;
    const b02 = a00 * a13 - a03 * a10;
    const b03 = a01 * a12 - a02 * a11;
    const b04 = a01 * a13 - a03 * a11;
    const b05 = a02 * a13 - a03 * a12;
    const b06 = a20 * a31 - a21 * a30;
    const b07 = a20 * a32 - a22 * a30;
    const b08 = a20 * a33 - a23 * a30;
    const b09 = a21 * a32 - a22 * a31;
    const b10 = a21 * a33 - a23 * a31;
    const b11 = a22 * a33 - a23 * a32;
    const invDet = 1.0 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

    return create((a11 * b11 - a12 * b10 + a13 * b09) * invDet, (-a01 * b11 + a02 * b10 - a03 * b09) * invDet, (a31 * b05 - a32 * b04 + a33 * b03) * invDet, (-a21 * b05 + a22 * b04 - a23 * b03) * invDet, (-a10 * b11 + a12 * b08 - a13 * b07) * invDet, (a00 * b11 - a02 * b08 + a03 * b07) * invDet, (-a30 * b05 + a32 * b02 - a33 * b01) * invDet, (a20 * b05 - a22 * b02 + a23 * b01) * invDet, (a10 * b10 - a11 * b08 + a13 * b06) * invDet, (-a00 * b10 + a01 * b08 - a03 * b06) * invDet, (a30 * b04 - a31 * b02 + a33 * b00) * invDet, (-a20 * b04 + a21 * b02 - a23 * b00) * invDet, (-a10 * b09 + a11 * b07 - a12 * b06) * invDet, (a00 * b09 - a01 * b07 + a02 * b06) * invDet, (-a30 * b03 + a31 * b01 - a32 * b00) * invDet, (a20 * b03 - a21 * b01 + a22 * b00) * invDet)
}
// Get translation matrix
export const Translate = (x: number, y: number, z: number): mat4 => create(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1)
// Create rotation matrix from axis and angle
// NOTE: Angle should be provided in radians
export const Rotate = (axis: vec3, angle: number): mat4 => {
    let x = axis[0]
    let y = axis[1]
    let z = axis[2]
    const magSqrt = x * x + y * y + z * z

    if ((magSqrt != 1.0) && (magSqrt != 0)) {
        const ilength = 1 / Math.sqrt(magSqrt)
        x *= ilength
        y *= ilength
        z *= ilength
    }

    const sinres = Math.sin(angle)
    const cosres = Math.cos(angle)
    const t = 1 - cosres

    return create(x * x * t + cosres, y * x * t + z * sinres, z * x * t - y * sinres, 0, x * y * t - z * sinres, y * y * t + cosres, z * y * t + x * sinres, 0, x * z * t + y * sinres, y * z * t - x * sinres, z * z * t + cosres, 0, 0, 0, 0, 1)
}
export const Rotates = (q: quat): mat4 => {
    // Precalculate coordinate products
    const x = q[0] * 2.0;
    const y = q[1] * 2.0;
    const z = q[2] * 2.0;
    const xx = q[0] * x;
    const yy = q[1] * y;
    const zz = q[2] * z;
    const xy = q[0] * y;
    const xz = q[0] * z;
    const yz = q[1] * z;
    const wx = q[3] * x;
    const wy = q[3] * y;
    const wz = q[3] * z;

    // Calculate 3x3 matrix from orthonormal basis
    const m = create()
    m[0] = 1.0 - (yy + zz); m[4] = xy + wz; m[8] = xz - wy; m[12] = 0.0;
    m[1] = xy - wz; m[5] = 1.0 - (xx + zz); m[9] = yz + wx; m[13] = 0.0;
    m[2] = xz + wy; m[6] = yz - wx; m[10] = 1.0 - (xx + yy); m[14] = 0.0;
    m[3] = 0.0; m[7] = 0.0; m[11] = 0.0; m[15] = 1.0;
    return m;
}
// Get scaling matrix
export const Scale = (x: number, y: number, z: number): mat4 => create(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1)
// Get perspective projection matrix
/**
 * 
 * @param left The X coordinate of the left side of the near projection plane in view space.
 * @param right The X coordinate of the right side of the near projection plane in view space.
 * @param bottom The Y coordinate of the bottom side of the near projection plane in view space.
 * @param top The Y coordinate of the top side of the near projection plane in view space.
 * @param zNear Z distance to the near plane from the origin in view space.
 * @param zFar Z distance to the far plane from the origin in view space.
 * @returns Matrix4x4 A projection matrix with a viewing frustum defined by the plane coordinates passed in.
 */
export const Frustum = (left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): mat4 => {
    let rl = (right - left);
    let tb = (top - bottom);
    let fn = (zFar - zNear);

    // fixes this asap
    return create(
        (zNear * 2) / rl, 0, 0, 0,
        0, (zNear * 2) / tb, 0, 0,
        (right + left) / rl, (top + bottom) / tb, -(zFar + zNear) / fn, -1,
        0, 0, -(zFar * zNear * 2) / fn, 0,
    )
}
/**
 * 
 * @param fov Vertical fiela-of-view in degrees,
 * @param aspect Aspect ratio (width divided by height)
 * @param zNear Near depth clipping plane value
 * @param zFar Far depth clipping plane value 
 * @returns Matrix4x4 The projection matrix
 */
export const Perspective = (fov: number, aspect: number, zNear: number, zFar: number): mat4 => {
    let res = create(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    const top = zNear * Math.tan(fov * 0.5)
    const bottom = -top
    const right = top * aspect
    const left = -right

    const rl = right - left
    const tb = top - bottom
    const fn = zFar - zNear
    res[0] = (zNear * 2) / rl
    res[5] = (zNear * 2) / tb
    res[2] = (right + left) / rl
    res[6] = (top + bottom) / tb
    res[10] = -(zFar + zNear) / fn
    res[14] = -1
    res[11] = -(zFar * zNear * 2) / fn

    return res
}

export const Ortho = (left: number, right: number, bottom: number, top: number, zNear: number, zFar: number): mat4 => {
    const rl = (right - left);
    const tb = (top - bottom);
    const fn = (zFar - zNear);

    return create(
        2 / rl, 0, 0, 0,
        0, 2 / tb, 0, 0,
        0, 0, 2 / fn, 0,
        (left + right) / rl, (top + bottom) / tb, (zFar + zNear) / fn, 1
    )
}

export const LookAt = (from: vec3, to: vec3, up: vec3): mat4 => {
    let mag = 0
    let imag = 0

    const vz = Vec3.subtract(from, to)
    let v = Vec3.normalized(vz)
    mag = Vec3.Magnitude(v)
    if (mag === 0) mag = 1
    imag = 1 / mag
    vz[0] *= imag
    vz[1] *= imag
    vz[2] *= imag

    const vx = Vec3.Cross(up, vz)
    v = Vec3.normalized(vx)
    mag = Vec3.Magnitude(v)
    if (mag === 0) mag = 1
    imag = 1 / mag
    vx[0] *= imag
    vx[1] *= imag
    vx[2] *= imag

    const vy = Vec3.subtract(from, to)

    return create(
        vx[0], vx[1], vx[2], -Vec3.dot(vx, up),
        vy[0], vy[1], vy[2], -Vec3.dot(vy, up),
        vz[0], vz[1], vz[2], -Vec3.dot(vz, up),
        0, 0, 0, 1
    )
}

/**
 * Converts this quaternion to a rotation matrix
 */
export const toMatrix = (q: quat): mat4 => {
    const res = create()
    // you could just use Matrix4x4.Rotate( q ) but that's not as fun as doing this math myself
    const xx = q[0] * q[0];
    const yy = q[1] * q[1];
    const zz = q[2] * q[2];
    const ww = q[3] * q[3];
    const xy = q[0] * q[1];
    const yz = q[1] * q[2];
    const zw = q[2] * q[3];
    const wx = q[3] * q[0];
    const xz = q[0] * q[2];
    const yw = q[1] * q[3];

    res[0] = xx - yy - zz + ww, // X
        res[4] = 2 * (xy + zw),
        res[8] = 2 * (xz - yw),

        res[1] = 2 * (xy - zw), // Y
        res[5] = -xx + yy - zz + ww,
        res[9] = 2 * (wx + yz),

        res[2] = 2 * (xz + yw), // Z
        res[6] = 2 * (yz - wx),
        res[10] = -xx - yy + zz + ww,

        res[15] = 1

    return res
}
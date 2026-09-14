import { Vec3 } from './Vec3';
import { Mathf } from './Utils';

/**
 * Quaternion
 */
export class Quaternion {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    static get identity(): Quaternion {
        return new Quaternion(0, 0, 0, 1);
    }

    get eulerAngles(): Vec3 {
        return Quaternion.Internal_MakePositive(
            Vec3.Multiply(Quaternion.Internal_ToEuler(this), Mathf.Rad2Deg)
        );
    }
    set eulerAngles(value: Vec3) {
        this.copy(Quaternion.Internal_FromEuler(Vec3.Multiply(value, Mathf.Deg2Rad)));
    }
    get normalized(): Quaternion {
        return Quaternion.Normalize(this);
    }

    /**
     * Set the value of the quaternion.
     */
    Set(x: number, y: number, z: number, w: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    /**
     * Is the dot product of two quaternions within tolerance for them to be considered equal?
     */
    static IsEqualUsingDot(dot: number): boolean {
        return dot > 1.0 - Mathf.kEpsilon;
    }

    /**
     * Combines rotations lhs and rhs, or rotates a point by a rotation.
     */
    static Multiply(lhs: Quaternion, rhs: Quaternion): Quaternion;
    static Multiply(rotation: Quaternion, point: Vec3): Vec3;
    static Multiply(
        lhs: Quaternion,
        rhs: Quaternion | Vec3
    ): Quaternion | Vec3 {
        if (rhs instanceof Vec3) {
            return Quaternion.rotatePoint(lhs, rhs);
        }
        return new Quaternion(
            lhs.w * rhs.x + lhs.x * rhs.w + lhs.y * rhs.z - lhs.z * rhs.y,
            lhs.w * rhs.y + lhs.y * rhs.w + lhs.z * rhs.x - lhs.x * rhs.z,
            lhs.w * rhs.z + lhs.z * rhs.w + lhs.x * rhs.y - lhs.y * rhs.x,
            lhs.w * rhs.w - lhs.x * rhs.x - lhs.y * rhs.y - lhs.z * rhs.z
        );
    }

    /**
     * Rotates the point point with rotation.
     */
    private static rotatePoint(rotation: Quaternion, point: Vec3): Vec3 {
        const x = rotation.x * 2;
        const y = rotation.y * 2;
        const z = rotation.z * 2;
        const xx = rotation.x * x;
        const yy = rotation.y * y;
        const zz = rotation.z * z;
        const xy = rotation.x * y;
        const xz = rotation.x * z;
        const yz = rotation.y * z;
        const wx = rotation.w * x;
        const wy = rotation.w * y;
        const wz = rotation.w * z;

        return new Vec3(
            (1 - (yy + zz)) * point.x + (xy - wz) * point.y + (xz + wy) * point.z,
            (xy + wz) * point.x + (1 - (xx + zz)) * point.y + (yz - wx) * point.z,
            (xz - wy) * point.x + (yz + wx) * point.y + (1 - (xx + yy)) * point.z
        );
    }

    /**
     * The dot product between two rotations
     */
    static Dot(a: Quaternion, b: Quaternion): number {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    /**
     * Returns the angle in degrees between two rotations a and b
     */
    static Angle(a: Quaternion, b: Quaternion): number {
        const dot = Mathf.Min(Mathf.Abs(Quaternion.Dot(a, b)), 1.0);
        return Quaternion.IsEqualUsingDot(dot)
            ? 0.0
            : Math.acos(dot) * 2.0 * Mathf.Rad2Deg;
    }
    /**
     * Creates a rotation which rotates angle degrees around axis.
     * Does not modify the input axis.
     */
    static AngleAxis(angle: number, axis: Vec3): Quaternion {
        return Quaternion.Internal_FromAxisAngle(Mathf.Deg2Rad * angle, axis);
    }
    /**
     * Set the quaternion value given two vectors. The resulting rotation rotates u to v.
     * Handles opposite vectors by picking an orthogonal axis. Does not modify the inputs.
     */
    static FromToRotation(from: Vec3, to: Vec3): Quaternion {
        const f = Vec3.Normalize(from);
        const t = Vec3.Normalize(to);
        const dot = Vec3.Dot(f, t);

        if (dot < -1.0 + Mathf.kEpsilon) {
            // Opposite directions: pick any axis orthogonal to f.
            const ortho =
                Math.abs(f.x) < Math.abs(f.z)
                    ? new Vec3(1, 0, 0)
                    : new Vec3(0, 0, 1);
            const axis = Vec3.Normalize(Vec3.Cross(f, ortho));
            return new Quaternion(axis.x, axis.y, axis.z, 0);
        }

        const cross = Vec3.Cross(f, t);
        const res = new Quaternion(cross.x, cross.y, cross.z, 1.0 + dot);
        return Quaternion.Normalize(res);
    }

    SetFromToRotation(fromDirection: Vec3, toDirection: Vec3): void {
        this.copy(Quaternion.FromToRotation(fromDirection, toDirection));
    }
    SetLookRotation(view: Vec3): void {
        this.copy(Quaternion.LookRotation(view, Vec3.up));
    }
    /**
     * Get the rotation angle and axis for a given quaternion.
     * Does not modify the input.
     * @returns axis (unit vector) and angle in radians.
     */
    static ToAxisAngle(q: Quaternion): { axis: Vec3; angle: number } {
        const n = Quaternion.Normalize(q);
        const w = Mathf.Clamp(n.w, -1.0, 1.0);
        const angle = 2.0 * Math.acos(w);
        const den = Math.sqrt(Math.max(0, 1.0 - w * w));
        if (den < Mathf.kEpsilon) {
            // Zero rotation: the axis is arbitrary.
            return { axis: new Vec3(1, 0, 0), angle: 0 };
        }
        return {
            axis: new Vec3(n.x / den, n.y / den, n.z / den),
            angle,
        };
    }
    toAxisAngle(): { axis: Vec3; angle: number } {
        return Quaternion.ToAxisAngle(this);
    }

    /**
     * Get the inverse quaternion rotation. Does not modify the input.
     */
    static Inverse(rotation: Quaternion): Quaternion {
        const magnitudeSq =
            rotation.x * rotation.x +
            rotation.y * rotation.y +
            rotation.z * rotation.z +
            rotation.w * rotation.w;
        if (magnitudeSq < Mathf.kEpsilon) {
            return Quaternion.identity;
        }
        const invMagnitude = 1.0 / magnitudeSq;
        return new Quaternion(
            -rotation.x * invMagnitude,
            -rotation.y * invMagnitude,
            -rotation.z * invMagnitude,
            rotation.w * invMagnitude
        );
    }
    /**
     * Creates a rotation with the specified forward and upwards directions.
     * The resulting rotation maps +Z to forward. Does not modify the inputs.
     * @param forward The direction to look in
     * @param upwards The vector that defines in which direction up is
     */
    static LookRotation(forward: Vec3, upwards = Vec3.up): Quaternion {
        const f = Vec3.Normalize(forward);
        if (f.sqrMagnitude < Mathf.kEpsilon) {
            return Quaternion.identity;
        }
        let r = Vec3.Cross(upwards, f);
        if (r.sqrMagnitude < Mathf.kEpsilon) {
            // forward is parallel to up: pick any orthogonal right vector.
            const ortho =
                Math.abs(f.x) < Math.abs(f.z)
                    ? new Vec3(1, 0, 0)
                    : new Vec3(0, 0, 1);
            r = Vec3.Cross(ortho, f);
        }
        r = Vec3.Normalize(r);
        const u = Vec3.Cross(f, r);

        // Rotation columns are (r, u, f); convert to quaternion (Shepperd).
        const m00 = r.x, m01 = u.x, m02 = f.x;
        const m10 = r.y, m11 = u.y, m12 = f.y;
        const m20 = r.z, m21 = u.z, m22 = f.z;
        const trace = m00 + m11 + m22;
        if (trace > 0) {
            const s = Math.sqrt(trace + 1.0) * 2;
            return new Quaternion(
                (m21 - m12) / s,
                (m02 - m20) / s,
                (m10 - m01) / s,
                s * 0.25
            );
        }
        if (m00 > m11 && m00 > m22) {
            const s = Math.sqrt(1.0 + m00 - m11 - m22) * 2;
            return new Quaternion(
                s * 0.25,
                (m01 + m10) / s,
                (m02 + m20) / s,
                (m21 - m12) / s
            );
        }
        if (m11 > m22) {
            const s = Math.sqrt(1.0 + m11 - m00 - m22) * 2;
            return new Quaternion(
                (m01 + m10) / s,
                s * 0.25,
                (m12 + m21) / s,
                (m02 - m20) / s
            );
        }
        const s = Math.sqrt(1.0 + m22 - m00 - m11) * 2;
        return new Quaternion(
            (m02 + m20) / s,
            (m12 + m21) / s,
            s * 0.25,
            (m10 - m01) / s
        );
    }
    /**
     * Normalize the quaternion. Note that this changes the values of the quaternion.
     */
    static Normalize(q: Quaternion): Quaternion {
        const mag = Math.sqrt(Quaternion.Dot(q, q));
        if (mag < Mathf.kEpsilon) {
            return Quaternion.identity;
        }

        return new Quaternion(q.x / mag, q.y / mag, q.z / mag, q.w / mag);
    }

    Normalize(): void {
        this.copy(Quaternion.Normalize(this));
    }

    static Euler(euler: Vec3): Quaternion {
        return Quaternion.Internal_FromEuler(Vec3.Multiply(euler, Mathf.Deg2Rad));
    }
    /**
     * Performs a linear interpolation between two quat
     *
     * @param a Start value, returned when t = 0
     * @param b End value, returned when t = 1
     * @param t Interpolation ratio is clamped.
     * @returns {Quaternion} A quaternion interpolated between quaternions a and b
     */
    static Lerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
        const res = Quaternion.identity;
        res.x = Mathf.Lerp(a.x, b.x, t);
        res.y = Mathf.Lerp(a.y, b.y, t);
        res.z = Mathf.Lerp(a.z, b.z, t);
        res.w = Mathf.Lerp(a.w, b.w, t);
        return res;
    }
    /**
     * Performs a linear interpolation between two quat
     *
     * @param a Start value, returned when t = 0
     * @param b End value, returned when t = 1
     * @param t Interpolation ratio is not clamped.
     * @returns {Quaternion} A quaternion interpolated between quaternions a and b
     */
    static LerpUnclamped(a: Quaternion, b: Quaternion, t: number): Quaternion {
        const res = Quaternion.identity;
        res.x = Mathf.LerpUnclamped(a.x, b.x, t);
        res.y = Mathf.LerpUnclamped(a.y, b.y, t);
        res.z = Mathf.LerpUnclamped(a.z, b.z, t);
        res.w = Mathf.LerpUnclamped(a.w, b.w, t);
        return res;
    }
    /**
     * Calculate slerp-optimized interpolation between two quaternions
     */
    static Nlerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
        const res = Quaternion.identity;
        // QuaternionLerp(q1, q2, amount)
        res.x = a.x + t * (b.x - a.x);
        res.y = a.y + t * (b.y - a.y);
        res.z = a.z + t * (b.z - a.z);
        res.w = a.w + t * (b.w - a.w);

        // QuaternionNormalize(q);
        let q = res;
        let length = Math.sqrt(q.x * q.x + q.y * q.y + q.z * q.z + q.w * q.w);
        if (length == 0.0) length = 1.0;
        let ilength = 1.0 / length;

        res.x = q.x * ilength;
        res.y = q.y * ilength;
        res.z = q.z * ilength;
        res.w = q.w * ilength;

        return res;
    }
    static RotateTowards(
        from: Quaternion,
        to: Quaternion,
        maxDegreesDelta: number
    ): Quaternion {
        const angle = Quaternion.Angle(from, to);
        if (angle === 0.0) {
            return to;
        }
        return Quaternion.SlerpUnclamped(
            from,
            to,
            Mathf.Min(1.0, maxDegreesDelta / angle)
        );
    }
    /**
     * Performs a spherical linear interpolation between two quat.
     * Does not modify the inputs.
     *
     * @param a Start value, returned when t = 0
     * @param b End value, returned when t = 1
     * @param t Interpolation ratio, clamped to 0-1
     * @returns {Quaternion} A quaternion spherically interpolated between quaternions a and b
     */
    static Slerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
        return Quaternion.slerp(a, b, Mathf.Clamp01(t));
    }
    static SlerpUnclamped(a: Quaternion, b: Quaternion, t: number): Quaternion {
        return Quaternion.slerp(a, b, t);
    }
    private static slerp(a: Quaternion, b: Quaternion, t: number): Quaternion {
        let bx = b.x, by = b.y, bz = b.z, bw = b.w;
        let cosHalfTheta = a.x * bx + a.y * by + a.z * bz + a.w * bw;

        if (cosHalfTheta < 0) {
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
            cosHalfTheta = -cosHalfTheta;
        }

        if (Math.abs(cosHalfTheta) >= 1.0) return a.clone();
        if (cosHalfTheta > 0.95) {
            return Quaternion.Nlerp(
                a,
                new Quaternion(bx, by, bz, bw),
                t
            );
        }
        const halfTheta = Math.acos(cosHalfTheta);
        const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

        if (Math.abs(sinHalfTheta) < 0.001) {
            return new Quaternion(
                a.x * 0.5 + bx * 0.5,
                a.y * 0.5 + by * 0.5,
                a.z * 0.5 + bz * 0.5,
                a.w * 0.5 + bw * 0.5
            );
        }
        const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
        const ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        return new Quaternion(
            a.x * ratioA + bx * ratioB,
            a.y * ratioA + by * ratioB,
            a.z * ratioA + bz * ratioB,
            a.w * ratioA + bw * ratioB
        );
    }

    /**
     * Copies value of source to this quaternion.
     * @return this
     */
    copy(quat: Quaternion): Quaternion {
        this.x = quat.x;
        this.y = quat.y;
        this.z = quat.z;
        this.w = quat.w;
        return this;
    }

    clone(): Quaternion {
        return new Quaternion(this.x, this.y, this.z, this.w);
    }

    /**
     * Convert to a readable format
     * @return "x,y,z,w"
     */
    toString(): string {
        return `${this.x},${this.y},${this.z},${this.w}`;
    }

    /**
     * Convert to an Array
     * @return [x, y, z, w]
     */
    toArray(): [number, number, number, number] {
        return [this.x, this.y, this.z, this.w];
    }

    /**
     * Makes euler angles positive 0/360 with 0.0001 hacked to support old behaviour of QuaternionToEuler
     */
    private static Internal_MakePositive(euler: Vec3): Vec3 {
        const negativeFlip = -0.0001 * Mathf.Rad2Deg;
        const positiveFlip = 360.0 + negativeFlip;

        if (euler.x < negativeFlip) euler.x += 360.0;
        else if (euler.x > positiveFlip) euler.x -= 360.0;

        if (euler.y < negativeFlip) euler.y += 360.0;
        else if (euler.y > positiveFlip) euler.y -= 360.0;

        if (euler.z < negativeFlip) euler.z += 360.0;
        else if (euler.z > positiveFlip) euler.z -= 360.0;

        return euler;
    }

    /**
     *  Get the Euler angles equivalent to quaternion (roll, pitch, yaw)
     *  NOTE: Angles are returned in a Vector3 struct in radians
     */
    private static Internal_ToEuler(q: Quaternion): Vec3 {
        const res = Vec3.zero;

        // Roll (x-axis rotation)
        const x0 = 2.0 * (q.w * q.x + q.y * q.z);
        const x1 = 1.0 - 2.0 * (q.x * q.x + q.y * q.y);
        res.x = Math.atan2(x0, x1);

        // Pitch (y-axis rotation)
        let y0 = 2.0 * (q.w * q.y - q.z * q.x);
        y0 = y0 > 1.0 ? 1.0 : y0;
        y0 = y0 < -1.0 ? -1.0 : y0;
        res.y = Math.asin(y0);

        // Yaw (z-axis rotation)
        const z0 = 2.0 * (q.w * q.z + q.x * q.y);
        const z1 = 1.0 - 2.0 * (q.y * q.y + q.z * q.z);
        res.z = Math.atan2(z0, z1);

        return res;
    }

    /**
     * Get the quaternion equivalent to Euler angles.
     * NOTE: Rotation order is ZYX
     */
    private static Internal_FromEuler(euler: Vec3): Quaternion {
        const res = Quaternion.identity;
        const x0 = Math.cos(euler.x * 0.5);
        const x1 = Math.sin(euler.x * 0.5);
        const y0 = Math.cos(euler.y * 0.5);
        const y1 = Math.sin(euler.y * 0.5);
        const z0 = Math.cos(euler.z * 0.5);
        const z1 = Math.sin(euler.z * 0.5);

        res.x = x1 * y0 * z0 - x0 * y1 * z1;
        res.y = x0 * y1 * z0 + x1 * y0 * z1;
        res.z = x0 * y0 * z1 - x1 * y1 * z0;
        res.w = x0 * y0 * z0 + x1 * y1 * z1;

        return res;
    }
    /**
     * Get rotation quaternion for an angle and axis
     * NOTE: Angle must be provided in radians
     */
    private static Internal_FromAxisAngle(angle: number, axis: Vec3): Quaternion {
        const axisLength = Math.sqrt(
            axis.x * axis.x + axis.y * axis.y + axis.z * axis.z
        );

        if (axisLength < Mathf.kEpsilon) {
            return Quaternion.identity;
        }
        angle *= 0.5;
        const ilength = 1.0 / axisLength;
        const nx = axis.x * ilength;
        const ny = axis.y * ilength;
        const nz = axis.z * ilength;

        const sinres = Math.sin(angle);
        const cosres = Math.cos(angle);

        const res = new Quaternion(
            nx * sinres,
            ny * sinres,
            nz * sinres,
            cosres
        );
        return Quaternion.Normalize(res);
    }
}

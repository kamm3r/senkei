import { Vec2 } from './Vec2';
import { Vec3 } from './Vec3';
import { Mathf } from './Utils';

export class Vec4 {
    x: number;
    y: number;
    z: number;
    w: number;

    constructor(x = 0.0, y = 0.0, z = 0.0, w = 0.0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    static get zero(): Vec4 {
        return new Vec4(0, 0, 0, 0);
    }
    static get one(): Vec4 {
        return new Vec4(1, 1, 1, 1);
    }

    /**
     * Returns the length of this vector
     */
    get magnitude(): number {
        return Math.sqrt(
            this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
        );
    }
    /**
     * Returns the squared length of this vector
     */
    get sqrMagnitude(): number {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
    }
    /**
     * Returns this vector with a magnitude of 1
     */
    get normalized(): Vec4 {
        return Vec4.Normalize(this);
    }
    /**
     * Vector addition
     */
    static Add(a: Vec4, b: Vec4): Vec4 {
        return new Vec4(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
    }

    /**
     * Vector subtraction
     */
    static Subtract(a: Vec4, b: Vec4): Vec4 {
        return new Vec4(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
    }

    /**
     * Multiply by a scalar or component-wise by another vector.
     */
    static Multiply(a: Vec4, b: Vec4 | number): Vec4 {
        return typeof b === 'number'
            ? new Vec4(a.x * b, a.y * b, a.z * b, a.w * b)
            : new Vec4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
    }

    /**
     * Divide by a scalar or component-wise by another vector.
     */
    static Divide(a: Vec4, b: Vec4 | number): Vec4 {
        return typeof b === 'number'
            ? new Vec4(a.x / b, a.y / b, a.z / b, a.w / b)
            : new Vec4(a.x / b.x, a.y / b.y, a.z / b.z, a.w / b.w);
    }
    static Negate(a: Vec4): Vec4 {
        return new Vec4(-a.x, -a.y, -a.z, -a.w);
    }

    static Min(a: Vec4, b: Vec4): Vec4 {
        return new Vec4(
            Math.min(a.x, b.x),
            Math.min(a.y, b.y),
            Math.min(a.z, b.z),
            Math.min(a.w, b.w)
        );
    }
    static Max(a: Vec4, b: Vec4): Vec4 {
        return new Vec4(
            Math.max(a.x, b.x),
            Math.max(a.y, b.y),
            Math.max(a.z, b.z),
            Math.max(a.w, b.w)
        );
    }
    static Clamp(v: Vec4, min: Vec4, max: Vec4): Vec4 {
        return new Vec4(
            v.x < min.x ? min.x : v.x > max.x ? max.x : v.x,
            v.y < min.y ? min.y : v.y > max.y ? max.y : v.y,
            v.z < min.z ? min.z : v.z > max.z ? max.z : v.z,
            v.w < min.w ? min.w : v.w > max.w ? max.w : v.w
        );
    }

    Set(x: number, y: number, z: number, w: number): void {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }
    /**
     * Copies value of source to this vector.
     */
    copy(vector: Vec4): Vec4 {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        this.w = vector.w;
        return this;
    }
    /**
     * Clone the vector
     */
    clone(): Vec4 {
        return new Vec4(this.x, this.y, this.z, this.w);
    }
    static Lerp(a: Vec4, b: Vec4, t: number): Vec4 {
        const res = Vec4.zero;
        res.x = Mathf.Lerp(a.x, b.x, t);
        res.y = Mathf.Lerp(a.y, b.y, t);
        res.z = Mathf.Lerp(a.z, b.z, t);
        res.w = Mathf.Lerp(a.w, b.w, t);
        return res;
    }
    static LerpUnclamped(a: Vec4, b: Vec4, t: number): Vec4 {
        const res = Vec4.zero;
        res.x = Mathf.LerpUnclamped(a.x, b.x, t);
        res.y = Mathf.LerpUnclamped(a.y, b.y, t);
        res.z = Mathf.LerpUnclamped(a.z, b.z, t);
        res.w = Mathf.LerpUnclamped(a.w, b.w, t);
        return res;
    }
    static MoveTowards(
        current: Vec4,
        target: Vec4,
        maxDistanceDelta: number
    ): Vec4 {
        const toVector_x = target.x - current.x;
        const toVector_y = target.y - current.y;
        const toVector_z = target.z - current.z;
        const toVector_w = target.w - current.w;

        const sqdist =
            toVector_x * toVector_x +
            toVector_y * toVector_y +
            toVector_z * toVector_z +
            toVector_w * toVector_w;

        if (
            sqdist == 0 ||
            (maxDistanceDelta >= 0 && sqdist <= maxDistanceDelta * maxDistanceDelta)
        )
            return target.clone();

        const dist = Math.sqrt(sqdist);

        return new Vec4(
            current.x + (toVector_x / dist) * maxDistanceDelta,
            current.y + (toVector_y / dist) * maxDistanceDelta,
            current.z + (toVector_z / dist) * maxDistanceDelta,
            current.w + (toVector_w / dist) * maxDistanceDelta
        );
    }
    static Scale(a: Vec4, b: Vec4): Vec4 {
        return new Vec4(a.x * b.x, a.y * b.y, a.z * b.z, a.w * b.w);
    }
    Scale(scale: Vec4): void {
        this.x *= scale.x;
        this.y *= scale.y;
        this.z *= scale.z;
        this.w *= scale.w;
    }
    static Normalize(value: Vec4): Vec4 {
        const mag = Vec4.Magnitude(value);
        if (mag > 0.000001) {
            return Vec4.Divide(value, mag);
        } else {
            // Make something up
            return Vec4.zero;
        }
    }
    Normalize(): void {
        this.copy(Vec4.Normalize(this));
    }
    /**
     * Get the length of the vector
     */
    static Magnitude(vector: Vec4): number {
        return Math.sqrt(this.Dot(vector, vector));
    }

    /**
     * Get the squared length of the vector.
     */
    static SqrMagnitude(vector: Vec4): number {
        return (
            vector.x * vector.x +
            vector.y * vector.y +
            vector.z * vector.z +
            vector.w * vector.w
        );
    }

    /**
     * Get distance from this point to another point
     */
    static Distance(a: Vec4, b: Vec4): number {
        return this.Magnitude(this.Subtract(a, b));
    }

    /**
     * Get squared distance from this point to another point
     */
    static SqrDistance(a: Vec4, b: Vec4): number {
        return (
            (a.x - b.x) * (a.x - b.x) +
            (a.y - b.y) * (a.y - b.y) +
            (a.z - b.z) * (a.z - b.z) +
            (a.w - b.w) * (a.w - b.w)
        );
    }

    static Dot(a: Vec4, b: Vec4): number {
        return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
    }
    static Project(a: Vec4, b: Vec4): Vec4 {
        const sqrMag = this.Dot(b, b);
        if (sqrMag < Mathf.Epsilon) {
            return Vec4.zero;
        }
        return Vec4.Multiply(b, this.Dot(a, b) / sqrMag);
    }

    static ToVec4(v: Vec2): Vec4;
    static ToVec4(v: Vec3): Vec4;
    static ToVec4(v: Vec2 | Vec3): Vec4 {
        return v instanceof Vec2
            ? new Vec4(v.x, v.y, 0.0, 0.0)
            : new Vec4(v.x, v.y, v.z, 0.0);
    }
    static ToVec3(v: Vec4): Vec3 {
        return new Vec3(v.x, v.y, v.z);
    }
    static ToVec2(v: Vec4): Vec2 {
        return new Vec2(v.x, v.y);
    }
}

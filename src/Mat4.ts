import { Quaternion } from './Quat';
import { Vec3 } from './Vec3';
import { Vec4 } from './Vec4';

export class Mat4 {
    // memory layout:
    //
    //                row no (=vertical)
    //               |  0   1   2   3
    //            ---+----------------
    //            0  | m00 m10 m20 m30
    // column no  1  | m01 m11 m21 m31
    // (=horiz)   2  | m02 m12 m22 m32
    //            3  | m03 m13 m23 m33

    m00: number;
    m10: number;
    m20: number;
    m30: number;

    m01: number;
    m11: number;
    m21: number;
    m31: number;

    m02: number;
    m12: number;
    m22: number;
    m32: number;

    m03: number;
    m13: number;
    m23: number;
    m33: number;

    constructor(column0: Vec4, column1: Vec4, column2: Vec4, column3: Vec4) {
        this.m00 = column0.x;
        this.m01 = column1.x;
        this.m02 = column2.x;
        this.m03 = column3.x;
        this.m10 = column0.y;
        this.m11 = column1.y;
        this.m12 = column2.y;
        this.m13 = column3.y;
        this.m20 = column0.z;
        this.m21 = column1.z;
        this.m22 = column2.z;
        this.m23 = column3.z;
        this.m30 = column0.w;
        this.m31 = column1.w;
        this.m32 = column2.w;
        this.m33 = column3.w;
    }
    /**
     * Returns the identity matri
     */
    static get identity(): Mat4 {
        return new Mat4(
            new Vec4(1, 0, 0, 0),
            new Vec4(0, 1, 0, 0),
            new Vec4(0, 0, 1, 0),
            new Vec4(0, 0, 0, 1)
        );
    }
    /**
     * Returns a matrix with all elements set to zero
     */
    static get zero(): Mat4 {
        return new Mat4(
            new Vec4(0, 0, 0, 0),
            new Vec4(0, 0, 0, 0),
            new Vec4(0, 0, 0, 0),
            new Vec4(0, 0, 0, 0)
        );
    }

    private getDeterminant(): number {
        let res = 0.0;

        // Cache the matrix values (speed optimization)
        const a00 = this.m00,
            a01 = this.m10,
            a02 = this.m20,
            a03 = this.m30;
        const a10 = this.m01,
            a11 = this.m11,
            a12 = this.m21,
            a13 = this.m31;
        const a20 = this.m02,
            a21 = this.m12,
            a22 = this.m22,
            a23 = this.m32;
        const a30 = this.m03,
            a31 = this.m13,
            a32 = this.m23,
            a33 = this.m33;

        res =
            a30 * a21 * a12 * a03 -
            a20 * a31 * a12 * a03 -
            a30 * a11 * a22 * a03 +
            a10 * a31 * a22 * a03 +
            a20 * a11 * a32 * a03 -
            a10 * a21 * a32 * a03 -
            a30 * a21 * a02 * a13 +
            a20 * a31 * a02 * a13 +
            a30 * a01 * a22 * a13 -
            a00 * a31 * a22 * a13 -
            a20 * a01 * a32 * a13 +
            a00 * a21 * a32 * a13 +
            a30 * a11 * a02 * a23 -
            a10 * a31 * a02 * a23 -
            a30 * a01 * a12 * a23 +
            a00 * a31 * a12 * a23 +
            a10 * a01 * a32 * a23 -
            a00 * a11 * a32 * a23 -
            a20 * a11 * a02 * a33 +
            a10 * a21 * a02 * a33 +
            a20 * a01 * a12 * a33 -
            a00 * a21 * a12 * a33 -
            a10 * a01 * a22 * a33 +
            a00 * a11 * a22 * a33;

        return res;
    }

    static determinant(m: Mat4): number {
        return m.determinant;
    }
    /**
     * The determinant of the matrix
     */
    get determinant(): number {
        return this.getDeterminant();
    }
    /**
        * Invert provided matrix
        * If determinant is zero, the matrix will be set to zero matrix.
        * TODO:if determinant is zero return current matrix (do not change it)
        * throw your nan when only positive numbers (determinant is zero)
    */
    static inverse(m: Mat4): Mat4 {
        const res = Mat4.zero;

        // Cache the matrix values (speed optimization)
        const a00 = m.m00, a01 = m.m01, a02 = m.m02, a03 = m.m03;
        const a10 = m.m10, a11 = m.m11, a12 = m.m12, a13 = m.m13
        const a20 = m.m20, a21 = m.m21, a22 = m.m22, a23 = m.m23;
        const a30 = m.m30, a31 = m.m31, a32 = m.m32, a33 = m.m33;

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

        // Calculate the invert determinant (inlined to avoid double-caching)
        const invDet = 1.0 / (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06);

        res.m00 = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        res.m01 = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        res.m02 = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        res.m03 = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;

        res.m10 = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        res.m11 = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        res.m12 = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        res.m13 = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;

        res.m20 = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        res.m21 = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        res.m22 = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        res.m23 = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;

        res.m30 = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        res.m31 = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        res.m32 = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        res.m33 = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return res;
    }
    /**
     * the determinant of the matrix.
     */
    get inverse(): Mat4 {
        return Mat4.inverse(this);
    }
    private getRotation(): Quaternion {
        const res = Quaternion.identity;
        const fourWSquaredMinus1 = this.m00 + this.m11 + this.m22;
        const fourXSquaredMinus1 = this.m00 - this.m11 - this.m22;
        const fourYSquaredMinus1 = this.m11 - this.m00 - this.m22;
        const fourZSquaredMinus1 = this.m22 - this.m00 - this.m11;

        let biggestIndex = 0;
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

        const biggestVal = Math.sqrt(fourBiggestSquaredMinus1 + 1.0) * 0.5;
        const mult = 0.25 / biggestVal;

        switch (biggestIndex) {
            case 0:
                res.w = biggestVal;
                res.x = (this.m21 - this.m12) * mult;
                res.y = (this.m02 - this.m20) * mult;
                res.z = (this.m10 - this.m01) * mult;
                break;
            case 1:
                res.x = biggestVal;
                res.w = (this.m21 - this.m12) * mult;
                res.y = (this.m10 + this.m01) * mult;
                res.z = (this.m02 + this.m20) * mult;
                break;
            case 2:
                res.y = biggestVal;
                res.w = (this.m02 - this.m20) * mult;
                res.x = (this.m10 + this.m01) * mult;
                res.z = (this.m21 + this.m12) * mult;
                break;
            case 3:
                res.z = biggestVal;
                res.w = (this.m10 - this.m01) * mult;
                res.x = (this.m02 + this.m20) * mult;
                res.y = (this.m21 + this.m12) * mult;
                break;
        }

        return res;
    }
    /**
     * Attempts to get a rotation quaternion from this matrix
     */
    get rotation(): Quaternion {
        return this.getRotation();
    }
    static transpose(m: Mat4): Mat4 {
        const res = Mat4.zero;
        res.m00 = m.m00;
        res.m10 = m.m01;
        res.m20 = m.m02;
        res.m30 = m.m03;
        res.m01 = m.m10;
        res.m11 = m.m11;
        res.m21 = m.m12;
        res.m31 = m.m13;
        res.m02 = m.m20;
        res.m12 = m.m21;
        res.m22 = m.m22;
        res.m32 = m.m23;
        res.m03 = m.m30;
        res.m13 = m.m31;
        res.m23 = m.m32;
        res.m33 = m.m33;
        return res;
    }
    /**
     * Returns the transpose of this matrix
     */
    get transpose(): Mat4 {
        return Mat4.transpose(this);
    }

    GetColumn(index: number): Vec4 {
        switch (index) {
            case 0:
                return new Vec4(this.m00, this.m10, this.m20, this.m30);
            case 1:
                return new Vec4(this.m01, this.m11, this.m21, this.m31);
            case 2:
                return new Vec4(this.m02, this.m12, this.m22, this.m32);
            case 3:
                return new Vec4(this.m03, this.m13, this.m23, this.m33);
            default:
                throw new Error('Invalid column index!');
        }
    }
    GetRow(index: number): Vec4 {
        switch (index) {
            case 0:
                return new Vec4(this.m00, this.m01, this.m02, this.m03);
            case 1:
                return new Vec4(this.m10, this.m11, this.m12, this.m13);
            case 2:
                return new Vec4(this.m20, this.m21, this.m22, this.m23);
            case 3:
                return new Vec4(this.m30, this.m31, this.m32, this.m33);
            default:
                throw new Error('Invalid column index!');
        }
    }
    GetPosition(): Vec3 {
        return new Vec3(this.m03, this.m13, this.m23);
    }

    SetColumn(index: number, col: Vec4): void {
        this.GetColumn(index).x = col.x;
        this.GetColumn(index).y = col.y;
        this.GetColumn(index).z = col.z;
        this.GetColumn(index).w = col.w;
    }
    SetRow(index: number, row: Vec4): void {
        this.GetRow(index).x = row.x;
        this.GetRow(index).y = row.y;
        this.GetRow(index).z = row.z;
        this.GetRow(index).w = row.w;
    }

    /**
     * Multiplies two matrices
     */
    static mult(matA: Mat4, matB: Mat4): Mat4 {
        const res = Mat4.zero;

        res.m00 =
            matA.m00 * matB.m00 +
            matA.m01 * matB.m10 +
            matA.m02 * matB.m20 +
            matA.m03 * matB.m30;
        res.m01 =
            matA.m00 * matB.m01 +
            matA.m01 * matB.m11 +
            matA.m02 * matB.m21 +
            matA.m03 * matB.m31;
        res.m02 =
            matA.m00 * matB.m02 +
            matA.m01 * matB.m12 +
            matA.m02 * matB.m22 +
            matA.m03 * matB.m32;
        res.m03 =
            matA.m00 * matB.m03 +
            matA.m01 * matB.m13 +
            matA.m02 * matB.m23 +
            matA.m03 * matB.m33;

        res.m10 =
            matA.m10 * matB.m00 +
            matA.m11 * matB.m10 +
            matA.m12 * matB.m20 +
            matA.m13 * matB.m30;
        res.m11 =
            matA.m10 * matB.m01 +
            matA.m11 * matB.m11 +
            matA.m12 * matB.m21 +
            matA.m13 * matB.m31;
        res.m12 =
            matA.m10 * matB.m02 +
            matA.m11 * matB.m12 +
            matA.m12 * matB.m22 +
            matA.m13 * matB.m32;
        res.m13 =
            matA.m10 * matB.m03 +
            matA.m11 * matB.m13 +
            matA.m12 * matB.m23 +
            matA.m13 * matB.m33;

        res.m20 =
            matA.m20 * matB.m00 +
            matA.m21 * matB.m10 +
            matA.m22 * matB.m20 +
            matA.m23 * matB.m30;
        res.m21 =
            matA.m20 * matB.m01 +
            matA.m21 * matB.m11 +
            matA.m22 * matB.m21 +
            matA.m23 * matB.m31;
        res.m22 =
            matA.m20 * matB.m02 +
            matA.m21 * matB.m12 +
            matA.m22 * matB.m22 +
            matA.m23 * matB.m32;
        res.m23 =
            matA.m20 * matB.m03 +
            matA.m21 * matB.m13 +
            matA.m22 * matB.m23 +
            matA.m23 * matB.m33;

        res.m30 =
            matA.m30 * matB.m00 +
            matA.m31 * matB.m10 +
            matA.m32 * matB.m20 +
            matA.m33 * matB.m30;
        res.m31 =
            matA.m30 * matB.m01 +
            matA.m31 * matB.m11 +
            matA.m32 * matB.m21 +
            matA.m33 * matB.m31;
        res.m32 =
            matA.m30 * matB.m02 +
            matA.m31 * matB.m12 +
            matA.m32 * matB.m22 +
            matA.m33 * matB.m32;
        res.m33 =
            matA.m30 * matB.m03 +
            matA.m31 * matB.m13 +
            matA.m32 * matB.m23 +
            matA.m33 * matB.m33;

        return res;
    }
    static mults(matA: Mat4, matB: Mat4): Mat4 {
        const res = Mat4.zero;

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                res[`m${i}${j}`] = 0;
                for (let k = 0; k < 4; k++) {
                    res[`m${i}${j}`] += matA[`m${i}${k}`] * matB[`m${k}${j}`];
                }
            }
        }

        return res;
    }
    /**
     * Transforms a Vec4 by a matrix
     */
    static multiplyVec4(mat: Mat4, vector: Vec4): Vec4 {
        const res = new Vec4();
        res.x =
            mat.m00 * vector.x +
            mat.m01 * vector.y +
            mat.m02 * vector.z +
            mat.m03 * vector.w;
        res.y =
            mat.m10 * vector.x +
            mat.m11 * vector.y +
            mat.m12 * vector.z +
            mat.m13 * vector.w;
        res.z =
            mat.m20 * vector.x +
            mat.m21 * vector.y +
            mat.m22 * vector.z +
            mat.m23 * vector.w;
        res.w =
            mat.m30 * vector.x +
            mat.m31 * vector.y +
            mat.m32 * vector.z +
            mat.m33 * vector.w;
        return res;
    }
    /**
     * Transforms a position by this matrix, with a perspective divide
     */
    multiplyPoint(point: Vec3): Vec3 {
        const res = new Vec3();
        let w: number;
        res.x =
            this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03;
        res.y =
            this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13;
        res.z =
            this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23;
        w = this.m30 * point.x + this.m31 * point.y + this.m32 * point.z + this.m33;

        w = 1 / w;
        res.x *= w;
        res.y *= w;
        res.z *= w;
        return res;
    }
    /**
     * Transforms a position by this matrix, without a perspective divide
     */
    multiplyPoint3x4(point: Vec3): Vec3 {
        const res = new Vec3();
        res.x =
            this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03;
        res.y =
            this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13;
        res.z =
            this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23;
        return res;
    }
    /**
     * Transforms a direction by this matrix
     */
    multiplyVector(vector: Vec3): Vec3 {
        const res = new Vec3();
        res.x = this.m00 * vector.x + this.m01 * vector.y + this.m02 * vector.z;
        res.y = this.m10 * vector.x + this.m11 * vector.y + this.m12 * vector.z;
        res.z = this.m20 * vector.x + this.m21 * vector.y + this.m22 * vector.z;
        return res;
    }
    /**
     * Creates a scaling matrix
     */
    static scale(vector: Vec3): Mat4 {
        const m = Mat4.zero;
        m.m00 = vector.x;
        m.m11 = vector.y;
        m.m22 = vector.z;
        m.m33 = 1;
        return m;
    }
    /**
     * Creates a translation matrix
     */
    static translate(vector: Vec3): Mat4 {
        const m = Mat4.identity;
        m.m30 = vector.x;
        m.m31 = vector.y;
        m.m32 = vector.z;
        return m;
    }
    /**
     * Creates a rotation matrix. Note: Assumes unit quaternion
     */
    static rotate(q: Quaternion): Mat4 {
        const mat = Mat4.identity;

        const a2 = q.x * q.x;
        const b2 = q.y * q.y;
        const c2 = q.z * q.z;
        const ac = q.x * q.z;
        const ab = q.x * q.y;
        const bc = q.y * q.z;
        const ad = q.w * q.x;
        const bd = q.w * q.y;
        const cd = q.w * q.z;

        mat.m00 = 1 - 2 * (b2 + c2);
        mat.m10 = 2 * (ab + cd);
        mat.m20 = 2 * (ac - bd);

        mat.m01 = 2 * (ab - cd);
        mat.m11 = 1 - 2 * (a2 + c2);
        mat.m21 = 2 * (bc + ad);

        mat.m02 = 2 * (ac + bd);
        mat.m12 = 2 * (bc - ad);
        mat.m22 = 1 - 2 * (a2 + b2);

        return mat;
    }
    /**
     * This function returns a projection matrix with viewing frustum that has a near plane defined by the coordinates that were passed in
     */
    static frustum(
        left: number,
        right: number,
        bottom: number,
        top: number,
        zNear: number,
        zFar: number
    ): Mat4 {
        const m = Mat4.zero;
        let rl = right - left;
        let tb = top - bottom;
        let fn = zFar - zNear;

        m.m00 = (zNear * 2.0) / rl;
        m.m11 = (zNear * 2.0) / tb;
        m.m20 = (right + left) / rl;
        m.m21 = (top + bottom) / tb;
        m.m22 = -(zFar + zNear) / fn;
        m.m23 = -1;
        m.m32 = -(zFar * zNear * 2.0) / fn;
        return m;
    }
    /**
     * Create a perspective projection matrix
     */
    static perspective(
        fov: number,
        aspect: number,
        zNear: number,
        zFar: number
    ): Mat4 {
        const res = Mat4.zero;
        const top = zNear * Math.tan(fov * 0.5);
        const bottom = -top;
        const right = top * aspect;
        const left = -right;

        // MatrixFrustum(-right, right, -top, top, near, far);
        const rl = right - left;
        const tb = top - bottom;
        const fn = zFar - zNear;

        res.m00 = (zNear * 2) / rl;
        res.m11 = (zNear * 2) / tb;
        res.m20 = (right + left) / rl;
        res.m21 = (top + bottom) / tb;
        res.m22 = -(zFar + zNear) / fn;
        res.m23 = -1;
        res.m32 = -(zFar * zNear * 2) / fn;

        return res;
    }
    /**
     * Create an orthogonal projection matrix
     */
    static ortho(
        left: number,
        right: number,
        bottom: number,
        top: number,
        zNear: number,
        zFar: number
    ): Mat4 {
        const res = Mat4.zero;

        const rl = right - left;
        const tb = top - bottom;
        const fn = zFar - zNear;

        res.m00 = 2.0 / rl;
        res.m11 = 2.0 / tb;
        res.m22 = -2.0 / fn;
        res.m30 = -(left + right) / rl;
        res.m31 = -(top + bottom) / tb;
        res.m32 = -(zFar + zNear) / fn;
        res.m33 = 1.0;

        return res;
    }
    /**
     * Create a "look at" matrix.
     */
    static lookAt(from: Vec3, to: Vec3, up: Vec3): Mat4 {
        const res = Mat4.zero;

        let length = 0.0;
        let ilength = 0.0;

        // Vector3Subtract(eye, target)
        const vz = Vec3.sub(from, to);

        // Vector3Normalize(vz)
        let v = vz;
        length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        if (length == 0.0) length = 1.0;
        ilength = 1.0 / length;
        vz.x *= ilength;
        vz.y *= ilength;
        vz.z *= ilength;

        // Vector3CrossProduct(up, vz)
        const vx = Vec3.Cross(up, vz);

        // Vector3Normalize(x)
        v = vx;
        length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        if (length == 0.0) length = 1.0;
        ilength = 1.0 / length;
        vx.x *= ilength;
        vx.y *= ilength;
        vx.z *= ilength;

        // Vector3CrossProduct(vz, vx)
        const vy = Vec3.Cross(vz, vx);

        res.m00 = vx.x;
        res.m10 = vy.x;
        res.m20 = vz.x;
        res.m30 = 0.0;
        res.m01 = vx.y;
        res.m11 = vy.y;
        res.m21 = vz.y;
        res.m31 = 0.0;
        res.m02 = vx.z;
        res.m12 = vy.z;
        res.m22 = vz.z;
        res.m32 = 0.0;
        res.m03 = -(vx.x * from.x + vx.y * from.y + vx.z * from.z);
        res.m13 = -(vy.x * from.x + vy.y * from.y + vy.z * from.z);
        res.m23 = -(vz.x * from.x + vz.y * from.y + vz.z * from.z);
        res.m33 = 1.0;

        return res;
    }
    /**
    * Creates a TRS matrix from the provided translation, rotation, and scale values.
    * @param translation - The translation to apply.
    * @param rotation - The rotation to apply.
    * @param scale - The scale to apply.
    * TODO:Make sure this work correctly
    */
    static TRS(translation: Vec3, rotation: Quaternion, scale: Vec3): Mat4 {
        return Mat4.mults(
            Mat4.mults(this.translate(translation), this.rotate(rotation)),
            this.scale(scale)
        );
    }
    // TODO:makesure this work correctly
    SetTRS(translation: Vec3, rotation: Quaternion, scale: Vec3): void {
        Mat4.TRS(translation, rotation, scale);
        console.log(Mat4.TRS(translation, rotation, scale));
    }
    // print matrix to console
    static print(m: Mat4): void {
        console.log("+------+------+------+------+");
        for (let i = 0; i < 4; i++) {
            let row = "|";
            for (let j = 0; j < 4; j++) {
                //@ts-ignore
                row += ` ${m[`m${i}${j}`].toFixed(2).toString().padEnd(4, ' ')} |`;
            }
            console.log(row);
            console.log("+------+------+------+------+");
        }
    }
}

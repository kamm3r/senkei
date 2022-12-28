type FixedSizeArray<T, N extends number> = N extends N ? number extends N ? T[] : _FixedSizeArray<T, N, []> : never;
type _FixedSizeArray<T, N extends number, R extends unknown[]> = R['length'] extends N ? R : _FixedSizeArray<T, N, [T, ...R]>;

type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;
type Float32ArrayWithoutIndex = Pick<Float32Array, KnownKeys<Float32Array>>;

type FixedSizeFloat32Array<N extends number> = FixedSizeArray<number, N> & Float32ArrayWithoutIndex;

type i8 = Int8Array
type i16 = Int16Array
type i32 = Int32Array
type i64 = BigInt64Array

type u8 = Uint8Array
type u16 = Uint16Array
type u32 = Uint32Array
type u64 = BigUint64Array

type f32 = Float32Array
type f64 = Float64Array

type vec<T> = T

export interface Color {
    r: number
    g: number
    b: number
    a: number
}
export interface Quat {
    x: number
    y: number
    z: number
    w: number
}

export interface Vec2 {
    x: number
    y: number
}

export interface Vec3 {
    x: number
    y: number
    z: number
}

export interface Vec4 {
    x: number
    y: number
    z: number
    w: number
}

export interface Mat2 {
    m00: number
    m01: number
    m10: number
    m11: number
}
export interface Mat2x3 {
    m00: number
    m01: number
    m02: number
    m10: number
    m11: number
    m12: number
}

export interface Mat3 {
    m00: number
    m01: number
    m02: number
    m10: number
    m11: number
    m12: number
    m30: number
    m31: number
    m32: number
}
export interface Mat3x4 {
    m00: number
    m01: number
    m02: number
    m03: number
    m10: number
    m11: number
    m12: number
    m13: number
    m30: number
    m31: number
    m32: number
    m33: number
}

export interface Mat4 {
    m00: number
    m01: number
    m02: number
    m03: number
    m10: number
    m11: number
    m12: number
    m13: number
    m30: number
    m31: number
    m32: number
    m33: number
    m40: number
    m41: number
    m42: number
    m43: number
}

export type TypedArray = Float32Array | []

export type vec2 = [number, number] | IndexedCollection
export type vec3 = [number, number, number] | IndexedCollection
export type vec4 = [number, number, number, number] | IndexedCollection

export type uvec2 = [number, number] | IndexedCollection
export type uvec3 = [number, number, number] | IndexedCollection
export type uvec4 = [number, number, number, number] | IndexedCollection

export type ivec2 = [number, number] | Int32Array
export type ivec3 = [number, number, number] | Int32Array
export type ivec4 = [number, number, number, number] | Int32Array

export type quat = [number, number, number, number] | IndexedCollection

export type mat2 =
    [number, number,
        number, number] | IndexedCollection
export type mat2x3 = [number, number,
    number, number,
    number, number] | IndexedCollection
export type mat3x2 = [number, number, number,
    number, number, number] | IndexedCollection
export type mat3 = [number, number, number,
    number, number, number,
    number, number, number] | IndexedCollection
export type mat3x4 = [number, number, number, number,
    number, number, number, number,
    number, number, number, number] | IndexedCollection
export type mat4 = [number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number] | IndexedCollection

export type Triangle = [vec2, vec2, vec2]

export interface IndexedCollection extends Iterable<number> {
    readonly length: number;
    [index: number]: number;
}

export const rotationOrder = {
    XYZ: 'XYZ',
    XZY: 'XZY',
    YXZ: 'YXZ',
    YZX: 'YZX',
    ZXY: 'ZXY',
    ZYX: 'ZYX'
} as const

export type RotationOrder = keyof typeof rotationOrder

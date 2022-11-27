export const Infinity = Number.POSITIVE_INFINITY
export const NegativeInfinity = Number.NEGATIVE_INFINITY
export const TAU = 6.28318530717959
export const GOLDEN_RATIO = 1.61803398875
export const Deg2Rad = 0.01745329
export const Rad2Deg = 57.29578
export const EPSILON = Number.EPSILON
// export const EPSILON = 0.000001
// <summary>A very small value, used for various floating point inaccuracy thresholds</summary>
// public static readonly float Epsilon = UnityEngineInternal.MathfInternal.IsFlushToZeroEnabled ? UnityEngineInternal.MathfInternal.FloatMinNormal : UnityEngineInternal.MathfInternal.FloatMinDenormal;

export const Mat = Float32Array
export const Vec = Float32Array
// export const Vec = Uint32Array

/**
 * Convert Degree to Radian
 * @param {Number} a Angle in Degrees 
 */

export const toRadian = (a: number): number => {
    return Deg2Rad * a
}

/**
 * Convert Radian to Degree
 * @param {Number} a Angle in Degrees 
 */

export const toDegree = (a: number): number => {
    return Rad2Deg * a
}
/**
 * 
 * @param {number} value current value
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @returns {number}
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max)
}
export const clamps = (value: number, min: number, max: number): number => value < min ? min : value > max ? max : value;
export const clamp01 = (value: number): number => {
    if (value < 0) {
        return 0
    } else if (value > 1) {
        return 1
    } else {
        return value
    }
}
//Returns the value clamped between 0 and 1
export const clamp02 = (value: number): number => value < 0 ? 0 : value > 1 ? 1 : value;
export const repeat = (t: number, length: number): number => {
    return clamp(t - Math.floor(t / length) * length, 0, length);
}

export const lerp = (a: number, b: number, t: number): number => a + (b - a) * clamp01(t)

export const lerps = (a: number, b: number, t: number): number => (1 - t) * a + t * b;

export const lerpUnclamped = (a: number, b: number, t: number): number => {
    return a + (b - a) * clamp01(t)
}

export const lerpAngle = (a: number, b: number, t: number): number => {
    let delta = repeat((b - a), TAU)
    if (delta > Math.PI) delta -= TAU
    return a + delta * clamp01(t)
}
export const moveTowards = (current: number, target: number, maxDelta: number): number => {
    if (Math.abs(target - current) <= maxDelta) target;
    return current + Math.sign(target - current) * maxDelta;
}
export const moveTowardsAngle = (current: number, target: number, maxDelta: number): number => {
    let deltaAng = deltaAngle(current, target)
    if (-maxDelta < deltaAng && deltaAng < maxDelta) target;
    target = current + deltaAng
    return moveTowards(current, target, maxDelta)
}


export const smoothDamp = (current: number, target: number, currentVelocity: number, smoothTime: number, maxSpeed: number, deltaTime: number): number => {
    // Based on Game Programming Gems 4 Chapter 1.10
    smoothTime = Math.max(0.0001, smoothTime)
    let omega = 2 / smoothTime

    let x = omega * deltaTime
    let exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x)
    let change = current - target
    let originalTo = target

    // Clamp maximum speed
    let maxChange = maxSpeed * smoothTime
    change = clamp(change, -maxChange, maxChange)
    target = current - change

    let temp = (currentVelocity + omega * change) * deltaTime
    currentVelocity = (currentVelocity - omega * temp) * exp
    let output = target + (change + temp) * exp

    // Prevent overshooting
    if (originalTo - current > 0 === output > originalTo) {
        output = originalTo
        currentVelocity = (output - originalTo) / deltaTime
    }
    return output
}
export const smoothDampAngle = (current: number, target: number, currentVelocity: number, smoothTime: number, maxSpeed = Infinity, deltaTime: number): number => {
    target = current + deltaAngle(current, target);
    return smoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
}
export const smoothStep = (from: number, to: number, t: number): number => {
    if (t < from) 0;
    if (t >= to) 1;
    t = (t - from) / (to - from)
    return t * t * (3 - 2 * t)
}

export const inverseLerp = (a: number, b: number, value: number): number => (value - a) / (b - a);
// Calculates the shortest difference between two given angles.
export const deltaAngle = (current: number, target: number): number => {
    let delta = repeat((target - current), 360)
    if (delta > 180) delta -= 360
    return delta
}
export const deltaAngles = (a: number, b: number): number => repeat((b - a + Math.PI), TAU) - Math.PI
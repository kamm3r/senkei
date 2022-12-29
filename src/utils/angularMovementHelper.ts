import { DeltaAngle } from "./angleRotation";
import { moveTowards, smoothDamp } from "./movementHelpers";

/**
 * Same as MoveTowards but makes sure the angles interpolate correctly when they wrap around a full turn.
 * Variables current and target are assumed to be in radians.
 * For optimization reasons, negative values of maxDelta are not supported and may cause oscillation.
 * To push current away from a target angle, add 180 to that angle instead.
 * @param current The current angle
 * @param target The angle to move towards
 * @param maxDelta The maximum change that should be applied to the value
 * 
 */
export const moveTowardsAngle = (current: number, target: number, maxDelta: number): number => {
    let deltaAng = DeltaAngle(current, target)
    if (-maxDelta < deltaAng && deltaAng < maxDelta) target;
    target = current + deltaAng
    return moveTowards(current, target, maxDelta)
}
/**
 * Gradually changes an angle given in radians towards a desired goal angle over time.
 * The value is smoothed by some spring-damper like function. 
 * The function can be used to smooth any kind of value, positions, colors, scalars. The most common use is for smoothing a follow camera.
 * @param current The current angle
 * @param target The angle we are trying to reach
 * @param currentVelocity The current angular velocity, this value is modified by the function every time you call it
 * @param smoothTime Approximately the time it will take to reach the target. A smaller value will reach the target faster
 * @param maxSpeed Optionally allows you to clamp the maximum speed
 * @param deltaTime The time since the last call to this function. By default Time.deltaTime 
 */
export const smoothDampAngle = (current: number, target: number, currentVelocity: number, smoothTime: number, maxSpeed = Infinity, deltaTime: number): number => {
    target = current + DeltaAngle(current, target);
    return smoothDamp(current, target, currentVelocity, smoothTime, maxSpeed, deltaTime);
}
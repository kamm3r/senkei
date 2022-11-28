import { clamp } from "./clamp";

export const moveTowards = (current: number, target: number, maxDelta: number): number => {
    if (Math.abs(target - current) <= maxDelta) target;
    return current + Math.sign(target - current) * maxDelta;
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
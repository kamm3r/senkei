import { vec2 } from "../types";
import * as Vec2 from "../vec2";
import * as mathf from './'

/**
 * 
 * @param c The input position inside the square
 * @returns Given a position within a -1 to 1 square, remaps it to the unit circle
 */
export const SquareToDisc = (c: vec2): vec2 => {
    c[0] = mathf.clampNeg1to1(c[0])
    c[1] = mathf.clampNeg1to1(c[1])
    const u = c[0] * mathf.Sqrt(1 - (c[1] * c[1]) / 2)
    const v = c[1] * mathf.Sqrt(1 - (c[0] * c[0]) / 2)
    return Vec2.create(u, v)
}
/**
 * 
 * @param c The input position inside the circle
 * @returns Given a position within the unit circle, remaps it to a square in the -1 to 1 range 
 */
export const DiscToSquare = (c: vec2): vec2 => {
    c = mathf.ClampMagnitude(c, 0, 1)
    const u2 = c[0] * c[0]
    const v2 = c[1] * c[1]
    const n = Vec2.create(1, -1)
    const p = Vec2.create(2 + n[0] * (u2 - v2), 2 + n[1] * (u2 - v2))
    const q = Vec2.create(2 * mathf.SQRT2 * c[0], 2 * mathf.SQRT2 * c[1])
    const smolVec = Vec2.create(Vec2.one[0] * mathf.kEpsilon, Vec2.one[1] * mathf.kEpsilon)
    const s = mathf.Sqrt2(Vec2.Max(smolVec, Vec2.create(p[0] + q[0], p[1] + q[1])))
    const d = mathf.Sqrt2(Vec2.Max(smolVec, Vec2.create(p[0] - q[0], p[1] - q[1])))
    return Vec2.create(0.5 * (s[0] - d[0]), 0.5 * (s[1] - d[1]))
}
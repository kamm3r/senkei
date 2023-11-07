import { Mathf } from "../Utils"
import { Vec2 } from "../Vec2"
import { clampNeg1to1 } from "./Mathf"
import { kEpsilon } from "./floatingPoints"
import { Sqrt, Sqrt2 } from "./mathOperation"
import { ClampMagnitude } from "./vectorMath"

/**
 *
 * @param c The input position inside the square
 * @returns Given a position within a -1 to 1 square, remaps it to the unit circle
 */
export function SquareToDisc(c: Vec2): Vec2 {
    c.x = clampNeg1to1(c.x)
    c.y = clampNeg1to1(c.y)
    const u = c.x * Sqrt(1 - (c.y * c.y) / 2)
    const v = c.y * Sqrt(1 - (c.x * c.x) / 2)
    return new Vec2(u, v)
}
/**
 *
 * @param c The input position inside the circle
 * @returns Given a position within the unit circle, remaps it to a square in the -1 to 1 range
 */
export function DiscToSquare(c: Vec2): Vec2 {
    c = ClampMagnitude(c, 0, 1)
    const u2 = c.x * c.x
    const v2 = c.y * c.y
    const n = new Vec2(1, -1)
    const p = new  Vec2(2 + n.x * (u2 - v2), 2 + n.y * (u2 - v2))
    const q = new Vec2(2 * Mathf.SQRT2 * c.x, 2 * Mathf.SQRT2 * c.y)
    const smolVec = new Vec2(Vec2.one.x * kEpsilon, Vec2.one.y * kEpsilon)
    const s = Sqrt2(Vec2.Max(smolVec, new Vec2(p.x + q.x, p.y + q.y)))
    const d = Sqrt2(Vec2.Max(smolVec, new Vec2(p.x - q.x, p.y - q.y)))
    return new Vec2(0.5 * (s.x - d.x), 0.5 * (s.y - d.y))
}

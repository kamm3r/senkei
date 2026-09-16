[![Size](https://img.shields.io/bundlephobia/minzip/senkei?label=gzip&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/senkei)
[![Version](https://img.shields.io/npm/v/senkei?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/senkei)
[![Downloads](https://img.shields.io/npm/dt/senkei.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/senkei)

# Senkei

Unity-like gamedev math for JavaScript and TypeScript. Vectors, quaternions, matrices, transforms, and float helpers with a familiar PascalCase API.

Zero dependencies. Tree-shakeable ESM + CJS with full types.

```bash
npm install senkei
# pnpm add senkei
# yarn add senkei
# bun add senkei
```

```ts
import { Vec3, Quaternion, Mat4, Transform } from 'senkei';

// Unity-like API with PascalCase members.
const point = new Vec3(2, 4, 10);

console.log('add two vectors', Vec3.Add(point, new Vec3(34, 3, 2)));

const t = new Transform();
t.position = new Vec3(0, 1, 0);
t.LookAt(new Vec3(0, 1, 5));
console.log('forward', t.forward);
```

## Features

- `Vec2`, `Vec3`, `Vec4` — arithmetic, dot / cross / angle, reflect / project, lerp / slerp / smooth-damp / move-towards, clamp-magnitude
- `Quaternion` — Euler, AngleAxis, FromToRotation, LookRotation, slerp / lerp / nlerp, rotate-towards, point rotation
- `Mat4` — column-major 4x4, TRS composition, Translate / Rotate / Scale, Perspective / Ortho / Frustum / LookAt, safe inverse
- `Transform` — parent / child hierarchies, world + local position / rotation / scale, Translate / Rotate / RotateAround / LookAt, point / direction / vector conversion
- `Mathf` — Deg2Rad / Rad2Deg, Clamp / Clamp01, Lerp, Approximately, float constants
- Predictable memory semantics: static methods allocate, instance methods mutate, getters return copies — no hidden aliasing
- Typed, tested, and benchmarked (`vitest`, `bench/perf.mjs`)

## Usage

Static methods return fresh objects, so inputs stay untouched:

```ts
import { Vec3, Quaternion, Mat4, Transform, Mathf, Space } from 'senkei';

const a = new Vec3(2, 4, 10);
const b = new Vec3(34, 3, 2);

const sum = Vec3.Add(a, b); // a and b unchanged
const dir = Vec3.Normalize(b);
const mid = Vec3.Lerp(a, b, 0.5);

// Rotations compose right-to-left: right-hand rotation applies first.
const turn = Quaternion.Euler(new Vec3(0, 45, 0));
const tilted = Quaternion.AngleAxis(30, Vec3.right);
const combined = Quaternion.Multiply(turn, tilted);
const rotated = Quaternion.Multiply(turn, a);

// Matrices: TRS fuses translation + rotation + scale in one allocation.
const m = Mat4.TRS(a, turn, new Vec3(2, 2, 2));
const projected = m.MultiplyPoint(a);

// Transforms: hierarchies with dirty-flag cached matrices.
const parent = new Transform();
parent.position = new Vec3(10, 0, 0);

const child = new Transform();
child.SetParent(parent); // keeps world transform by default
child.Translate(new Vec3(0, 0, -1), Space.Self);
child.LookAt(new Vec3(0, 1, 5));

const world = child.TransformPoint(new Vec3(1, 0, 0));

// Float helpers follow Unity semantics (Lerp clamps t to 0..1).
const t = Mathf.Clamp01(1.5); // 1
const angle = 90 * Mathf.Deg2Rad; // π/2
```

## API overview

| Export | What it does | Docs |
| --- | --- | --- |
| `Vec2` / `Vec3` / `Vec4` | 2D / 3D / 4D points, directions, and blending | [docs/vectors](docs/vectors.mdx) |
| `Quaternion` | Rotations without gimbal lock | [docs/quaternions](docs/quaternions.mdx) |
| `Mat4` | Column-major 4x4 transforms and projections | [docs/matrices](docs/matrices.mdx) |
| `Transform`, `Space` | Scene-graph nodes and coordinate spaces | [docs/transforms](docs/transforms.mdx) |
| `Mathf` | Constants and float helpers | [docs/mathf](docs/mathf.mdx) |

Start with [docs/](docs/index.mdx) for install + first animation.

## Design principles

- **Unity familiarity:** `Vec3.Lerp`, `Quaternion.Slerp`, `Mat4.TRS`, `Transform.LookAt`, `Mathf.Approximately`, `Space.World` / `Space.Self`.
- **No aliasing bugs:** statics like `Vec3.Add(a, b)` allocate; instance methods like `v.Normalize()` mutate; getters like `magnitude`, `normalized`, `localToWorldMatrix`, and `position` hand out copies.
- **Explicit failures:** singular matrix inversion throws instead of returning NaNs; parenting onto your own descendant throws instead of creating a cycle.
- **Degrees at the boundary, radians inside:** `Euler` / `eulerAngles` / `AngleAxis` use degrees; `toAxisAngle` returns radians.

## Documentation

Guides for every class live in [docs/](docs/):

- [Getting started](docs/index.mdx)
- [Vectors](docs/vectors.mdx)
- [Quaternions](docs/quaternions.mdx)
- [Matrices](docs/matrices.mdx)
- [Transforms](docs/transforms.mdx)
- [Mathf](docs/mathf.mdx)

## Development

```bash
pnpm install
pnpm run lint      # tsc
pnpm vitest run    # tests
pnpm run build     # tsup -> dist/ (cjs, esm, dts)
pnpm run benchmark # build + node bench/perf.mjs
```

## License

[MIT](LICENSE)

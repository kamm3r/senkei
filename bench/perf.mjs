// Perf feedback loop: measures hot paths of the BUILT bundle.
// Run: pnpm run build && node bench/perf.mjs
// Inputs are precomputed pools, so each line measures the op only.
import {
    Vec2,
    Vec3,
    Vec4,
    Quaternion,
    Mat4,
    Transform,
    Mathf,
} from '../dist/index.js';

const ITERS = 200_000;
const POOL = 1024;

const VS = Array.from(
    { length: POOL },
    (_, i) => new Vec3((i % 7) + 1, ((i + 3) % 5) + 1, ((i + 5) % 9) + 1)
);
const QS = Array.from({ length: POOL }, (_, i) =>
    Quaternion.AngleAxis((i * 37) % 360, Vec3.Normalize(new Vec3(1, 1, 1)))
);
const MS = VS.map(
    (v, i) => Mat4.TRS(v, QS[i], new Vec3(2, 2, 2))
);
const v = (i) => VS[i & (POOL - 1)];
const q = (i) => QS[i & (POOL - 1)];

function bench(name, fn) {
    for (let i = 0; i < 10_000; i++) fn(i); // warmup
    let acc = 0;
    const t0 = performance.now();
    for (let i = 0; i < ITERS; i++) acc += fn(i);
    const t1 = performance.now();
    // acc sink: prevents dead-code elimination, keeps numbers comparable
    console.log(
        `${name}: ${(((t1 - t0) / ITERS) * 1e6).toFixed(1)} ns/op (sink=${acc.toFixed(1)})`
    );
}

bench('Vec3.Add', (i) => Vec3.Add(v(i), v(i + 1)).x);
bench('Vec3.Normalize', (i) => Vec3.Normalize(v(i)).x);
bench('Vec3.Dot+Cross', (i) => Vec3.Dot(v(i), v(i + 1)) + Vec3.Cross(v(i), v(i + 1)).x);
bench('Vec3.Angle', (i) => Vec3.Angle(v(i), v(i + 1)));
bench('Vec3.SmoothDamp', (i) => Vec3.SmoothDamp(v(0), v(i + 1), new Vec3(), 0.3, 100, 1 / 60).value.x);
bench('Quat.Multiply(q,q)', (i) => Quaternion.Multiply(q(i), q(i + 1)).w);
bench('Quat.Multiply(q,v)', (i) => Quaternion.Multiply(q(i), v(i)).x);
bench('Quat.Slerp', (i) => Quaternion.Slerp(q(i), q(i + 1), 0.37).w);
bench('Quat.LookRotation', (i) => Quaternion.LookRotation(v(i)).w);
bench('Quat.eulerAngles', (i) => q(i).eulerAngles.x);
bench('Mat4.Multiply', (i) => Mat4.Multiply(MS[i & (POOL - 1)], MS[(i + 1) & (POOL - 1)]).m00);
bench('Mat4.TRS', (i) => Mat4.TRS(v(i), q(i), new Vec3(2, 2, 2)).m00);
bench('Mat4.inverse', (i) => MS[i & (POOL - 1)].inverse.m00);
bench('Mat4.LookAt', (i) => Mat4.LookAt(v(i), v(i + 1), Vec3.up).m00);

const root = new Transform();
root.position = new Vec3(10, 0, 0);
const mid = new Transform();
mid.position = new Vec3(0, 5, 0);
mid.SetParent(root, false);
const leaf = new Transform();
leaf.position = new Vec3(0, 0, 2);
leaf.SetParent(mid, false);
bench('Transform.position x3 chain', (i) => leaf.position.x + (i - i));
bench('Transform.TransformPoint', (i) => leaf.TransformPoint(v(i)).x);
bench('Transform.localToWorldMatrix', (i) => leaf.localToWorldMatrix.m00 + (i - i));
bench('Mathf.Lerp', (i) => Mathf.Lerp(0, 10, (i % 100) / 100));

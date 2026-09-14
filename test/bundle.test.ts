import { describe, expect, test } from 'vitest';
import { createRequire } from 'module';
import * as esm from '../dist/index.js';

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cjs = require('../dist/index.cjs');

describe('built bundle', () => {
    test('ESM entry exposes the full public interface', () => {
        for (const key of [
            'Vec2',
            'Vec3',
            'Vec4',
            'Quaternion',
            'Mat4',
            'Transform',
            'Space',
            'Mathf',
        ]) {
            expect(esm[key], key).toBeDefined();
        }
    });

    test('ESM bundle behaves like source', () => {
        const v = esm.Vec3.add(new esm.Vec3(1, 2, 3), new esm.Vec3(4, 5, 6));
        expect([v.x, v.y, v.z]).toEqual([5, 7, 9]);
        expect(esm.Mathf.PI).toBeCloseTo(Math.PI, 6);
        expect(esm.Mathf.Deg2Rad).toBeCloseTo(Math.PI / 180, 8);
        expect(esm.Space.Self).toBe('Self');
        expect(esm.Space.World).toBe('World');

        const t = new esm.Transform();
        t.translation = new esm.Vec3(1, 2, 3);
        expect([t.translation.x, t.translation.y, t.translation.z]).toEqual([
            1, 2, 3,
        ]);
    });

    test('CJS entry matches ESM behavior', () => {
        const v = cjs.Vec3.add(new cjs.Vec3(1, 2, 3), new cjs.Vec3(4, 5, 6));
        expect([v.x, v.y, v.z]).toEqual([5, 7, 9]);
        expect(cjs.Mathf.PI).toBeCloseTo(Math.PI, 6);

        const t = new cjs.Transform();
        expect(t.translation.x).toBe(0);
        expect(t.hasChanged).toBe(false);
    });
});

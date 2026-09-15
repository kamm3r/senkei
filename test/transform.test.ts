import { describe, expect, test } from 'vitest';
import { Transform, Space } from '../src/Transform';
import { Vec3 } from '../src/Vec3';
import { Quaternion } from '../src/Quat';
import { expectQuatClose, expectVec3Close } from './helpers';

describe('Transform', () => {
    test('defaults: origin, identity, unit scale, no parent', () => {
        const t = new Transform();
        expectVec3Close(t.position, 0, 0, 0);
        expectVec3Close(t.localPosition, 0, 0, 0);
        expectQuatClose(t.rotation, 0, 0, 0, 1);
        expectQuatClose(t.localRotation, 0, 0, 0, 1);
        expectVec3Close(t.localScale, 1, 1, 1);
        expectVec3Close(t.lossyScale, 1, 1, 1);
        expect(t.parent).toBeNull();
        expect(t.childCount).toBe(0);
        expect(t.hasChanged).toBe(false);
    });

    test('Space enum is frozen', () => {
        expect(Object.isFrozen(Space)).toBe(true);
        expect(Space.Self).toBe('Self');
        expect(Space.World).toBe('World');
    });

    test('getters return copies, setters copy in', () => {
        const t = new Transform();
        const leaked = t.position;
        leaked.x = 99;
        expect(t.position.x).toBe(0);

        const p = new Vec3(1, 2, 3);
        t.position = p;
        p.x = 99;
        expectVec3Close(t.position, 1, 2, 3);
    });

    test('local setters flag hasChanged', () => {
        const t = new Transform();
        t.localPosition = new Vec3(1, 0, 0);
        expect(t.hasChanged).toBe(true);
        t.hasChanged = false;
        t.localRotation = Quaternion.identity;
        expect(t.hasChanged).toBe(true);
        t.hasChanged = false;
        t.localScale = new Vec3(2, 2, 2);
        expect(t.hasChanged).toBe(true);
    });

    test('axis getters at identity', () => {
        const t = new Transform();
        expectVec3Close(t.forward, 0, 0, 1);
        expectVec3Close(t.up, 0, 1, 0);
        expectVec3Close(t.right, 1, 0, 0);
    });

    test('forward setter points +Z along the value', () => {
        const t = new Transform();
        t.forward = new Vec3(1, 0, 0);
        expectVec3Close(t.forward, 1, 0, 0);
        expectVec3Close(t.up, 0, 1, 0);
    });

    test('eulerAngles round-trip', () => {
        const t = new Transform();
        t.eulerAngles = new Vec3(0, 45, 0);
        expectVec3Close(t.forward, Math.SQRT1_2, 0, Math.SQRT1_2);
        expectVec3Close(t.eulerAngles, 0, 45, 0);
    });

    test('Translate defaults to Self space', () => {
        const t = new Transform();
        t.eulerAngles = new Vec3(0, 90, 0);
        t.Translate(new Vec3(1, 0, 0));
        // +X in local space is -Z in world space after the yaw.
        expectVec3Close(t.position, 0, 0, -1);

        t.Translate(new Vec3(1, 0, 0), Space.World);
        expectVec3Close(t.position, 1, 0, -1);
    });

    test('Rotate in Self and World space', () => {
        const t = new Transform();
        t.Rotate(new Vec3(0, 90, 0), Space.Self);
        expectVec3Close(t.forward, 1, 0, 0);

        const w = new Transform();
        w.Rotate(new Vec3(0, 90, 0), Space.World);
        expectVec3Close(w.forward, 1, 0, 0);
        w.Rotate(new Vec3(0, 90, 0), Space.World);
        expectVec3Close(w.forward, 0, 0, -1);
    });

    test('RotateAround orbits position and spins rotation', () => {
        const t = new Transform();
        t.position = new Vec3(1, 0, 0);
        t.RotateAround(new Vec3(0, 0, 0), new Vec3(0, 1, 0), 90);
        expectVec3Close(t.position, 0, 0, -1);
        expectVec3Close(t.forward, 1, 0, 0);
    });

    test('LookAt points forward at the target without moving', () => {
        const t = new Transform();
        t.LookAt(new Vec3(0, 0, 5));
        expectVec3Close(t.forward, 0, 0, 1);
        expectVec3Close(t.position, 0, 0, 0);
    });

    test('LookAt accepts another Transform', () => {
        const t = new Transform();
        const target = new Transform();
        target.position = new Vec3(5, 0, 0);
        t.LookAt(target);
        expectVec3Close(t.forward, 1, 0, 0);
    });

    test('LookAt at own position is a no-op', () => {
        const t = new Transform();
        t.LookAt(new Vec3(0, 0, 0));
        expectQuatClose(t.rotation, 0, 0, 0, 1);
    });

    test('child world translation follows the parent', () => {
        const parent = new Transform();
        parent.position = new Vec3(10, 0, 0);
        const child = new Transform();
        child.localPosition = new Vec3(1, 2, 3);
        child.SetParent(parent, false);
        expectVec3Close(child.position, 11, 2, 3);
    });

    test('child world rotation composes with the parent', () => {
        const parent = new Transform();
        parent.eulerAngles = new Vec3(0, 90, 0);
        const child = new Transform();
        child.localPosition = new Vec3(1, 0, 0);
        child.SetParent(parent, false);
        expectVec3Close(child.position, 0, 0, -1);
        // The child's +Z axis rides the parent's 90-degree yaw: forward is +X.
        expectVec3Close(child.forward, 1, 0, 0);
    });

    test('world setter converts into local space', () => {
        const parent = new Transform();
        parent.position = new Vec3(10, 0, 0);
        const child = new Transform();
        child.SetParent(parent, false);
        child.position = new Vec3(15, 0, 0);
        expectVec3Close(child.localPosition, 5, 0, 0);
    });

    test('SetParent keeps world transform by default', () => {
        const parent = new Transform();
        parent.position = new Vec3(10, 0, 0);
        const child = new Transform();
        child.position = new Vec3(5, 0, 0);
        child.SetParent(parent);
        expectVec3Close(child.position, 5, 0, 0);
        expectVec3Close(child.localPosition, -5, 0, 0);
        expect(parent.childCount).toBe(1);
        expect(child.parent).toBe(parent);
    });

    test('SetParent with worldPositionStays=false keeps local', () => {
        const parent = new Transform();
        parent.position = new Vec3(10, 0, 0);
        const child = new Transform();
        child.localPosition = new Vec3(5, 0, 0);
        child.SetParent(parent, false);
        expectVec3Close(child.localPosition, 5, 0, 0);
        expectVec3Close(child.position, 15, 0, 0);
    });

    test('reparenting detaches from the old parent', () => {
        const a = new Transform();
        const b = new Transform();
        const child = new Transform();
        child.SetParent(a, false);
        expect(a.childCount).toBe(1);
        child.SetParent(b, false);
        expect(a.childCount).toBe(0);
        expect(b.childCount).toBe(1);
    });

    test('hierarchy navigation: root, childCount, GetChild', () => {
        const root = new Transform();
        const mid = new Transform();
        const leaf = new Transform();
        mid.SetParent(root, false);
        leaf.SetParent(mid, false);
        expect(leaf.root).toBe(root);
        expect(mid.root).toBe(root);
        expect(root.root).toBe(root);
        expect(root.childCount).toBe(1);
        expect(root.GetChild(0)).toBe(mid);
        expect(() => root.GetChild(7)).toThrow();
    });

    test('DetachChildren unparents while keeping world transforms', () => {
        const parent = new Transform();
        parent.position = new Vec3(10, 0, 0);
        const child = new Transform();
        child.localPosition = new Vec3(1, 0, 0);
        child.SetParent(parent, false);
        parent.DetachChildren();
        expect(parent.childCount).toBe(0);
        expect(child.parent).toBeNull();
        expectVec3Close(child.position, 11, 0, 0);
    });

    test('lossyScale multiplies down the chain', () => {
        const parent = new Transform();
        parent.localScale = new Vec3(2, 2, 2);
        const child = new Transform();
        child.localScale = new Vec3(3, 3, 3);
        child.SetParent(parent, false);
        expectVec3Close(child.lossyScale, 6, 6, 6);
    });

    test('SetPositionAndRotation and SetLocalPositionAndRotation', () => {
        const t = new Transform();
        t.SetPositionAndRotation(new Vec3(1, 2, 3), Quaternion.identity);
        expectVec3Close(t.position, 1, 2, 3);
        expectQuatClose(t.rotation, 0, 0, 0, 1);

        t.SetLocalPositionAndRotation(new Vec3(4, 5, 6), Quaternion.identity);
        expectVec3Close(t.localPosition, 4, 5, 6);
    });

    test('TransformPoint and InverseTransformPoint round-trip', () => {
        const t = new Transform();
        t.position = new Vec3(5, 0, 0);
        expectVec3Close(t.TransformPoint(new Vec3(1, 0, 0)), 6, 0, 0);
        expectVec3Close(t.InverseTransformPoint(new Vec3(6, 0, 0)), 1, 0, 0);
    });

    test('TransformDirection ignores position, TransformVector keeps scale', () => {
        const t = new Transform();
        t.position = new Vec3(5, 0, 0);
        t.localScale = new Vec3(2, 2, 2);
        expectVec3Close(t.TransformDirection(new Vec3(1, 0, 0)), 1, 0, 0);
        expectVec3Close(t.TransformVector(new Vec3(1, 0, 0)), 2, 0, 0);
        expectVec3Close(t.InverseTransformDirection(new Vec3(1, 0, 0)), 1, 0, 0);
        expectVec3Close(t.InverseTransformVector(new Vec3(2, 0, 0)), 1, 0, 0);
    });

    test('localToWorldMatrix matches TRS', () => {
        const t = new Transform();
        t.position = new Vec3(1, 2, 3);
        const m = t.localToWorldMatrix;
        expectVec3Close(m.GetPosition(), 1, 2, 3);
        expectVec3Close(t.worldToLocalMatrix.MultiplyPoint3x4(new Vec3(1, 2, 3)), 0, 0, 0);
    });

    test('parent mutation invalidates the child cache', () => {
        const parent = new Transform();
        const child = new Transform();
        parent.localPosition = new Vec3(10, 0, 0);
        child.SetParent(parent, false);
        const before = child.localToWorldMatrix.GetPosition();
        expectVec3Close(before, 10, 0, 0);

        parent.localPosition = new Vec3(40, 0, 0);
        const after = child.localToWorldMatrix.GetPosition();
        expectVec3Close(after, 40, 0, 0);
        expect(after.x).toBe(40);
    });

    test('hasChanged propagates down the hierarchy', () => {
        const parent = new Transform();
        const child = new Transform();
        const grandchild = new Transform();
        child.SetParent(parent, false);
        grandchild.SetParent(child, false);
        parent.hasChanged = false;
        child.hasChanged = false;
        grandchild.hasChanged = false;

        parent.localPosition = new Vec3(5, 0, 0);

        expect(parent.hasChanged).toBe(true);
        expect(child.hasChanged).toBe(true);
        expect(grandchild.hasChanged).toBe(true);
    });

    test('self-mutation only flags the subtree, not the parent', () => {
        const parent = new Transform();
        const child = new Transform();
        child.SetParent(parent, false);
        parent.hasChanged = false;
        child.hasChanged = false;

        child.localPosition = new Vec3(1, 0, 0);

        expect(child.hasChanged).toBe(true);
        expect(parent.hasChanged).toBe(false);
    });

    test('localToWorldMatrix returns copies, mutations never corrupt the cache', () => {
        const t = new Transform();
        t.position = new Vec3(1, 2, 3);
        const m = t.localToWorldMatrix;
        m.m03 = 99;
        const again = t.localToWorldMatrix;
        expectVec3Close(again.GetPosition(), 1, 2, 3);
    });

    test('SetParent rejects a cycle', () => {
        const a = new Transform();
        const b = new Transform();
        b.SetParent(a, false);
        expect(() => a.SetParent(b, false)).toThrow(/descendant/);
        expect(a.parent).toBe(null);
        expect(b.parent).toBe(a);
    });

    test('SetParent rejects assigning to itself', () => {
        const a = new Transform();
        expect(() => a.SetParent(a, false)).toThrow(/descendant/);
    });

    test('deep cycle is rejected, not just direct ones', () => {
        const a = new Transform();
        const b = new Transform();
        const c = new Transform();
        b.SetParent(a, false);
        c.SetParent(b, false);
        expect(() => a.SetParent(c, false)).toThrow(/descendant/);
    });
});

import { Vec3 } from './Vec3';
import { Vec4 } from './Vec4';
import { Quaternion } from './Quat';
import { Mat4 } from './Mat4';

/**
 * The coordinate space to operate in.
 * Mirrors Unity's Space enum (World / Self).
 */
export const Space = {
    World: 'World',
    Self: 'Self',
} as const;

export type Space = (typeof Space)[keyof typeof Space];

/**
 * Position, rotation and scale of an object, mirroring Unity's Transform.
 *
 * Local TRS is stored; world values are derived by walking the parent chain.
 * Getters return copies (like Unity's value-type properties), so mutating a
 * returned vector never bends the Transform behind the seam. Setters copy in.
 */
export class Transform {
    private _localPosition: Vec3 = Vec3.zero;
    private _localRotation: Quaternion = Quaternion.identity;
    private _localScale: Vec3 = Vec3.one;
    private _parent: Transform | null = null;
    private _children: Transform[] = [];
    private _hasChanged = false;

    /** The position of the transform in world space */
    get translation(): Vec3 {
        if (this._parent === null) {
            return this._localPosition.clone();
        }
        return this._parent.localToWorldMatrix.multiplyPoint3x4(
            this._localPosition
        );
    }
    set translation(value: Vec3) {
        this.SetPosition(value);
    }
    /** The rotation of the transform in world space stored as a quaternion */
    get rotation(): Quaternion {
        if (this._parent === null) {
            return this._localRotation.clone();
        }
        return Quaternion.mult(this._parent.rotation, this._localRotation);
    }
    set rotation(value: Quaternion) {
        this.SetRotation(value);
    }
    /** The scale of the transform relative to the parent */
    get localScale(): Vec3 {
        return this._localScale.clone();
    }
    set localScale(value: Vec3) {
        this._localScale = value.clone();
        this._hasChanged = true;
    }
    /** The global scale of the object (read-only, like Unity's lossyScale) */
    get lossyScale(): Vec3 {
        if (this._parent === null) {
            return this._localScale.clone();
        }
        const parentScale = this._parent.lossyScale;
        return new Vec3(
            parentScale.x * this._localScale.x,
            parentScale.y * this._localScale.y,
            parentScale.z * this._localScale.z
        );
    }
    /** Position of the transform relative to the parent transform */
    get localTranslation(): Vec3 {
        return this._localPosition.clone();
    }
    set localTranslation(value: Vec3) {
        this._localPosition = value.clone();
        this._hasChanged = true;
    }
    /** The rotation of the transform relative to the parent transform's rotation */
    get localRotation(): Quaternion {
        return this._localRotation.clone();
    }
    set localRotation(value: Quaternion) {
        this._localRotation = value.clone();
        this._hasChanged = true;
    }
    /** The rotation as Euler angles in degrees */
    get eulerAngles(): Vec3 {
        return this.rotation.eulerAngles;
    }
    set eulerAngles(value: Vec3) {
        this.rotation = Quaternion.Euler(value);
    }
    /** The rotation as Euler angles in degrees relative to the parent transform's rotation */
    get localEulerAngles(): Vec3 {
        return this._localRotation.eulerAngles;
    }
    set localEulerAngles(value: Vec3) {
        this.localRotation = Quaternion.Euler(value);
    }
    /** The blue axis of the transform in world space */
    get forward(): Vec3 {
        return Quaternion.multiplyWithVec3(this.rotation, Vec3.forward);
    }
    set forward(value: Vec3) {
        this.rotation = Quaternion.LookRotation(value, Vec3.up);
    }
    /** The red axis of the transform in world space */
    get right(): Vec3 {
        return Quaternion.multiplyWithVec3(this.rotation, Vec3.right);
    }
    set right(value: Vec3) {
        this.rotation = Quaternion.mult(
            Quaternion.FromToRotation(this.right, value),
            this.rotation
        );
    }
    /** The green axis of the transform in world space */
    get up(): Vec3 {
        return Quaternion.multiplyWithVec3(this.rotation, Vec3.up);
    }
    set up(value: Vec3) {
        this.rotation = Quaternion.mult(
            Quaternion.FromToRotation(this.up, value),
            this.rotation
        );
    }
    get worldToLocalMatrix(): Mat4 {
        return this.localToWorldMatrix.inverse;
    }
    get localToWorldMatrix(): Mat4 {
        if (this._parent === null) {
            return Mat4.TRS(
                this._localPosition,
                this._localRotation,
                this._localScale
            );
        }
        return Mat4.mult(
            this._parent.localToWorldMatrix,
            Mat4.TRS(this._localPosition, this._localRotation, this._localScale)
        );
    }
    /** Has the transform changed since the last time the flag was set to false? */
    get hasChanged(): boolean {
        return this._hasChanged;
    }
    set hasChanged(value: boolean) {
        this._hasChanged = value;
    }
    /** The parent of the transform */
    get parent(): Transform | null {
        return this._parent;
    }
    set parent(value: Transform | null) {
        this.SetParent(value, true);
    }
    /** The topmost transform in the hierarchy */
    get root(): Transform {
        let current: Transform = this;
        while (current._parent !== null) {
            current = current._parent;
        }
        return current;
    }
    /** The number of children the transform has */
    get childCount(): number {
        return this._children.length;
    }
    /** Set the parent of the transform */
    SetParent(parent: Transform | null, worldPositionStays = true): void {
        if (parent === this._parent) {
            return;
        }
        if (worldPositionStays) {
            const worldPos = this.translation;
            const worldRot = this.rotation;
            const worldScale = this.lossyScale;
            this.attach(parent);
            this.translation = worldPos;
            this.rotation = worldRot;
            this.restoreLossyScale(worldScale);
        } else {
            this.attach(parent);
        }
        this._hasChanged = true;
    }
    /** Unparents all children, keeping their world transforms */
    DetachChildren(): void {
        for (const child of [...this._children]) {
            child.SetParent(null, true);
        }
    }
    /** Returns the child transform at the given index */
    GetChild(index: number): Transform {
        const child = this._children[index];
        if (child === undefined) {
            throw new Error('Invalid child index!');
        }
        return child;
    }
    /** Sets the world position and rotation in one call */
    SetPositionAndRotation(position: Vec3, rotation: Quaternion): void {
        this.SetPosition(position);
        this.SetRotation(rotation);
    }
    /** Sets the local position and rotation in one call */
    SetLocalPositionAndRotation(position: Vec3, rotation: Quaternion): void {
        this._localPosition = position.clone();
        this._localRotation = rotation.clone();
        this._hasChanged = true;
    }

    Translate(translation: Vec3, relativeTo: Space = Space.Self): void {
        if (relativeTo === Space.Self) {
            this.translation = Vec3.add(
                this.translation,
                this.TransformDirection(translation)
            );
        } else {
            this.translation = Vec3.add(this.translation, translation);
        }
    }

    Rotate(eulers: Vec3, relativeTo: Space = Space.Self): void {
        const eulerRot = Quaternion.Euler(eulers);
        if (relativeTo === Space.Self) {
            this.localRotation = Quaternion.mult(this._localRotation, eulerRot);
        } else {
            this.rotation = Quaternion.mult(eulerRot, this.rotation);
        }
    }

    RotateAround(point: Vec3, axis: Vec3, angle: number): void {
        const q = Quaternion.AngleAxis(angle, axis);
        const offset = Vec3.sub(this.translation, point);
        this.translation = Vec3.add(
            point,
            Quaternion.multiplyWithVec3(q, offset)
        );
        this.rotation = Quaternion.mult(q, this.rotation);
    }
    /**
     * Rotates the transform so the forward vector points at the target's
     * current position (or at the given point). Position is left untouched.
     * @param target Object to point towards, or a world-space point
     * @param worldUp Vector specifying the upward direction
     */
    LookAt(target: Transform | Vec3, worldUp = Vec3.up): void {
        const targetPos = target instanceof Transform ? target.translation : target;
        const direction = Vec3.sub(targetPos, this.translation);
        if (direction.sqrMagnitude < 1e-10) {
            return;
        }
        this.rotation = Quaternion.LookRotation(direction, worldUp);
    }
    /** Transforms direction from local space to world space */
    TransformDirection(direction: Vec3): Vec3 {
        return Quaternion.multiplyWithVec3(this.rotation, direction);
    }
    /** Transforms direction from world space to local space */
    InverseTransformDirection(direction: Vec3): Vec3 {
        return Quaternion.multiplyWithVec3(
            Quaternion.Inverse(this.rotation),
            direction
        );
    }
    /** Transforms vector from local space to world space */
    TransformVector(vector: Vec3): Vec3 {
        return Vec4.toVec3(
            Mat4.multiplyVec4(
                this.localToWorldMatrix,
                new Vec4(vector.x, vector.y, vector.z, 0)
            )
        );
    }
    /** Transforms vector from world space to local space */
    InverseTransformVector(vector: Vec3): Vec3 {
        return Vec4.toVec3(
            Mat4.multiplyVec4(
                this.worldToLocalMatrix,
                new Vec4(vector.x, vector.y, vector.z, 0)
            )
        );
    }
    /** Transforms point from local space to world space */
    TransformPoint(local: Vec3): Vec3 {
        return this.localToWorldMatrix.multiplyPoint3x4(local);
    }
    /** Transforms point from world space to local space */
    InverseTransformPoint(world: Vec3): Vec3 {
        return this.worldToLocalMatrix.multiplyPoint3x4(world);
    }

    private SetPosition(value: Vec3): void {
        if (this._parent === null) {
            this._localPosition = value.clone();
        } else {
            this._localPosition =
                this._parent.worldToLocalMatrix.multiplyPoint3x4(value);
        }
        this._hasChanged = true;
    }

    private SetRotation(value: Quaternion): void {
        if (this._parent === null) {
            this._localRotation = value.clone();
        } else {
            this._localRotation = Quaternion.mult(
                Quaternion.Inverse(this._parent.rotation),
                value
            );
        }
        this._hasChanged = true;
    }

    private restoreLossyScale(worldScale: Vec3): void {
        if (this._parent === null) {
            this._localScale = worldScale.clone();
            return;
        }
        const parentScale = this._parent.lossyScale;
        this._localScale = new Vec3(
            parentScale.x !== 0 ? worldScale.x / parentScale.x : worldScale.x,
            parentScale.y !== 0 ? worldScale.y / parentScale.y : worldScale.y,
            parentScale.z !== 0 ? worldScale.z / parentScale.z : worldScale.z
        );
    }

    private attach(parent: Transform | null): void {
        if (this._parent !== null) {
            const index = this._parent._children.indexOf(this);
            if (index !== -1) {
                this._parent._children.splice(index, 1);
            }
        }
        this._parent = parent;
        if (parent !== null && !parent._children.includes(this)) {
            parent._children.push(this);
        }
    }

    /**
     * @deprecated Typo kept for backwards compatibility. Use TransformDirection instead.
     */
    TransrformDirection(direction: Vec3): Vec3 {
        return this.TransformDirection(direction);
    }
    /**
     * @deprecated Typo kept for backwards compatibility. Use InverseTransformDirection instead.
     */
    InverseTransrformDirection(direction: Vec3): Vec3 {
        return this.InverseTransformDirection(direction);
    }
}

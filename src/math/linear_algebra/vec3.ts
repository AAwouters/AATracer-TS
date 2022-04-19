export class Vec3 {
    public x: number;
    public y: number;
    public z: number;
    
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public static zeros():  Vec3 { return new Vec3(0, 0, 0); }
    public static unit_x(): Vec3 { return new Vec3(1, 0, 0); }
    public static unit_y(): Vec3 { return new Vec3(0, 1, 0); }
    public static unit_z(): Vec3 { return new Vec3(0, 0, 1); }
    public static ones():   Vec3 { return new Vec3(1, 1, 1); }
    
    r(): number { return this.x; }
    g(): number { return this.y; }
    b(): number { return this.z; }

    add(this: Vec3, other: Vec3): Vec3 {
        return new Vec3(this.x + other.x, this.y + other.y, this.z + other.z);
    }

    sub(this: Vec3, other: Vec3): Vec3 {
        return new Vec3(this.x - other.x, this.y - other.y, this.z - other.z);
    }

    div(this: Vec3, divisor: number): Vec3 {
        return new Vec3(this.x / divisor, this.y / divisor, this.z / divisor);
    }

    mul(this: Vec3, multiplier: number): Vec3 {
        return new Vec3(this.x * multiplier, this.y * multiplier, this.z * multiplier);
    }

    dot(this: Vec3, other: Vec3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    inv(this: Vec3): Vec3 {
        return new Vec3(-this.x, -this.y, -this.z);
    }

    clamp(this: Vec3, min: number, max: number): Vec3;
    clamp(this: Vec3, min: Vec3, max: Vec3): Vec3;
    clamp(this: Vec3, min: Vec3 | number, max: Vec3 | number): Vec3 {
        if (typeof min == 'number') {
            min = Vec3.ones().mul(min);
        }

        if (typeof max == 'number') {
            max = Vec3.ones().mul(max);
        }
        
        return new Vec3(
            clamp(this.x, min.x, max.x),
            clamp(this.y, min.y, max.y),
            clamp(this.z, min.z, max.z)
        );
    }

    lerp(this: Vec3, other: Vec3, val: number) {
        if (val <= 0) { return this; }
        if (val >= 1) { return other; }
        return this.mul(1 - val).add(other.mul(val));
    }
}

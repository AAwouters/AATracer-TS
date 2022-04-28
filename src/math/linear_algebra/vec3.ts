import { clamp } from "../utility";

/// Container for every structure that containts 3 numbers
class Vec3 {
    val: [number, number, number];
    
    constructor(val0: number, val1: number, val2: number) {
        this.val = [val0, val1, val2];   
    }

    public static zeros():  Vec3 { return new Vec3(0, 0, 0); }
    public static unit_x(): Vec3 { return new Vec3(1, 0, 0); }
    public static unit_y(): Vec3 { return new Vec3(0, 1, 0); }
    public static unit_z(): Vec3 { return new Vec3(0, 0, 1); }
    public static ones():   Vec3 { return new Vec3(1, 1, 1); }
    
    x(): number { return this.val[0]; }
    y(): number { return this.val[1]; }
    z(): number { return this.val[2]; }

    r(): number { return this.val[0]; }
    g(): number { return this.val[1]; }
    b(): number { return this.val[2]; }

    add(this: Vec3, other: Vec3): Vec3 {
        return new Vec3(this.val[0] + other.val[0], this.val[1] + other.val[1], this.val[2] + other.val[2]);
    }

    sub(this: Vec3, other: Vec3): Vec3 {
        return new Vec3(this.val[0] - other.val[0], this.val[1] - other.val[1], this.val[2] - other.val[2]);
    }

    div(this: Vec3, divisor: number): Vec3 {
        return new Vec3(this.val[0] / divisor, this.val[1] / divisor, this.val[2] / divisor);
    }

    mul(this: Vec3, multiplier: number): Vec3 {
        return new Vec3(this.val[0] * multiplier, this.val[1] * multiplier, this.val[2] * multiplier);
    }

    dot(this: Vec3, other: Vec3): number {
        return this.val[0] * other.val[0] + this.val[1] * other.val[1] + this.val[2] * other.val[2];
    }

    inv(this: Vec3): Vec3 {
        return new Vec3(-this.val[0], -this.val[1], -this.val[2]);
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
            clamp(this.val[0], min.val[0], max.val[0]),
            clamp(this.val[1], min.val[1], max.val[1]),
            clamp(this.val[2], min.val[2], max.val[2])
        );
    }

    lerp(this: Vec3, other: Vec3, val: number) {
        if (val <= 0) { return this; }
        if (val >= 1) { return other; }
        return this.mul(1 - val).add(other.mul(val));
    }

    distance_sqr(this: Vec3, other: Vec3): number {
        let dx_sqr = (this.val[0] - other.val[0]) * (this.val[0] - other.val[0]);
        let dy_sqr = (this.val[1] - other.val[1]) * (this.val[1] - other.val[1]);
        let dz_sqr = (this.val[2] - other.val[2]) * (this.val[2] - other.val[2]);
        return dx_sqr + dy_sqr + dz_sqr;
    }

    distance(this: Vec3, other: Vec3): number {
        return Math.sqrt(this.distance_sqr(other));
    }

    norm_sqr(this: Vec3): number {
        let x_sqr = this.val[0] * this.val[0];
        let y_sqr = this.val[1] * this.val[1];
        let z_sqr = this.val[2] * this.val[2];
        return x_sqr + y_sqr + z_sqr;
    }

    norm(this: Vec3): number {
        return Math.sqrt(this.norm_sqr());
    }

    normalise(this: Vec3): Vec3 {
        return this.div(this.norm());
    }

    pow(this: Vec3, value: number): Vec3 {
        return new Vec3(
            Math.pow(this.val[0], value),
            Math.pow(this.val[1], value),
            Math.pow(this.val[2], value),
        );
    }
}

/// Specific names for Vec3 container
export class Vector3 extends Vec3 { };
export class Point3 extends Vec3 { };
export class Color extends Vec3 {
    static black(): Color { return new Color(0, 0, 0); }
    static red():   Color { return new Color(1, 0, 0); }
    static green(): Color { return new Color(0, 1, 0); }
    static blue():  Color { return new Color(0, 0, 1); }
    static white(): Color { return new Color(1, 1, 1); }
}

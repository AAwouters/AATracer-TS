import { random_in_range } from "../utility";

/// Container for every structure that containts 3 numbers
class Vec2 {
    val: [number, number];
    
    constructor(val0: number, val1: number) {
        this.val = [val0, val1];   
    }

    public static zeros():  Vec2 { return new Vec2(0, 0); }
    public static unit_x(): Vec2 { return new Vec2(1, 0); }
    public static unit_y(): Vec2 { return new Vec2(0, 1); }
    public static ones():   Vec2 { return new Vec2(1, 1); }

    public static random(): Vec2 { return new Vec2(Math.random(), Math.random()); }
    public static random_in_range(min: number, max: number): Vec2 {
        return new Vec2(
            random_in_range(min, max),
            random_in_range(min, max),
        );
    }
    
    x(): number { return this.val[0]; }
    y(): number { return this.val[1]; }

    u(): number { return this.val[0]; }
    v(): number { return this.val[1]; }

    add(this: Vec2, other: Vec2): Vec2 {
        return new Vec2(this.val[0] + other.val[0], this.val[1] + other.val[1]);
    }

    sub(this: Vec2, other: Vec2): Vec2 {
        return new Vec2(this.val[0] - other.val[0], this.val[1] - other.val[1]);
    }

    div(this: Vec2, divisor: number): Vec2 {
        return new Vec2(this.val[0] / divisor, this.val[1] / divisor);
    }

    mul(this: Vec2, multiplier: number): Vec2 {
        return new Vec2(this.val[0] * multiplier, this.val[1] * multiplier);
    }

    dot(this: Vec2, other: Vec2): number {
        return this.val[0] * other.val[0] + this.val[1] * other.val[1];
    }

    inv(this: Vec2): Vec2 {
        return new Vec2(-this.val[0], -this.val[1]);
    }

    lerp(this: Vec2, other: Vec2, val: number) {
        if (val <= 0) { return this; }
        if (val >= 1) { return other; }
        return this.mul(1 - val).add(other.mul(val));
    }

    distance_sqr(this: Vec2, other: Vec2): number {
        let dx_sqr = (this.val[0] - other.val[0]) * (this.val[0] - other.val[0]);
        let dy_sqr = (this.val[1] - other.val[1]) * (this.val[1] - other.val[1]);
        return dx_sqr + dy_sqr;
    }

    distance(this: Vec2, other: Vec2): number {
        return Math.sqrt(this.distance_sqr(other));
    }

    norm_sqr(this: Vec2): number {
        let x_sqr = this.val[0] * this.val[0];
        let y_sqr = this.val[1] * this.val[1];
        return x_sqr + y_sqr;
    }

    norm(this: Vec2): number {
        return Math.sqrt(this.norm_sqr());
    }

    normalise(this: Vec2): Vec2 {
        return this.div(this.norm());
    }

    pow(this: Vec2, value: number): Vec2 {
        return new Vec2(
            Math.pow(this.val[0], value),
            Math.pow(this.val[1], value),
        );
    }
}

/// Specific names for Vec2 container
export class Point2 extends Vec2 { };


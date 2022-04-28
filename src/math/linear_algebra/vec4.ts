import { clamp } from "../utility";

export class Vec4 {
    public val: [number, number, number, number];
    
    constructor(val0: number, val1: number, val2: number, val3: number) {
        this.val = [val0, val1, val2, val3];
    }

    public static zeros():  Vec4 { return new Vec4(0, 0, 0, 0); }
    public static unit_x(): Vec4 { return new Vec4(1, 0, 0, 0); }
    public static unit_y(): Vec4 { return new Vec4(0, 1, 0, 0); }
    public static unit_z(): Vec4 { return new Vec4(0, 0, 1, 0); }
    public static unit_w(): Vec4 { return new Vec4(0, 0, 0, 1); }
    public static ones():   Vec4 { return new Vec4(1, 1, 1, 1); }
    
    x(): number { return this.val[0]; }
    y(): number { return this.val[1]; }
    z(): number { return this.val[2]; }
    w(): number { return this.val[3]; }

    r(): number { return this.val[0]; }
    g(): number { return this.val[1]; }
    b(): number { return this.val[2]; }
    a(): number { return this.val[3]; }

    add(this: Vec4, other: Vec4): Vec4 {
        return new Vec4(this.val[0] + other.val[0], this.val[1] + other.val[1], this.val[2] + other.val[2], this.val[3] + other.val[3]);
    }

    sub(this: Vec4, other: Vec4): Vec4 {
        return new Vec4(this.val[0] - other.val[0], this.val[1] - other.val[1], this.val[2] - other.val[2], this.val[3] - other.val[3]);
    }

    div(this: Vec4, divisor: number): Vec4 {
        return new Vec4(this.val[0] / divisor, this.val[1] / divisor, this.val[2] / divisor, this.val[3] / divisor);
    }

    mul(this: Vec4, multiplier: number): Vec4 {
        return new Vec4(this.val[0] * multiplier, this.val[1] * multiplier, this.val[2] * multiplier, this.val[3] * multiplier);
    }

    clamp(this: Vec4, min: number, max: number): Vec4;
    clamp(this: Vec4, min: Vec4, max: Vec4): Vec4;
    clamp(this: Vec4, min: Vec4 | number, max: Vec4 | number): Vec4 {
        if (typeof min == 'number') {
            min = Vec4.ones().mul(min);
        }

        if (typeof max == 'number') {
            max = Vec4.ones().mul(max);
        }
        
        return new Vec4(
            clamp(this.val[0], min.val[0], max.val[0]),
            clamp(this.val[1], min.val[1], max.val[1]),
            clamp(this.val[2], min.val[2], max.val[2]),
            clamp(this.val[3], min.val[3], max.val[3])
        );
    }
}
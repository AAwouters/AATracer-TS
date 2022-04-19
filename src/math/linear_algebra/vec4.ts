export class Vec4 {
    public x: number;
    public y: number;
    public z: number;
    public w: number;
    
    constructor(x: number, y: number, z: number, w: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    public static zeros():  Vec4 { return new Vec4(0, 0, 0, 0); }
    public static unit_x(): Vec4 { return new Vec4(1, 0, 0, 0); }
    public static unit_y(): Vec4 { return new Vec4(0, 1, 0, 0); }
    public static unit_z(): Vec4 { return new Vec4(0, 0, 1, 0); }
    public static unit_w(): Vec4 { return new Vec4(0, 0, 0, 1); }
    public static ones():   Vec4 { return new Vec4(1, 1, 1, 1); }
    

    add(this: Vec4, other: Vec4): Vec4 {
        return new Vec4(this.x + other.x, this.y + other.y, this.z + other.z, this.w + other.w);
    }

    sub(this: Vec4, other: Vec4): Vec4 {
        return new Vec4(this.x - other.x, this.y - other.y, this.z - other.z, this.w - other.w);
    }

    div(this: Vec4, divisor: number): Vec4 {
        return new Vec4(this.x / divisor, this.y / divisor, this.z / divisor, this.w / divisor);
    }

    mul(this: Vec4, multiplier: number): Vec4 {
        return new Vec4(this.x * multiplier, this.y * multiplier, this.z * multiplier, this.w * multiplier);
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
            clamp(this.x, min.x, max.x),
            clamp(this.y, min.y, max.y),
            clamp(this.z, min.z, max.z),
            clamp(this.w, min.w, max.w)
        );
    }
}
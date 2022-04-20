import { Vec3 } from "../math";
import { Color } from "../scene/color";

export class Ray {
    public origin: Vec3;
    public direction: Vec3;

    constructor(origin: Vec3, direction: Vec3) {
        this.origin = origin;
        this.direction = direction;
    }
}

export class HitRecord {
    public t: number;
    public local_hit_point: Vec3;
    public surface_normal: Vec3;

    constructor(t: number, local_hit_point: Vec3, surface_normal: Vec3) {
        this.t = t;
        this.local_hit_point = local_hit_point;
        this.surface_normal = surface_normal;
    }
}

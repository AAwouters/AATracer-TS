import { Vector3, Point3, Color } from "../math";

export class Ray {
    public origin: Point3;
    public direction: Vector3;

    constructor(origin: Point3, direction: Vector3) {
        this.origin = origin;
        this.direction = direction;
    }
}

export class HitRecord {
    public t: number;
    public local_hit_point: Point3;
    public surface_normal: Vector3;

    constructor(t: number, local_hit_point: Point3, surface_normal: Vector3) {
        this.t = t;
        this.local_hit_point = local_hit_point;
        this.surface_normal = surface_normal;
    }
}

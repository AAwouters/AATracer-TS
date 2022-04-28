import { KEPSILON, Point3 } from "../../math";
import { HitRecord } from "../../tracing/ray";
import { Ray } from "../../tracing/ray";
import { Shape } from "./scene_object";

export class Sphere implements Shape {
    center: Point3;
    radius: number;

    constructor(center: Point3, radius: number) {
        this.center = center;
        this.radius = radius;
    }
    
    hit_record(ray: Ray): HitRecord | null {
        let temp = ray.origin.sub(this.center);
        let a = ray.direction.dot(ray.direction);
        let b = 2 * ray.direction.dot(temp);
        let c = temp.dot(temp) - (this.radius * this.radius);
        let disc = b*b - 4*a*c;

        if (disc < 0) {
            return null;
        }

        let e = Math.sqrt(disc);
        let denom = 2*a;
        let t = (-b - e) / denom;

        if (t > KEPSILON) {
            let normal = temp.add(ray.direction.mul(t)).div(this.radius);
            let local_hit_point = ray.origin.add(ray.direction.mul(t));

            return new HitRecord(t, local_hit_point, normal);
        }

        t = (-b + e) / denom;

        if (t > KEPSILON) {
            let normal = temp.add(ray.direction.mul(t)).div(this.radius);
            let local_hit_point = ray.origin.add(ray.direction.mul(t));

            return new HitRecord(t, local_hit_point, normal);
        }

        return null;
    }
}
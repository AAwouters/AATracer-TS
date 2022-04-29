import { Point2, Point3, Vector3 } from "../math";
import { Ray } from "../tracing/ray";

export interface Camera {
    get_ray(u: number, v: number): Ray;
}

export class PinpointCamera implements Camera {
    origin: Point3;
    lower_left_corner: Point3;
    horizontal: Vector3;
    vertical: Vector3;

    constructor() {
        let aspect_ratio = 16/9;
        let viewport_height = 2;
        let viewport_width = viewport_height * aspect_ratio;
        let focal_length = 1;

        this.origin = Point3.zeros();
        this.horizontal = Vector3.unit_x().mul(viewport_width);
        this.vertical = Vector3.unit_y().mul(viewport_height);
        this.lower_left_corner = this.origin.sub(this.horizontal.div(2)).sub(this.vertical.div(2)).sub(Vector3.unit_z().mul(focal_length)); 
    }

    get_ray(u: number, v: number): Ray {
        return new Ray(
            this.origin,
            this.lower_left_corner.add(this.horizontal.mul(u)).add(this.vertical.mul(v)).sub(this.origin)
        );
    }
}
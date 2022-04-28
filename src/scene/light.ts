import { Vector3, Point3, Color } from "../math";
import { Scene } from "./scene";

export interface Light {
    has_line_of_sight_to(this: Light, scene: Scene, location: Point3): boolean;

    get_color_at(this: Light, location: Point3): Color;

    get_direction_at(this: Light, location: Point3): Vector3;
}

export class PointLight implements Light {
    position: Point3;
    color: Color;

    constructor(position: Point3, color: Color) {
        this.position = position;
        this.color = color;
    }

    has_line_of_sight_to(this: PointLight, scene: Scene, location: Point3): boolean {
        return !scene.any_hit_between(this.position, location);
    }

    get_color_at(this: PointLight, location: Point3): Color {
        let distance_sqr = this.position.distance_sqr(location);
        return this.color;
    }

    get_direction_at(this: PointLight, location: Point3): Vector3 {
        return this.position.sub(location).normalise();
    }
}
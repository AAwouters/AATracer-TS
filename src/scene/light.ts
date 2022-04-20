import { Vec3 } from "../math";
import { Color } from "./color";
import { Scene } from "./scene";

export interface Light {
    has_line_of_sight_to(this: Light, scene: Scene, location: Vec3): boolean;

    get_color_at(this: Light, location: Vec3): Color;

    get_direction_at(this: Light, location: Vec3): Vec3;
}

export class PointLight implements Light {
    position: Vec3;
    color: Color;

    constructor(position: Vec3, color: Color) {
        this.position = position;
        this.color = color;
    }

    has_line_of_sight_to(this: PointLight, scene: Scene, location: Vec3): boolean {
        return !scene.any_hit_between(this.position, location);
    }

    get_color_at(this: PointLight, location: Vec3): Color {
        let distance_sqr = this.position.distance_sqr(location);
        return this.color;
    }

    get_direction_at(this: PointLight, location: Vec3): Vec3 {
        return this.position.sub(location).normalise();
    }
}
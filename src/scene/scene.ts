import { Ray } from "../tracing/ray";
import { Color } from "./color";
import { MaterialRecord } from "./material";
import { SceneObject } from "./object/scene_object";

export class Scene {
    background_color: Color;
    objects: SceneObject[];

    constructor() {
        this.background_color = Color.black();
        this.objects = [];
    }

    public add_object(this: Scene, object: SceneObject) {
        this.objects.push(object);
    }

    public trace_ray(this: Scene, ray: Ray): Color {
        let material_record = this.closest_hit_in_front(ray);

        if (material_record != null) {
            return material_record.material.color;
        } else {
            return this.background_color;
        }
    }

    public closest_hit_in_front(this: Scene, ray: Ray): MaterialRecord | null {
        let t_min = Number.MAX_VALUE;
        let result = null;

        for (let object of this.objects) {
            let hit_record = object.shape.hit_record(ray);

            if (hit_record != null) {
                t_min = hit_record.t;
                result = new MaterialRecord(hit_record, object.material);
            }
        }

        return result;
    }
}
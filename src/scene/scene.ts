import { KEPSILON, Vector3, Point3, Color } from "../math";
import { Ray } from "../tracing/ray";
import { Camera, PinpointCamera } from "./camera";
import { Light } from "./light";
import { MaterialRecord } from "./material";
import { SceneObject } from "./object/scene_object";

export class Scene {
    background_color: Color;
    camera: Camera;
    objects: SceneObject[];
    lights: Light[];

    constructor() {
        this.background_color = Color.black();
        this.camera = new PinpointCamera();
        this.objects = [];
        this.lights = [];
    }

    public add_object(this: Scene, object: SceneObject) {
        this.objects.push(object);
    }

    public add_light(this: Scene, light: Light) {
        this.lights.push(light);
    }

    public trace_ray(this: Scene, ray: Ray): Color {
        let material_record = this.closest_hit_in_front(ray);

        if (material_record != null) {
            return this.shade(material_record, ray.direction.inv());
        } else {
            return this.background_color;
        }
    }

    shade(this: Scene, material_record: MaterialRecord, w_out: Vector3): Color {
        let color = Color.black();

        for (let light of this.lights) {
            let hit_point = material_record.local_hit_point;

            if (light.has_line_of_sight_to(this, hit_point)) {
                
                color = color.add(material_record.scatter(light.get_direction_at(hit_point), w_out));
            }
        }

        return color;
    }

    public closest_hit_in_front(this: Scene, ray: Ray): MaterialRecord | null {
        let t_min = Number.MAX_VALUE;
        let result = null;

        for (let object of this.objects) {
            let hit_record = object.shape.hit_record(ray);

            if (hit_record != null && hit_record.t < t_min) {
                t_min = hit_record.t;
                result = new MaterialRecord(hit_record, object.material);
            }
        }

        return result;
    }

    public any_hit_between(a: Point3, b: Point3): boolean {
        let ray = new Ray(a, b.sub(a));

        let t_min = KEPSILON;
        let t_max = 1 - KEPSILON;

        for (let object of this.objects) {
            let hit_record = object.shape.hit_record(ray);

            if (hit_record != null) {
                if (hit_record.t > t_min && hit_record.t < t_max) {
                    return true;
                }
            }
        }

        return false;
    }
}
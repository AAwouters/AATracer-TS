import { Ray } from "../../tracing/ray";
import { HitRecord } from "../../tracing/ray";
import { Material } from "../material";

export class SceneObject implements Shape {
    public shape: Shape;
    public material: Material;

    constructor(shape: Shape, material: Material) {
        this.shape = shape;
        this.material = material;
    }

    hit_record(ray: Ray): HitRecord | null {
        return this.shape.hit_record(ray);
    }
}

export interface Shape {
    hit_record(ray: Ray): HitRecord | null;
}
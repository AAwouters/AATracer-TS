import { Ray } from "../../tracing/ray";
import { HitRecord } from "../../tracing/ray";
import { Color } from "../color";

export class SceneObject implements Shape {
    public shape: Shape;
    public color: Color;

    constructor(shape: Shape, color: Color) {
        this.shape = shape;
        this.color = color;
    }

    hit_record(ray: Ray): HitRecord | null {
        return this.shape.hit_record(ray);
    }
}

export interface Shape {
    hit_record(ray: Ray): HitRecord | null;
}
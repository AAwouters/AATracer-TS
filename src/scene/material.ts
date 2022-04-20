import { HitRecord } from "../tracing/ray";
import { Color } from "./color"

export class Material {
    color: Color;

    constructor(color: Color) {
        this.color = color;
    }
}

export class MaterialRecord extends HitRecord {
    public material: Material;

    constructor(hit_record: HitRecord, material: Material) {
        super(hit_record.t, hit_record.local_hit_point, hit_record.surface_normal);
        this.material = material;
    }
}
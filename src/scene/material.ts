import { Color, Vector3, Point3 } from "../math";
import { PI_INV } from "../math/constants";
import { HitRecord } from "../tracing/ray";

export class Material {
    diffuse_color: Color;
    specular_color: Color;
    specular_exponent: number;
    emitting_color: Color;
    transparant: boolean;

    constructor(
        diffuse_color: Color,
        specular_color: Color,
        specular_exponent: number,
        emitting_color: Color,
        transparant: boolean,
        ) {
        this.diffuse_color = diffuse_color;
        this.specular_color = specular_color;
        this.specular_exponent = specular_exponent;
        this.emitting_color = emitting_color;
        this.transparant = transparant;
    }

    public static diffuse(color: Color): Material {
        return new Material(
            color,
            Color.black(),
            0,
            Color.black(),
            false,
            );
    }

    public static specular(color: Color, exponent: number) {
        return new Material(
            Color.black(),
            color,
            exponent,
            Color.black(),
            false,
        );
    }

    public static light(color: Color) {
        return new Material(
            Color.black(),
            Color.black(),
            0,
            color,
            false,
        );
    }
}

export class MaterialRecord extends HitRecord {
    public material: Material;

    constructor(hit_record: HitRecord, material: Material) {
        super(hit_record.t, hit_record.local_hit_point, hit_record.surface_normal);
        this.material = material;
    }

    public scatter(this: MaterialRecord, w_in: Vector3, w_out: Vector3): Color {
        let normal = this.surface_normal;
        let normal_dot_w_in = normal.dot(w_in);
        let normal_dot_w_out= normal.dot(w_out);

        let w_in_is_outside = Math.sign(normal_dot_w_in) > 0;
        let w_out_is_outside = Math.sign(normal_dot_w_out) > 0;

        if (!this.material.transparant && (!w_in_is_outside || !w_out_is_outside)) {
            // Material is not transparant but either w_in or w_out is inside the object
            return Color.black();
        }

        if (w_in_is_outside == w_out_is_outside) {
            // Directions are on same side of the object => reflection
            let diffuse = this.material.diffuse_color.mul(PI_INV * normal_dot_w_in);

            let neg_w_in = w_in.inv();
            let reflection = neg_w_in.sub(normal.mul(2 * neg_w_in.dot(normal)));
            let cos_alpha = Math.max(0, reflection.dot(w_out));
            let specular = this.material.specular_color.mul(Math.pow(cos_alpha, this.material.specular_exponent));

            return diffuse.add(specular);
        } else {
            // Directions are on opposing sides of the object => refraction
            // Currently not handled
            return Color.black();
        }
    }
}
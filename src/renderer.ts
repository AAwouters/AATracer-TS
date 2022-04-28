import { Vector3, Color } from "./math";
import { generate_samples, SampleType } from "./math/sampling";
import { Scene } from "./scene/scene";
import { Ray } from "./tracing/ray";

export class Renderer {
    width: number;
    height: number;
    scene: Scene;
    sample_type: SampleType;
    nb_of_samples: number;


    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.scene = new Scene();
        this.sample_type = SampleType.Regular;
        this.nb_of_samples = 9;
    }

    public set_scene(scene: Scene) {
        this.scene = scene;
    }

    public render_to_frame(frame: Uint8ClampedArray) {     
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let color = this.render_pixel(row, col);
                this.set_pixel(frame, col, row, color);
            }
        }
    }

    public render_pixel(row: number, column: number): Color {


        let samples = generate_samples(this.sample_type, this.nb_of_samples);
        let samples_size = samples.length;

        let result = Color.black();

        samples.forEach(sample => {
            let sample_x = 2 * sample.x() - 1;
            let sample_y = 2 * sample.y() - 1;
            
            let x = column - 0.5 * this.width + sample_x;
            let y = (this.height - row) - 0.5 * this.height + sample_y;
            
            let ray = new Ray(
                new Vector3(x, y, 0),
                Vector3.unit_z().inv()
            );

            result = result.add(this.scene.trace_ray(ray));
        });


        return result.div(samples_size);
    }

    set_pixel(frame: Uint8ClampedArray, x: number, y: number, color: Color) {
        let index = 4 * (x + y * this.width);
        let inv_gamma = 1 / 2.2;
        color = color.pow(inv_gamma);
        color = color.clamp(0, 1);

        let color_byte = color.mul(255);
        frame[index] = color_byte.r();
        frame[index + 1] = color_byte.g();
        frame[index + 2] = color_byte.b();
        frame[index + 3] = 255;
    }
}
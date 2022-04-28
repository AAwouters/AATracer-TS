import { Vector3, Color } from "./math";
import { Scene } from "./scene/scene";
import { Ray } from "./tracing/ray";

export class Renderer {
    width: number;
    height: number;
    scene: Scene;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.scene = new Scene();
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
        let x = column - 0.5 * this.width;
        let y = row - 0.5 * this.height;

        let ray = new Ray(
            new Vector3(x, y, 0),
            Vector3.unit_z().inv()
        );

        return this.scene.trace_ray(ray);
    }

    set_pixel(frame: Uint8ClampedArray, x: number, y: number, color: Color) {
        let index = 4 * (x + y * this.width);
        let color_byte = color.mul(255);
        frame[index] = color_byte.r();
        frame[index + 1] = color_byte.g();
        frame[index + 2] = color_byte.b();
        frame[index + 3] = 255;
    }
}
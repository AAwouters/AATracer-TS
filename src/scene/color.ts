import { Vec3 } from "../math"

export class Color extends Vec3 {
    static black(): Color { return new Color(0, 0, 0); }
    static red():   Color { return new Color(1, 0, 0); }
    static green(): Color { return new Color(0, 1, 0); }
    static blue():  Color { return new Color(0, 0, 1); }
    static white(): Color { return new Color(1, 1, 1); }

    constructor(r: number, g: number, b: number) {
        super(r, g, b);
    }
}
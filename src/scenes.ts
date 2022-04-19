import { Vec3 } from "./math";
import { Color } from "./scene/color";
import { SceneObject } from "./scene/object/scene_object";
import { Sphere } from "./scene/object/sphere";
import { Scene } from "./scene/scene";


export function single_sphere(): Scene {
    let scene = new Scene;
    
    let sphere = new Sphere(new Vec3(0, 0, -100), 50);
    let sphere_object = new SceneObject(sphere, Color.blue());
    scene.add_object(sphere_object);

    return scene;
}
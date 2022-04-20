import { Vec3 } from "./math";
import { Color } from "./scene/color";
import { PointLight } from "./scene/light";
import { Material } from "./scene/material";
import { SceneObject } from "./scene/object/scene_object";
import { Sphere } from "./scene/object/sphere";
import { Scene } from "./scene/scene";


export function single_sphere(): Scene {
    let scene = new Scene;
    
    let sphere = new Sphere(new Vec3(0, 0, -100), 100);
    let sphere_object = new SceneObject(sphere, Material.diffuse(Color.blue()));
    scene.add_object(sphere_object);

    let light = new PointLight(new Vec3(1500, 0, -100), Color.white());
    scene.add_light(light);

    return scene;
}
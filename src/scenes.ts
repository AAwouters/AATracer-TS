import { Vector3, Color, Point3 } from "./math";
import { PointLight } from "./scene/light";
import { Material } from "./scene/material";
import { SceneObject } from "./scene/object/scene_object";
import { Sphere } from "./scene/object/sphere";
import { Scene } from "./scene/scene";


export function single_sphere(): Scene {
    let scene = new Scene;
    
    let sphere = new Sphere(new Vector3(0, 0, -1), 0.5);
    let sphere_object = new SceneObject(sphere, Material.diffuse(Color.blue()));
    scene.add_object(sphere_object);

    let sphere2 = new Sphere(new Point3(0, -100.5, -1), 100);
    let sphere_object2 = new SceneObject(sphere2, Material.diffuse(Color.green()));
    scene.add_object(sphere_object2);

    let light = new PointLight(new Vector3(0, 5, -1), Color.white());
    scene.add_light(light);

    return scene;
}
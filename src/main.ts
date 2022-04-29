import { Renderer } from "./renderer";
import { single_sphere } from "./scenes";

const ASPECT_RATIO = 16/9;
const WINDOW_WIDTH = 640;
const WINDOW_HEIGHT = Math.floor(WINDOW_WIDTH / ASPECT_RATIO);

const canvas = document.createElement('canvas');
canvas.id = 'TracingCanvas';
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
// canvas.style.border = "1px solid";

document.body.appendChild(canvas);

const context = canvas.getContext("2d");
if (context === null) { throw new Error("canvas 2d context is null"); }
let imageData = context.createImageData(canvas.width, canvas.height);

let renderer = new Renderer(canvas.width, canvas.height);
let scene = single_sphere();
renderer.set_scene(scene);
renderer.render_to_frame(imageData.data);

context.putImageData(imageData, 0, 0);

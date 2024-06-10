"use strict";
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";

let camera, renderer;
let cameraControls, effectController;

const clock = new THREE.Clock();

function SquareGeometry() {
    const triangle = new THREE.BufferGeometry();

    const vertices = new Float32Array([
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 1.0, 0.0,

        0.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
    ]);

    const uv = new Float32Array([
        0.75, 0.25,
        1.0, 0.25,
        1.0, 0.5,

        0.75, 0.25,
        1.0, 0.5,
        0.75, 0.5

    ]);

    triangle.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    triangle.setAttribute('uv', new THREE.BufferAttribute(uv, 2));

    return triangle;
}

function fillScene() {
    window.scene = new THREE.Scene();

    const myPolygon = new SquareGeometry();
    const myTexture = new THREE.TextureLoader().load('textures/lettergrid.png');
    const myPolygonMaterial = new THREE.MeshBasicMaterial({ map: myTexture });
    const polygonObject = new THREE.Mesh(myPolygon, myPolygonMaterial);
    window.scene.add(polygonObject);
}

function init() {
    const canvasWidth = 846;
    const canvasHeight = 494;
    const canvasRatio = canvasWidth / canvasHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0xFFFFFF, 1.0);

    camera = new THREE.PerspectiveCamera(1, canvasRatio, 50, 150);
    camera.position.set(0.5, 0.5, 100);

    cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0.5, 0.5, 0);
}

function addToDOM() {
    const container = document.getElementById('webGL');
    const canvas = container.getElementsByTagName('canvas');
    if (canvas.length > 0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild(renderer.domElement);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    const delta = clock.getDelta();
    cameraControls.update(delta);

    renderer.render(window.scene, camera);
}

try {
    init();
    fillScene();
    addToDOM();
    animate();
} catch (e) {
    const errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    $('#webGL').append(errorReport + e.stack);
}
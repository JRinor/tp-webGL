"use strict";
import * as THREE from "three";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {dat} from "/lib/dat.gui.min.js";
import {Coordinates} from "../lib/Coordinates.js";

let camera, renderer;
let cameraControls;

const clock = new THREE.Clock();

function fillScene() {
    window.scene = new THREE.Scene();

    const disk = new THREE.TextureLoader().load('disc.png');
    const material = new THREE.SpriteMaterial({map: disk});
    material.color.setHSL(0.9, 0.2, 0.6)
    for (let x = -10; x <= 10; x++) {
        for (let y = -10; y <= 10; y++) {
            for (let z = -10; z <= 10; z++) {
                const particles = new THREE.Sprite(material);
                particles.scale.set(35, 35, 35);
                particles.position.x = x*100;
                particles.position.y = y*100;
                particles.position.z = z*100;
                window.scene.add(particles);
            }
        }
    }
}

function init() {
    const canvasWidth = 846;
    const canvasHeight = 494;
    const canvasRatio = canvasWidth / canvasHeight;

    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0xAAAAAA, 1.0);

    camera = new THREE.PerspectiveCamera(55, canvasRatio, 2, 8000);
    camera.position.set(10, 5, 15);
    cameraControls = new OrbitControls(camera, renderer.domElement);
    cameraControls.target.set(0, 0, 0);
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
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';

import logoSVG from '../assets/logoloader.svg?url';



function Loading() {

    const canvasRef = useRef();

    useEffect(() => {

        // creacion del lienzo donde estara el loader

        const canvas = canvasRef.current;
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true  
        })

        renderer.setSize(window.innerWidth, window.innerHeight);


        // creacion del escenario y camara
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 300;

        // carga del svg y creacion de particulas

        const loader = new SVGLoader();

        loader.load(logoSVG, (data) => {

            const points = [];

            const offsetX = 200;
            const offsetY = 100;
            const scale = 0.2; //

        data.paths.forEach((path) => {
            const subPaths = path.subPaths;
            subPaths.forEach((subPath) => {
                const pointsOnCurve = subPath.getSpacedPoints(100); 
                    pointsOnCurve.forEach((pt) => {
                    points.push((pt.x - offsetX) * scale, (pt.y - offsetY) * scale, 0);
                });
            });
        });

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));

        const material = new THREE.PointsMaterial({
            size: 1.5,
            color: 0xc6c6c6
        });

        const mesh = new THREE.Points(geometry, material);
        scene.add(mesh);

        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.z += 0.002;
            renderer.render(scene, camera);
        }

        animate();

        }); 

        

    } , []
        
    )

    return (
        <canvas ref={canvasRef} className="w-full h-screen block"/>
    )
}

export default Loading

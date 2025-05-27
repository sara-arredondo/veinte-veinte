import { useEffect, useRef } from "react";
import * as THREE from "three";

import React from 'react'

function Loading() {

    const canvasRef = useRef();

    useEffect(() => {

        const canvas = canvasRef.current;

        const renderer = new THREE.WebGL3DRender({
            canvas: canvas,
            antialias: true  
        })

        renderer.setSize(window.innerWidth, window.innerHeight);

        //codigo de letras

    } , []
        
    )
 return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-screen h-screen z-50"/>
  )
}

export default Loading

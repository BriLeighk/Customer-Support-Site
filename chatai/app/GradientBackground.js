'use client';
import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from 'shadergradient';
import * as reactSpring from '@react-spring/three';
import * as drei from '@react-three/drei';
import * as fiber from '@react-three/fiber';

const GradientBackground = () => {
  return (
    <ShaderGradientCanvas
      importedFiber={{ ...fiber, ...drei, ...reactSpring }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Ensure it's behind other content
      }}
    >
      <ShaderGradient
        control='query'
        urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=1.5&cPolarAngle=90&cameraZoom=1&color1=%230b1623&color2=%23540DE7&color3=%23EF21FE&destination=onCanvas&embedMode=off&envPreset=city&fov=40&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=10.6&rangeStart=3.3&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=2.5&uDensity=1.6&uFrequency=5.5&uSpeed=0.1&uStrength=1.9&uTime=3.3&wireframe=false'
      />
    </ShaderGradientCanvas>
  );
};

export default GradientBackground;
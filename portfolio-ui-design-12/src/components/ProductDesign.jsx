import VisualBoundary from "./VisualBoundary";
import React, { Suspense } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Shoe from "./Shoe";
import styled from "styled-components";

/* Description overlay for the Product Design 3D view. */
const Desc = styled.div`
  width: 200px;
  height: 70px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  bottom: 200px;
  right: 100px;

  @media only screen and (max-width: 768px) {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

/** Product Design tab: Shoe 3D model (public/shoe.gltf) inside Drei Stage with built-in lighting. */
const ProductDesign = () => {
  return (
    <>
      <VisualBoundary><Canvas fallback={<p role="status">3D visual unavailable.</p>}>
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Stage environment={null} intensity={0.6}>
            <Shoe />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas></VisualBoundary>
      <Desc>
        We design products with a strong focus on both world class design and
        ensuring your product is a market success.
      </Desc>
    </>
  );
};

export default ProductDesign;

/**
 * Loader - 3D scene loading indicator shown inside Canvas while models load.
 * useProgress from @react-three/drei reports loading progress (0–100).
 */
import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html center className="text-xl font-normal text-center">
      {progress}% Loaded
    </Html>
  );
};

export default Loader;

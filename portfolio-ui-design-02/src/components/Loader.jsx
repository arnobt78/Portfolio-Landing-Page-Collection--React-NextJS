/**
 * Loader - overlay shown above the 3D scene while models load.
 * useProgress from @react-three/drei reports loading progress (0–100).
 */
import { useProgress } from "@react-three/drei";

const Loader = () => {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div role="status" className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none text-xl font-normal text-center">
      {progress}% Loaded
    </div>
  );
};

export default Loader;

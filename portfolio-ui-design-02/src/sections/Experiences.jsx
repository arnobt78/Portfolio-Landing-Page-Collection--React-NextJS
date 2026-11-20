/**
 * Experiences section - wraps Timeline component with work history data.
 * Data comes from constants/experiences; Timeline handles scroll-linked animation.
 */
import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";

const Experiences = () => {
  return (
    <div className="w-full">
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;

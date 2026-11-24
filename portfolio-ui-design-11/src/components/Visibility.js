import VisibilityModule from "react-on-screen";

// Vite's CommonJS interop can expose the component on a nested default export.
const Visibility = VisibilityModule.default ?? VisibilityModule;
export default Visibility;

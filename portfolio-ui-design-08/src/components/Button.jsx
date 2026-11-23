/**
 * CTA button. name = label; isBeam = show animated ping dot; containerClass = extra Tailwind classes.
 * Use as <Button name="Click" isBeam containerClass="w-full" /> (e.g. for links, wrap in <a>).
 */
const Button = ({ name, isBeam = false, containerClass, href }) => {
  const Element = href ? 'a' : 'button';
  return (
    <Element href={href} className={`btn ${containerClass || ''}`}>
      {isBeam && (
        <span className="relative flex h-3 w-3">
          <span className="btn-ping"></span>
          <span className="btn-ping_dot"></span>
        </span>
      )}
      {name}
    </Element>
  );
};

export default Button;

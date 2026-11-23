/**
 * Primary CTA button. Accepts size (sm | default | lg), optional className, and forwards other props (onClick, type, disabled, etc.) to the underlying <button>.
 */
export const Button = ({
  className = "",
  size = "default",
  href,
  children,
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25";

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`;
  const Element = href ? "a" : "button";
  return (
    <Element className={classes} {...(href ? { href } : { type: "button" })} {...props}>
      {/* Wrapper span keeps focus ring and layout consistent when mixing text + icons */}
      <span className="relative flex items-center justify-center gap-2">
        {children}
      </span>
    </Element>
  );
};

import classNames from "classnames";

export const HeroTitle = ({ children, className }) => {
  return <h1>{children}</h1>;
};

export const HeroSubtitle = ({ children, className }) => {
  return (
    <p
      className={classNames(
        "mb-12 text-lg text-primary-text md:text-xl",
        className
      )}
    >
      {children}
    </p>
  );
};

export const Hero = ({ children }) => {
  return <div className="text-center">{children}</div>;
};

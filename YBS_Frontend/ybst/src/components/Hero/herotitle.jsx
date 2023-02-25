import classNames from "classnames";

export const HeroTitle = ({ children, className }) => {
  return (
    <h1
      className={classNames(
        "text-gradient my-6 text-6xl md:text-8xl",
        className
      )}
    >
      {children}
    </h1>
  );
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

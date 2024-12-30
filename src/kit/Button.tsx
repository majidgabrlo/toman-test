import classNames from "classnames";
import { ComponentPropsWithRef, ReactNode } from "react";

const Button = ({
  children,
  className,
  ...props
}: ComponentPropsWithRef<"button"> & { children: ReactNode }) => {
  return (
    <button
      className={classNames(
        "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

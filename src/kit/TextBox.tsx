import { ComponentPropsWithRef } from "react";

const TextBox = (props: ComponentPropsWithRef<"input">) => {
  return (
    <input
      type="text"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      {...props}
    />
  );
};

export default TextBox;

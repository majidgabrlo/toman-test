import { ComponentPropsWithRef } from "react";

const Selectbox = ({
  options,
  ...rest
}: {
  options: { value: string; title: string }[];
} & ComponentPropsWithRef<"select">) => {
  return (
    <select
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
      {...rest}
    >
      <option value="">---</option>
      {options.map((item) => (
        <option value={item.value} key={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
};

export default Selectbox;

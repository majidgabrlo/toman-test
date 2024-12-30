import classNames from "classnames";
import { Fragment, ReactNode } from "react";

type Field<T> = {
  header: string;
  headerClassName?: string;
  bodyClassName?: string;
  data: (data: T) => ReactNode;
};

type GridTableProps<T> = {
  fields: Field<T>[];
  data: T[];
  containerClassName?: string;
  fieldClassName?: string;
  oddRecordClassName?: string;
  evenClassName?: string;
  headerClassName?: string;
};

function GridTable<T>({
  fields,
  data,
  fieldClassName,
  evenClassName,
  oddRecordClassName,
  headerClassName,
  containerClassName,
}: GridTableProps<T>) {
  const headers = fields.map((item) => ({
    title: item.header,
    className: item.headerClassName,
  }));

  return (
    <div
      className={classNames("md:grid", containerClassName)}
      style={{ gridTemplateColumns: `repeat(${fields.length},minmax(0,1fr))` }}
    >
      {headers.map((header) => (
        <div
          key={header.title}
          className={classNames(
            "hidden md:block px-3 text-[14px] leading-4 font-bold",
            headerClassName,
            header.className
          )}
        >
          {header.title}
        </div>
      ))}
      {data.map((item, i) => {
        return (
          <Fragment key={i}>
            {fields.map((field) => (
              <div
                key={JSON.stringify(field)}
                className={classNames(
                  "flex justify-between text-[14px] leading-4",
                  fieldClassName,
                  {
                    [oddRecordClassName || ""]: i % 2,
                    [evenClassName || ""]: !(i % 2),
                  },
                  field.bodyClassName
                )}
              >
                <div className="text-[14px] leading-4 font-bold md:hidden px-3 md:px-0">
                  {field.header}
                </div>
                <div className="px-3 self-center">{field.data(item)}</div>
              </div>
            ))}
          </Fragment>
        );
      })}
    </div>
  );
}

export default GridTable;

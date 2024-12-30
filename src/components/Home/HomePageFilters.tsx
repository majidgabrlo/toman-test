import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { TGetAllPaymenPayload } from "../../hooks/api/useGetAllPayments";
import Selectbox from "../../kit/Selectbox";
import TextBox from "../../kit/TextBox";

type THomePageFilterProps = {
  searchValue: string;
  onSearchChange: (str: string) => void;
  statusValue: TGetAllPaymenPayload["status"];
  onStatusChange: (status: TGetAllPaymenPayload["status"]) => void;
  typeValue: TGetAllPaymenPayload["type"];
  onTypeChange: (status: TGetAllPaymenPayload["type"]) => void;
};

const HomePageFilters = ({
  onSearchChange,
  onStatusChange,
  onTypeChange,
  searchValue,
  statusValue,
  typeValue,
}: THomePageFilterProps) => {
  const [search, setSearch] = useState(searchValue);
  const debouncedValue = useDebounce(search, 1000);
  useEffect(() => {
    onSearchChange(debouncedValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className="grid md:grid-cols-3 gap-2 mb-3">
      <TextBox
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Search..."
      />
      <Selectbox
        options={[
          { title: "Success", value: "success" },
          { title: "Pending", value: "pending" },
          { title: "Failed", value: "failed" },
        ]}
        value={statusValue}
        onChange={(e) => {
          onStatusChange(e.target.value as TGetAllPaymenPayload["status"]);
        }}
      />
      <Selectbox
        options={[
          { title: "Salary", value: "salary" },
          { title: "Bonus", value: "bonus" },
          { title: "Commission", value: "commission" },
          { title: "Transportation", value: "transportation" },
          { title: "Overtime", value: "overtime" },
        ]}
        value={typeValue}
        onChange={(e) => {
          onTypeChange(e.target.value as TGetAllPaymenPayload["type"]);
        }}
      />
    </div>
  );
};

export default HomePageFilters;

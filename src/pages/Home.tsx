import { Link } from "react-router-dom";
import GridTable from "../components/Home/GridTable";
import useGetAllPayments, {
  TGetAllPaymenPayload,
  TGetAllPaymentResult,
} from "../hooks/api/useGetAllPayments";
import { useGetSearchParams } from "../hooks/useGetSearchParams";
import Pagination from "../kit/Pagination";
import { convertDate } from "../utils/convertDate";
import HomePageFilters from "../components/Home/HomePageFilters";
import Spinner from "../kit/Spinner";
import { ReactNode, useEffect, useMemo } from "react";
import Button from "../kit/Button";

const Home = () => {
  const [params, setParams] = useGetSearchParams<TGetAllPaymenPayload>();

  const { data, isLoading, isSuccess, isError, refetch } = useGetAllPayments({
    limit: 15,
    page: Number(params.page) || 1,
    search: params.search,
    status: params.status,
    type: params.type,
  });
  useEffect(() => {
    console.log({ params });

    if (!data?.entities.length && isSuccess && params.page !== 1) {
      setParams({ page: 1 });
    }
  }, [data, isSuccess]);

  const fields: {
    header: string;
    data: (data: ArrayElement<TGetAllPaymentResult["entities"]>) => ReactNode;
  }[] = useMemo(
    () => [
      {
        header: "Type",
        data(data) {
          return <div>{data.type}</div>;
        },
      },
      {
        header: "Value",
        data(data) {
          return <div>{data.value}</div>;
        },
      },
      {
        header: "Status",
        data(data) {
          return <div>{data.status}</div>;
        },
      },
      {
        header: "Paid at",
        headerClassName: "!col-span-3",
        bodyClassName: "col-span-3",

        data(data) {
          return <div>{convertDate(data.paid_at)}</div>;
        },
      },
      {
        header: "Details",
        data(data) {
          return (
            <div>
              <Link className="text-blue-500" to={`/${data.id}`}>
                See Details
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="p-5">
      <div className="font-bold text-2xl mb-3">Payments</div>
      <HomePageFilters
        onSearchChange={(search) => setParams({ search })}
        onStatusChange={(status) => setParams({ status })}
        onTypeChange={(type) => setParams({ type })}
        searchValue={params.search || ""}
        statusValue={params.status}
        typeValue={params.type}
      />
      {isSuccess && !data?.entities?.length && (
        <div className="font-semibold text-2xl text-center mt-12">
          No result found
        </div>
      )}
      {(isLoading || isError) && (
        <div className="flex justify-center my-8 items-center">
          {isLoading && <Spinner />}
          {isError && (
            <div className="flex flex-col items-center gap-y-1 text-2xl font-bold text-red-600">
              <div>Something went wrong</div>
              <Button
                className="!bg-white text-blue-700"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      )}
      {!!data?.entities.length && (
        <>
          <div className="border rounded-lg mb-2">
            <GridTable<ArrayElement<TGetAllPaymentResult["entities"]>>
              data={data?.entities || []}
              containerClassName="!grid-cols-7"
              fieldClassName="py-3"
              oddRecordClassName="bg-gray-100"
              evenClassName="bg-gray-50"
              headerClassName="py-3 border-b"
              fields={fields}
            />
          </div>
          <Pagination
            totalPage={Math.ceil((data?.total || 1) / (data?.limit || 1))}
            page={Number(params?.page) || 1}
            onChange={(page) => {
              setParams({ page });
            }}
          />
        </>
      )}
    </div>
  );
};

export default Home;

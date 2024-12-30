import { useNavigate, useParams } from "react-router-dom";
import useGetPayment from "../hooks/api/useGetPayment";
import Spinner from "../kit/Spinner";
import Button from "../kit/Button";
import classNames from "classnames";
import { convertDate } from "../utils/convertDate";

const PaymentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useGetPayment({ id });
  const navigate = useNavigate();

  return (
    <div className="max-w-[500px] mx-auto mt-3">
      <div
        className={classNames("flex justify-center", {
          "my-5": isError || isLoading,
        })}
      >
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
      {data && (
        <>
          <div className="flex items-center px-2 gap-x-3 mb-3">
            <div
              onClick={() => navigate(-1)}
              className="text-2xl cursor-pointer"
            >
              &#8592;
            </div>
            <div className="font-bold text-2xl">{data?.status}</div>
          </div>

          <div className="mx-auto space-y-3 border rounded-lg p-3">
            <div className="flex justify-between">
              <div>Type</div>
              <div>{data?.type}</div>
            </div>
            <div className="flex justify-between">
              <div>Status</div>
              <div>{data?.status}</div>
            </div>
            <div className="flex justify-between">
              <div>Value</div>
              <div>{data?.value}</div>
            </div>
            <div className="flex justify-between">
              <div>Paid at</div>
              <div>{convertDate(data?.paid_at)}</div>
            </div>
            <div className="flex justify-between">
              <div>Status</div>
              <div>{data?.status}</div>
            </div>
            <div className="flex justify-between">
              <div>Description</div>
              <div>{data?.description}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentDetail;

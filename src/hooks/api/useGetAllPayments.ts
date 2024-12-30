import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../utils/Axios";
import { TPayment } from "../../types/Payment";

export type TGetAllPaymentResult = {
  entities: TPayment[];
  total: number;
  page: number;
  limit: number;
};

type TPaymentType =
  | "salary"
  | "bonus"
  | "commission"
  | "transportation"
  | "overtime";

type TPaymentStatuses = "success" | "pending" | "failed";

export type TGetAllPaymenPayload = {
  type?: TPaymentType;
  status?: TPaymentStatuses;
  page?: number;
  limit?: number;
  search?:string
};

export default function useGetAllPayments(payload?: TGetAllPaymenPayload) {
  return useQuery({
    queryKey: ["GetAllPayments", JSON.stringify(payload)],
    queryFn: () =>
      Axios.get<TGetAllPaymentResult>(`/payments`, {
        params: payload,
      }).then((res) => res.data),
  });
}

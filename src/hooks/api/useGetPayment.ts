import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../utils/Axios";
import { TPayment } from "../../types/Payment";

export default function useGetPayment({ id }: { id?: string }) {
  return useQuery({
    queryKey: ["GetPayment", id],
    enabled: !!id,
    queryFn: () =>
      Axios.get<TPayment>(`/payments/${id}`).then((res) => res.data),
  });
}

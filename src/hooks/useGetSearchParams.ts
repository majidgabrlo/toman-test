import { useSearchParams } from "react-router-dom";

export function useGetSearchParams<
  T extends Record<string, number | string | undefined>
>() {
  const [searchParams, setSearchParams] = useSearchParams();

  const typedSearchParams = Object.fromEntries(
    Array.from(searchParams.entries())
  ) as T;

  const updateSearchParams = (params: Partial<T>) => {
    const newParams = {
      ...typedSearchParams,
      ...params,
    };

    setSearchParams(newParams as Record<string, string>);
  };

  return [typedSearchParams, updateSearchParams] as const;
}

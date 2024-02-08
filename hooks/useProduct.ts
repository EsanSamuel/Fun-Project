import useSWR from "swr";
import fetcher from "@/lib/axios";

const useProduct = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/product", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useProduct;

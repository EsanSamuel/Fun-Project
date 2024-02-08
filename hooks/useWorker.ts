import useSWR from "swr";
import fetcher from "@/lib/axios";

const useWorker = () => {
  const { data, isLoading, error, mutate } = useSWR("/api/worker", fetcher);

  return {
    data,
    isLoading,
    error,
    mutate,
  };
};

export default useWorker;

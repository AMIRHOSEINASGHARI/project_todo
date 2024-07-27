"use client";

import { fetchSession } from "@/services/queries";
// react query
import { useQuery } from "@tanstack/react-query";
// types
import { Session } from "@/types/shared";

const useSession = (): {
  data: { session: Session; message: string; success: boolean };
  isLoading: boolean;
  isError: boolean;
  error: unknown;
} => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    retry: 1,
    staleTime: 1 * 60 * 60,
    cacheTime: 1 * 60 * 60,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};

export default useSession;

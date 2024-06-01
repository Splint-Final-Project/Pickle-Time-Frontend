import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { picklesRequests } from "@/apis/pickle.api";

export const useGetInfinitePickles = () => {
  return useInfiniteQuery({
    queryKey: ["infinitePickles"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => await picklesRequests.getWithPage(),

    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },

    select: (data) => {
      return data;
    },
  });
}
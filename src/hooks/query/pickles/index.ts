import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { picklesRequests } from "@/apis/pickle.api";
import { Coordinates } from "@/apis/types/pickles.type";

export const useGetInfinitePickles = () => {
  return useInfiniteQuery({
    queryKey: ["pickles"],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => await picklesRequests.getWithPage(),

    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },

    select: (data) => {
      return data;
    },
  });
};

export const useGetNearbyPickles = (location: Coordinates | null) => {
  return useQuery({
    queryKey: ["pickles", "nearby"],
    queryFn: async () => await picklesRequests.getNearby(location),
  })
};
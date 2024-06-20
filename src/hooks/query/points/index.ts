import client from '@/apis/axios';
import { useQuery } from '@tanstack/react-query';

export const useMyPoints = () => {
  return useQuery({
    queryKey: ['points'],
    queryFn: async () => await client.get('/users/points'),
  });
};

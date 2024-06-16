import { useDeletePickleLikeMutation, usePickleLikeMutation, useGetLikeCount } from '@/hooks/query/like';

export default function useHeartButtonClick(pickleId: string) {
  const { data } = useGetLikeCount(pickleId);

  // const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();

  //   if (data && data.data.length) {
  //     deleteLikeMutate();
  //   } else if (data && !data.data.length) {
  //     postLikeMutate();
  //   }
  // };

  return { isLiked: data?.data.likeCount === 0, like: data?.data.likeCount };
}

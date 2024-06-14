import { useGetLikePickle, useDeletePickleLikeMutation, usePickleLikeMutation } from '@/hooks/query/like';

export default function useHeartButtonClick(pickleId: string) {
  const { data } = useGetLikePickle(pickleId);
  const { mutate: postLikeMutate } = usePickleLikeMutation(pickleId);
  const { mutate: deleteLikeMutate } = useDeletePickleLikeMutation(pickleId);

  const handleHeartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (data && data.data.length) {
      deleteLikeMutate();
    } else if (data && !data.data.length) {
      postLikeMutate();
    }
  };

  return { isLiked: data?.data.length > 0, handleHeartClick };
}

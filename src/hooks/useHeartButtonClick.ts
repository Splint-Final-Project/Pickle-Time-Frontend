import React, { useCallback, useState } from 'react';
import { useDeletePickleLikeMutation, usePickleLikeMutation } from '@/hooks/query/like';

export interface HeartClickProps {
  pickleId: string;
  isInUserWishList: boolean;
}

export default function useHeartButtonClick({ pickleId, isInUserWishList }: HeartClickProps) {
  const [isHeartClicked, setIsHeartClicked] = useState(isInUserWishList);

  const { mutate: postLikeMutate } = usePickleLikeMutation(() => setIsHeartClicked(true));
  const { mutate: deleteLikeMutate } = useDeletePickleLikeMutation(() => setIsHeartClicked(false));

  const handleHeartClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (isHeartClicked) return deleteLikeMutate(pickleId);
      return postLikeMutate(pickleId);
    },
    [pickleId, isHeartClicked],
  );

  return { isHeartClicked, handleHeartClick };
}

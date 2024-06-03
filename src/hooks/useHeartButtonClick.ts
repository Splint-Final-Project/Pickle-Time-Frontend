import React, { useCallback, useState } from 'react';
import { useDeletePickelLikeMutation, usePickelLikeMutation } from './query/pickles/mutation';

export interface HeartClickProps {
  pickleId: string;
  isInUserWishList: boolean;
}

export default function useHeartButtonClick({ pickleId, isInUserWishList }: HeartClickProps) {
  const [isHeartClicked, setIsHeartClicked] = useState(isInUserWishList);

  const { mutate: postLikeMutate } = usePickelLikeMutation(() => setIsHeartClicked(true));
  const { mutate: deleteLikeMutate } = useDeletePickelLikeMutation(() => setIsHeartClicked(false));

  const handleHeartClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      if (isHeartClicked) return deleteLikeMutate(pickleId);
      return postLikeMutate(pickleId);
    },
    [pickleId, isHeartClicked],
  );

  return { isHeartClicked, handleHeartClick };
}

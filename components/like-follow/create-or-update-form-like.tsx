import React, { useState } from "react";
import * as yup from "yup";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { CreateOrUpdateOneLikeAPI } from "@/api-site/like";
import { AlertDangerNotification } from "@/utils";

const CreateOrUpdateFormLike: React.FC<{
  item?: any;
  typeLike: 'POST' | 'COMMENT'
}> = ({ item, typeLike }) => {
  const [like, setLike] = useState(false)
  const [isLike, setIsLike] = useState(item?.isLike)
  const [totalLike, setTotalLike] = useState(item?.totalLike ?? 0)


  // Create or Update data
  const saveMutation = CreateOrUpdateOneLikeAPI({
    onSuccess: () => { },
    onError: (error?: any) => { },
  });

  const likeItem = async (item: any) => {
    setIsLike((lk: boolean) => !lk)
    isLike ? setTotalLike((lk: number) => --lk) : setTotalLike((lk: number) => ++lk)
    try {
      await saveMutation.mutateAsync({
        likeableId: item?.id, type: typeLike, isLike
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }

  }

  return (
    <>
      {item?.isLike && isLike || like ?
        <button onClick={() => { likeItem(item), setLike(false) }} className="text-lg text-indigo-600">
          <MdOutlineFavorite />
        </button> :
        <button onClick={() => { likeItem(item), setLike(true) }} className="text-lg">
          <MdFavoriteBorder />
        </button>
      }

      <span className="ml-1.5 font-normal text-sm">
        {totalLike}
      </span>
    </>
  );
};

export { CreateOrUpdateFormLike };

import { GalleryFormModel, ResponseGalleryModel } from "@/types/gallery";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest } from "@/utils/pagination-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const deleteOneFollowersAPI = async (payload: {
  followerId: string;
}): Promise<{ data: ResponseGalleryModel }> => {
  const { followerId } = payload;
  return await makeApiCall({
    action: "deleteOneFollowers",
    urlParams: { followerId },
  });
};

export const createOneFollowersAPI = async (payload: {
  followerId: string;
}): Promise<{ data: ResponseGalleryModel }> => {
  const { followerId } = payload;
  return await makeApiCall({
    action: "createOneFollowers",
    urlParams: { followerId },
  });
};

export const getFollowersAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponseGalleryModel }> => {
  return await makeApiCall({
    action: "getFollowers",
    queryParams: payload,
  });
};

export const getFollowingsAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponseGalleryModel }> => {
  return await makeApiCall({
    action: "getFollowings",
    queryParams: payload,
  });
};

import { ResponseFollowModel } from "@/types/follow";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest } from "@/utils/pagination-item";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CreateOrDeleteOneFollowerAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: {
      followerId?: string;
      action: "DELETE" | "CREATE";
    }): Promise<any> => {
      const { followerId, action } = payload;

      if (action === "DELETE") {
        return await makeApiCall({
          action: "deleteOneFollowers",
          body: payload,
          urlParams: { followerId },
        });
      }

      if (action === "CREATE") {
        return await makeApiCall({
          action: "createOneFollowers",
          body: payload,
          urlParams: { followerId },
        });
      }
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries();
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries();
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};

export const deleteOneFollowersAPI = async (payload: {
  followerId: string;
}): Promise<{ data: ResponseFollowModel }> => {
  const { followerId } = payload;
  return await makeApiCall({
    action: "deleteOneFollowers",
    urlParams: { followerId },
  });
};

export const createOneFollowersAPI = async (payload: {
  followerId: string;
}): Promise<{ data: ResponseFollowModel }> => {
  const { followerId } = payload;
  return await makeApiCall({
    action: "createOneFollowers",
    urlParams: { followerId },
  });
};

export const getFollowersAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponseFollowModel }> => {
  return await makeApiCall({
    action: "getFollowers",
    queryParams: payload,
  });
};

export const getFollowingsAPI = async (
  payload: PaginationRequest
): Promise<{ data: ResponseFollowModel }> => {
  return await makeApiCall({
    action: "getFollowings",
    queryParams: payload,
  });
};

import { MembershipFormModel } from "@/types/membership";
import {
  PostFormModel,
  PostModel,
  PostType,
  ResponsePostModel,
} from "@/types/post";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const CreateOrUpdateOneMembershipAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["memberships"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (
      payload: MembershipFormModel & { membershipId?: string }
    ): Promise<any> => {
      const { membershipId, newImageLists } = payload;
      let data = new FormData();
      data.append("title", `${payload.title ?? ""}`);
      data.append("description", `${payload.description ?? ""}`);
      data.append("pricePerMonthly", `${payload.pricePerMonthly ?? ""}`);
      data.append("pricePerYearly", `${payload.pricePerYearly ?? ""}`);
      data.append("messageWelcome", `${payload.messageWelcome ?? ""}`);

      payload?.imageList?.length > 0 &&
        payload?.imageList?.forEach((file: any) => {
          data.append("attachmentImages", file?.originFileObj as RcFile);
        });

      if (membershipId) {
        const result = await makeApiCall({
          action: "updateOneUpload",
          body: { newImageLists },
          queryParams: { uploadableId: membershipId, model: "MEMBERSHIP" },
        });

        if (result) {
          await makeApiCall({
            action: "updateOneMembership",
            body: data,
            urlParams: { membershipId },
          });
        }

        return "Ok";
      } else {
        return await makeApiCall({
          action: "createOneMembership",
          body: data,
        });
      }
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey });
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey });
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries({ queryKey });
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};

export const DeleteOneMembershipAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["memberships"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { membershipId: string }): Promise<any> => {
      const { membershipId } = payload;

      return await makeApiCall({
        action: "deleteOneMembership",
        urlParams: { membershipId },
      });
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({ queryKey });
        if (onSuccess) {
          onSuccess();
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey });
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries({ queryKey });
        if (onError) {
          onError(error);
        }
      },
    }
  );

  return result;
};

export const GetOneMembershipAPI = (payload: {
  membershipId?: string;
  userId?: string;
}) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["membership", { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneMembership",
        queryParams: payload,
      }),
    refetchOnWindowFocus: true,
  });

  return { data: data?.data as PostModel, isError, isLoading, status };
};

export const getMembershipsAPI = async (
  payload: {
    userId: string;
  } & PaginationRequest
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: "getMemberships",
    queryParams: payload,
  });
};

export const GetInfiniteMembershipsAPI = (payload: {
  userId: string;
  take: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { userId, take, sort, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getMembershipsAPI({
        userId,
        take,
        sort,
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};

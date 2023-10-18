import { MembershipFormModel, MembershipModel } from "@/types/membership";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";
import { ResponseMembershipModel } from "../types/membership";

export const CreateOrUpdateOneMembershipAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["memberships"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: MembershipFormModel & { membershipId?: string }
    ) => {
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
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
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
  });

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
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: { membershipId: string }) => {
      const { membershipId } = payload;
      return await makeApiCall({
        action: "deleteOneMembership",
        urlParams: { membershipId },
      });
    },
    onError: async (error) => {
      await queryClient.invalidateQueries({ queryKey });
      if (onError) {
        onError(error);
      }
    },
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
  });

  return result;
};

export const GetOneMembershipAPI = (payload: {
  membershipId?: string;
  organizationId?: string;
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

  return { data: data?.data as MembershipModel, isError, isLoading, status };
};

export const getMembershipsAPI = async (
  payload?: {
    organizationId: string;
  } & PaginationRequest
): Promise<{ data: ResponseMembershipModel }> => {
  return await makeApiCall({
    action: "getMemberships",
    queryParams: payload,
  });
};

export const GetAllMembershipsAPI = (payload: {
  organizationId: string;
  take: number;
  page: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { organizationId, take, sort, queryKey, page } = payload;
  const { data, isError, isLoading, status } = useQuery({
    queryKey: queryKey,
    queryFn: async () =>
      await getMembershipsAPI({
        organizationId,
        take: take,
        sort: sort,
        page: page,
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data, isError, isLoading, status };
};

export const GetInfiniteMembershipsAPI = (payload: {
  organizationId: string;
  take: number;
  status?: string;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { organizationId, take, sort, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 0 }) =>
      await getMembershipsAPI({
        organizationId,
        take,
        sort,
        page: pageParam,
      }),
    initialPageParam: 0,
  });
};

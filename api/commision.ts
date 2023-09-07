import {
  CommissionFormModel,
  CommissionModel,
  ResponseCommissionModel,
} from "@/types/commission";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest, SortModel } from "@/utils/pagination-item";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { RcFile } from "antd/es/upload";

export const CreateOrUpdateOneCommissionAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["commissions"];
  const queryClient = useQueryClient();
  const result = useMutation(
    async (
      payload: CommissionFormModel & { commissionId?: string }
    ): Promise<any> => {
      const { commissionId } = payload;
      let data = new FormData();
      data.append("title", `${payload.title ?? ""}`);
      data.append("price", `${payload.price ?? ""}`);
      data.append("urlMedia", `${payload.urlMedia ?? ""}`);
      data.append("description", `${payload.description ?? ""}`);

      payload?.attachment?.fileList?.length > 0 &&
        payload?.attachment?.fileList?.forEach((file: any) => {
          data.append("attachment", file?.originFileObj as RcFile);
        });

      return commissionId
        ? await makeApiCall({
            action: "updateOneCommission",
            body: data,
            urlParams: { commissionId },
          })
        : await makeApiCall({
            action: "createOneCommission",
            body: data,
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

export const DeleteOneCommissionAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: { CommissionId: string }): Promise<any> => {
      const { CommissionId } = payload;

      return await makeApiCall({
        action: "deleteOneCommission",
        urlParams: { CommissionId },
      });
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

export const GetOneCommissionAPI = (payload: {
  CommissionId?: string;
  userId?: string;
}) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["commission", { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneCommission",
        queryParams: payload,
      }),
    refetchOnWindowFocus: true,
  });

  return { data: data?.data as CommissionModel, isError, isLoading, status };
};

export const getOneFileCommissionAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/commissions/file/${fileName}`
    : null;

export const getCommissionsAPI = async (
  payload: {
    userId: string;
  } & PaginationRequest
): Promise<{ data: ResponseCommissionModel }> => {
  return await makeApiCall({
    action: "getCommissions",
    queryParams: payload,
  });
};

export const GetInfiniteCommissionsAPI = (payload: {
  userId: string;
  take: number;
  sort: SortModel;
  queryKey: string[];
}) => {
  const { userId, take, sort, queryKey } = payload;
  return useInfiniteQuery({
    queryKey: queryKey,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: async ({ pageParam = 1 }) =>
      await getCommissionsAPI({
        userId,
        take,
        sort,
        page: pageParam,
      }),
    keepPreviousData: true,
  });
};

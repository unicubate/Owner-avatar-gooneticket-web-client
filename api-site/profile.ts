import {
  CurrencyModel,
  NextStepProfileFormModel,
  ProfileFormModel,
  ProfileModel,
} from "@/types/profile.type";
import { makeApiCall } from "@/utils/end-point";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const UpdateOneProfileNextStepAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["user"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: NextStepProfileFormModel): Promise<any> => {
      return await makeApiCall({
        action: "updateOneProfileNextStep",
        body: payload,
        urlParams: { userId: payload?.userId },
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

export const UpdateOneProfileAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ["user"];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (
      payload: ProfileFormModel & { profileId: string }
    ): Promise<any> => {
      return await makeApiCall({
        action: "updateOneProfile",
        body: payload,
        urlParams: { profileId: payload?.profileId },
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

export const GetOneProfileAPI = (payload: { profileId: string }) => {
  const { profileId } = payload;
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["profile", { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: "getOneProfile",
        urlParams: { profileId },
      }),
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as ProfileModel | any, isError, isLoading, status };
};


export const GetAllCurrenciesAPI = (search?: string) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["currencies"],
    queryFn: async () =>
      await makeApiCall({
        action: "getAllCurrencies",
        queryParams: search,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as any, isError, isLoading, status };
};

export const GetAllCountiesAPI = (search?: string) => {
  const { data, isError, isLoading, status } = useQuery({
    queryKey: ["countries"],
    queryFn: async () =>
      await makeApiCall({
        action: "getAllCounties",
        queryParams: search,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return { data: data?.data as any, isError, isLoading, status };
};

export const getOneFileProfileAPI = (fileName: string) =>
  fileName
    ? `${process.env.NEXT_PUBLIC_HOST_SERVER}/users/file/${fileName}`
    : null;

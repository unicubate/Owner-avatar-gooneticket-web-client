import { ResponsePostModel } from '@/types/post';
import {
  NextStep,
  UserForgotPasswordFormModel,
  UserLoginFormModel,
  UserModel,
  UserRegisterFormModel,
  UserResetPasswordFormModel,
} from '@/types/user.type';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/pagination-item';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

export const loginUserAPI = async (
  payload: UserLoginFormModel,
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'loginUser',
    body: payload,
  });
};

export const loginGoogleUserAPI = async (payload: {
  token: string;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'loginGoogleUser',
    body: payload,
  });
};

export const registerGoogleUserAPI = async (payload: {
  token: string;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'registerGoogleUser',
    body: payload,
  });
};

export const passwordResetUserAPI = async (
  payload: UserForgotPasswordFormModel,
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'passwordResetUser',
    body: payload,
  });
};

export const registerUserAPI = async (
  payload: UserRegisterFormModel,
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'registerUser',
    body: payload,
  });
};

export const resetPasswordAPI = async (
  payload: UserResetPasswordFormModel,
): Promise<{ data: UserModel }> => {
  const { newPassword, passwordConfirm, token } = payload;
  return await makeApiCall({
    action: 'resetPassword',
    urlParams: { token },
    body: { password: newPassword, passwordConfirm },
  });
};

export const resendCodeAPI = async (payload: {
  userId: string;
}): Promise<{ data: UserModel }> => {
  const { userId } = payload;
  return await makeApiCall({
    action: 'resendCode',
    urlParams: { userId },
  });
};

export const UpdateEnableProfileAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['user'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: {
      profileId: string;
      enableCommission?: boolean;
      enableShop?: boolean;
      enableGallery?: boolean;
    }): Promise<{ data: UserModel }> => {
      const { enableCommission, enableShop, enableGallery, profileId } =
        payload;
      return await makeApiCall({
        action: 'updateEnableProfile',
        urlParams: { profileId },
        queryParams: { enableCommission, enableShop, enableGallery },
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

export const ValidCodeAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryKey = ['user'];
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationKey: queryKey,
    mutationFn: async (payload: {
      code: string;
      nextStep: NextStep;
    }): Promise<{ data: UserModel }> => {
      return await makeApiCall({
        action: 'validCode',
        body: payload,
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

export const GetOneUserPrivateAPI = (payload: { userId: string }) => {
  const { userId } = payload;
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneUserPrivate',
        urlParams: { userId },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    enabled: Boolean(userId),
  });

  return {
    data: data?.data as any,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetOneUserPublicAPI = (payload: {
  userId?: string;
  userVisitorId?: string;
  username?: string;
}) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user', { ...payload }],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneUserPublic',
        queryParams: payload,
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as UserModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const GetOneUserMeAPI = () => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: async () =>
      await makeApiCall({
        action: 'getOneUserMe',
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as UserModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const getUsersAPI = async (
  payload: PaginationRequest,
): Promise<{ data: ResponsePostModel }> => {
  return await makeApiCall({
    action: 'getUsers',
    queryParams: payload,
  });
};

export const logoutUsersAPI = async (): Promise<any> => {
  try {
    return await makeApiCall({
      action: 'logoutUsers',
    });
  } catch (error) {}
};

export const GetInfiniteUsersAPI = (payload: {
  search: string;
  take: number;
  sort: SortModel;
}) => {
  return useInfiniteQuery({
    queryKey: ['users', 'infinite', { ...payload }],
    queryFn: async ({ pageParam = 1 }) =>
      await getUsersAPI({
        ...payload,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: any) => lastPage.data.next_page ?? undefined,
  });
};

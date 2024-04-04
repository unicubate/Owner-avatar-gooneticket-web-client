import {
  IpLocationModal,
  ResponseUserModel,
  UserForgotPasswordFormModel,
  UserLoginFormModel,
  UserLoginPhoneFormModel,
  UserModel,
  UserRegisterFormModel,
  UserResetPasswordFormModel,
  UserVerifyTokenModel,
} from '@/types/user.type';
import { makeApiCall } from '@/utils/end-point';
import { PaginationRequest, SortModel } from '@/utils/paginations';
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

export const loginPhoneUserAPI = async (
  payload: UserLoginPhoneFormModel,
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'loginPhoneUser',
    body: payload,
  });
};

export const sendCodePhoneUserAPI = async (payload: {
  phone: string;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'sendCodePhoneUser',
    urlParams: payload,
  });
};

export const loginCheckEmailOrPhoneUserAPI = async (payload: {
  phone?: string;
  email?: string;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'loginCheckEmailOrPhoneUser',
    body: payload,
  });
};

export const registerCheckEmailOrPhoneUserAPI = async (payload: {
  phone?: string;
  email?: string;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'registerCheckEmailOrPhoneUser',
    body: payload,
  });
};

export const sendCodeEmailUserAPI = async (payload: {
  email: string;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'sendCodeEmailUser',
    urlParams: payload,
  });
};

export const IpLocationAPI = () => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['ip-location'],
    queryFn: async () =>
      await makeApiCall({
        action: 'ipLocation',
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as IpLocationModal,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
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

export const validCodeAPI = async (payload: {
  code: string;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'validCode',
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
  const { password, passwordConfirm, token } = payload;
  return await makeApiCall({
    action: 'resetPassword',
    urlParams: { token },
    body: { password: password, passwordConfirm },
  });
};

export const resendCodeAPI = async (): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'resendCode',
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
): Promise<{ data: ResponseUserModel }> => {
  return await makeApiCall({
    action: 'getUsers',
    queryParams: payload,
  });
};

export const VerifyTokenUsersAPI = ({ token }: { token: string }) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user-verify', token],
    queryFn: async () =>
      await makeApiCall({
        action: 'verifyTokenUser',
        queryParams: { token },
      }),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return {
    data: data?.data as UserVerifyTokenModel,
    isError,
    isLoading,
    status,
    isPending,
    refetch,
  };
};

export const deleteOneUserAPI = async (options: { userId: string }) => {
  const { userId } = options;
  return await makeApiCall({
    action: 'deleteOneUser',
    urlParams: { userId },
  });
};

export const logoutUsersAPI = async (): Promise<any> => {
  await makeApiCall({
    action: 'logoutUsers',
  });
};

export const updateUpdatePasswordAPI = async (body: {
  password: string;
  passwordConfirm: string;
}): Promise<any> => {
  await makeApiCall({
    action: 'updateUpdatePassword',
    body: body,
  });
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

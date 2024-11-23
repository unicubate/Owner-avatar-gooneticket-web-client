import { makeApiCall } from '@/api-site/clients';
import { useMutationHandlers } from '@/components/hooks';
import {
  IpLocationModal,
  UserForgotPasswordFormModel,
  UserLoginFormModel,
  UserLoginPhoneFormModel,
  UserModel,
  UserRegisterFormModel,
  UserResetPasswordFormModel,
  UserStatus,
  UserVerifyTokenModel,
} from '@/types/user';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const authGoogleUserAPI = async (payload: {
  token: string;
  status: UserStatus;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: 'authGoogleUser',
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
  const queryKeys = ['user'];
  const { handleError, handleSettled, handleSuccess } = useMutationHandlers({
    queryKeys,
    onSuccess,
    onError,
  });

  const result = useMutation({
    mutationKey: queryKeys,
    mutationFn: async (payload: {
      profileId: string;
      enableShop?: boolean;
      enableGallery?: boolean;
    }): Promise<{ data: UserModel }> => {
      const { enableShop, enableGallery, profileId } = payload;
      return await makeApiCall({
        action: 'updateEnableProfile',
        urlParams: { profileId },
        queryParams: { enableShop, enableGallery },
      });
    },

    onError: handleError,
    onSettled: handleSettled,
    onSuccess: handleSuccess,
  });

  return result;
};

export const GetOneUserPrivateAPI = (payload: { userId: string }) => {
  const { userId } = payload;
  const { data, isError, isLoading, status, isPending, error, refetch } =
    useQuery({
      queryKey: ['user', userId],
      queryFn: async () =>
        await makeApiCall({
          action: 'getOneUserPrivate',
          urlParams: { userId },
        }),
      refetchOnWindowFocus: false,
      enabled: Boolean(userId),
    });

  return {
    error: (error as any)?.response,
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
  organizationVisitorId?: string;
}) => {
  const { data, isError, isLoading, status, isPending, error, refetch } =
    useQuery({
      queryKey: ['user', { ...payload }],
      queryFn: async () =>
        await makeApiCall({
          action: 'getOneUserPublic',
          queryParams: payload,
        }),
      refetchOnWindowFocus: false,
    });

  return {
    error: (error as any)?.response,
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

export const VerifyTokenUsersAPI = ({ token }: { token: string }) => {
  const { data, isError, isLoading, status, isPending, refetch } = useQuery({
    queryKey: ['user-verify', token],
    queryFn: async () =>
      await makeApiCall({
        action: 'verifyTokenUser',
        queryParams: { token },
      }),
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

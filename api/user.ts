import {
  UserLoginFormModel,
  UserRegisterFormModel,
  UserForgotPasswordFormModel,
  UserResetPasswordFormModel,
  UserModel,
  NextStep,
} from "@/types/user.type";
import { makeApiCall } from "@/utils/get-url-end-point";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const loginUserAPI = async (
  payload: UserLoginFormModel
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: "loginUser",
    body: payload,
  });
};

export const passwordResetUserAPI = async (
  payload: UserForgotPasswordFormModel
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: "passwordResetUser",
    body: payload,
  });
};

export const registerUserAPI = async (
  payload: UserRegisterFormModel
): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: "registerUser",
    body: payload,
  });
};

export const resetPasswordAPI = async (
  payload: UserResetPasswordFormModel
): Promise<{ data: UserModel }> => {
  const { newPassword, passwordConfirm, token } = payload;
  return await makeApiCall({
    action: "resetPassword",
    urlParams: { token },
    body: { password: newPassword, passwordConfirm },
  });
};

export const resendCodeAPI = async (payload: {
  userId: string;
}): Promise<{ data: UserModel }> => {
  const { userId } = payload;
  return await makeApiCall({
    action: "resendCode",
    urlParams: { userId },
  });
};

export const ValidCodeAPI = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();
  const result = useMutation(
    async (payload: {
      code: string;
      nextStep: NextStep;
    }): Promise<{ data: UserModel }> => {
      return await makeApiCall({
        action: "validCode",
        body: payload,
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

export const getOneUserPrivateAPI = async (payload: {
  userId: string;
}): Promise<{ data: UserModel }> => {
  const { userId } = payload;
  return await makeApiCall({
    action: "getOneUserPrivate",
    urlParams: { userId },
  });
};

export const getOneUserPublicAPI = async (payload: {
  userId?: string;
  username?: string;
}): Promise<{ data: UserModel }> => {
  const { userId, username } = payload;
  return await makeApiCall({
    action: "getOneUserPublic",
    queryParams: { userId, username },
  });
};

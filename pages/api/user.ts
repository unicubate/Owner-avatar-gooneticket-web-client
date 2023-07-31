import {
  UserLoginFormModel,
  UserRegisterFormModel,
  UserForgotPasswordFormModel,
  UserResetPasswordFormModel,
  UserModel,
  NextStep,
} from "@/types/user.type";
import { makeApiCall } from "@/utils/get-url-end-point";

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

export const validCodeAPI = async (payload: {
  code: string;
  nextStep: NextStep;
}): Promise<{ data: UserModel }> => {
  return await makeApiCall({
    action: "validCode",
    body: payload,
  });
};

export const getOneUserAPI = async (payload: {
  userId: string;
}): Promise<{ data: UserModel }> => {
  const { userId } = payload;
  return await makeApiCall({
    action: "getOneUser",
    urlParams: { userId },
  });
};

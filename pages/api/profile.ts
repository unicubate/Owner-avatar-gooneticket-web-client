import {
  CurrencyModel,
  NextStepProfileFormModel,
  ProfileFormModel,
  ProfileModel,
} from "@/types/profile.type";
import { makeApiCall } from "@/utils/get-url-end-point";
import { PaginationRequest } from "@/utils/pagination-item";

export const updateOneProfileNextStepAPI = async (
  payload: NextStepProfileFormModel
): Promise<{ data: ProfileModel }> => {
  return await makeApiCall({
    action: "updateOneProfileNextStep",
    body: payload,
    urlParams: { userId: payload?.userId },
  });
};

export const updateOneProfileAPI = async (
  payload: ProfileFormModel
): Promise<{ data: ProfileModel }> => {
  return await makeApiCall({
    action: "updateOneProfile",
    body: payload,
  });
};

export const getOneProfileAPI = async (payload: {
  profileId: string;
}): Promise<{ data: ProfileModel }> => {
  const { profileId } = payload;
  return await makeApiCall({
    action: "getOneProfile",
    urlParams: { profileId },
  });
};

export const getAllCurrenciesAPI = async (
  payload: PaginationRequest
): Promise<{ data: CurrencyModel }> => {
  return await makeApiCall({
    action: "getAllCurrencies",
    queryParams: payload,
  });
};

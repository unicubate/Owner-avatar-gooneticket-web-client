import { DateInput, NumberInput, TextAreaInput, TextInput } from "../ui";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { CloseOutlined } from "@ant-design/icons";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { useEffect, useState } from "react";
import { DiscountFormModel } from "@/types/discount";
import { CreateOrUpdateOneDiscountAPI } from "@/api-site/discount";
import { SwitchInput, ButtonInput } from "../ui";
import { useReactHookForm } from "../hooks/use-react-hook-form";

const schema = yup.object({
  percent: yup.number().required(),
  code: yup.string().required(),
  expiredAt: yup.date().min(new Date()).nullable(),
});

const CreateOrUpdateDiscount: React.FC<{
  showModal: boolean;
  setShowModal: any;
  discount?: any;
}> = ({ showModal, setShowModal, discount }) => {
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const watchEnableExpiredAt = watch("enableExpiredAt", false);

  useEffect(() => {
    if (discount) {
      const fields = [
        "code",
        "description",
        "percent",
        "isActive",
        "enableExpiredAt",
        "isExpired",
        "startedAt",
      ];
      fields?.forEach((field: any) => setValue(field, discount[field]));
    }
  }, [discount, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOneDiscountAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<DiscountFormModel> = async (
    payload: DiscountFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation.mutateAsync({
        ...payload,
        discountId: discount?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Discount save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      setShowModal(false);
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
        gravity: "top",
        className: "info",
        position: "center",
      });
    }
  };

  return (
    <>
      {showModal ? (
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white dark:bg-[#121212]">
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setShowModal(false)}
            >
              <span className="text-black dark:text-white opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                <CloseOutlined />
              </span>
            </button>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-2 flex-auto justify-center">
                {hasErrors && (
                  <div className="py-6 bg-white dark:bg-[#121212]">
                    <div className="bg-red-100 rounded-lg">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="ml-3 text-sm font-medium text-red-500">
                           {hasErrors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <NumberInput
                    control={control}
                    label="Percentage discount "
                    type="number"
                    name="percent"
                    placeholder="Percentage"
                    errors={errors}
                    required
                  />
                </div>
                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Name"
                    type="text"
                    name="code"
                    placeholder="Name donation"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <TextAreaInput
                    row={3}
                    control={control}
                    label="Description (optional)"
                    name="description"
                    placeholder="description discount"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
                    <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                      <div className="flex items-center flex-1 min-w-0">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-black dark:text-white">
                            Set Expiry
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            Setting expired date
                          </p>
                        </div>
                      </div>

                      <SwitchInput
                        control={control}
                        name="enableExpiredAt"
                        label=""
                      />
                    </div>
                    {watchEnableExpiredAt ? (
                      <div className="mb-1">
                        <DateInput
                          label="Expired date"
                          control={control}
                          placeholder="12/01/2023"
                          name="expiredAt"
                          errors={errors}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center space-x-2">
                <ButtonInput
                  shape="default"
                  type="submit"
                  size="large"
                  loading={loading}
                  color="indigo"
                >
                  Save
                </ButtonInput>
              </div>
              {/* <div className="flex items-center mt-2 space-x-4">
                <ButtonInput
                status="cancel"
                type="button"
                shape="default"
                size="normal"
                  loading={loading}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </ButtonInput>
                <ButtonInput
                  minW="fit"
                  shape="default"
                  type="submit"
                  size="large"
                  loading={false}
                  color="indigo"
                >
                  Save
                </ButtonInput>
              </div> */}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreateOrUpdateDiscount };

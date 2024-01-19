import { TextInput } from "../ui-setting/ant";
import * as yup from "yup";
import { ButtonInput } from "../ui-setting/ant";
import { useReactHookForm } from "../hooks/use-react-hook-form";

import "react-credit-cards-2/dist/es/styles-compiled.css";

import { CreateOnPaymentPI } from "@/api-site/payment";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { PhoneNumberInput } from "../ui-setting/ant";
import { SubmitHandler } from "react-hook-form";

const schema = yup.object({
  fullName: yup.string().optional(),
  phone: yup.string().required(),
});

const CreatePaymentPhoneFormCardUser: React.FC<{
  showModal: boolean;
  setShowModal: any;
}> = ({ showModal, setShowModal }) => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const { mutateAsync } = CreateOnPaymentPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });


  const onSubmit: SubmitHandler<{ phone: string, fullName: string }> = async (
    payload
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: { ...payload, type: "PHONE" },
        paymentModel: "PAYMENT-CREATE",
      });
      AlertSuccessNotification({
        text: "Phone save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      setHasErrors(false);
      setLoading(false);
      setShowModal(false)
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
          <div className="w-full  max-w-2xl p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white dark:bg-[#121212]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="p-2 text-base font-bold">Add your phone number</h2>
              <div className="p-2 flex-auto justify-center">
                {hasErrors && (
                  <div className="relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                    {hasErrors}
                  </div>
                )}

                <div className="mt-4">
                  <TextInput
                    control={control}
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    errors={errors}
                  />
                </div>

                <div className="mt-4">
                  <PhoneNumberInput
                    control={control}
                    name="phone"
                    placeholder="xxx xxx xxx"
                    errors={errors}
                    required={true}
                  />
                </div>


                <div className="flex items-center mt-4 space-x-4">
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
                    loading={loading}
                    color="indigo"
                  >
                    Save
                  </ButtonInput>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreatePaymentPhoneFormCardUser };

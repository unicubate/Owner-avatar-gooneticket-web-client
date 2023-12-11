import { TextInput } from "../ui";
import * as yup from "yup";
import { ButtonInput } from "../ui";
import { useReactHookForm } from "../hooks/use-react-hook-form";

import "react-credit-cards-2/dist/es/styles-compiled.css";

import { CreateOnPaymentPI } from "@/api-site/payment";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { SubmitHandler } from "react-hook-form";

const schema = yup.object({
  code: yup.string().min(5).max(8).required(),
});

const CreateValidationFormCodePhoneUser: React.FC<{
  showModal: boolean;
  setShowModal: any;
  item: any
}> = ({ showModal, setShowModal, item }) => {
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


  const onSubmit: SubmitHandler<{ code: string }> = async (
    payload
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await mutateAsync({
        data: { ...payload, phone: item?.phone, organizationId: item?.organizationId },
        paymentModel: 'VERIFY-CODE-PHONE',
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


  const resendItem = async (item: any) => {
    try {
      await mutateAsync({
        data: { phone: item?.phone, organizationId: item?.organizationId },
        paymentModel: 'RESEND-VERIFY-CODE-PHONE',
      });

      AlertSuccessNotification({
        text: "Your authentication code has been sent",
        className: "info",
        gravity: "top",
        position: "center",
      });
    } catch (error: any) {
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
              <h2 className="p-2 text-base font-bold text-center">Valid phone</h2>
              <h3 className="mb-2 p-2 font-normal text-center">{item?.phone}</h3>
              <div className="p-2 flex-auto justify-center">
                {hasErrors && (
                  <div className="relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                    {hasErrors}
                  </div>
                )}

                <div className="mb-2">


                  <TextInput
                    control={control}
                    label="Code"
                    type="text"
                    name="code"
                    required
                    placeholder="Code"
                    errors={errors}
                  />
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="resend code"
                      className="block text-sm mb-2 dark:dark:text-white"
                    ></label>
                    <button
                      type="button"
                      title="Resend code validation"
                      onClick={() => {
                        resendItem(item);
                      }}
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                    >
                      Resend code
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-400">
                      {`We just sent you a message via SMS with your authentication code. Enter the code in the form above to verify your identity`}
                    </span>
                  </div>
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
                    Verify
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

export { CreateValidationFormCodePhoneUser };

import { NumberInput, SelectSearchInput, TextInput } from "../ui";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { ButtonInput } from "../ui";
import valid from "card-validator";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { PaymentCardFormModel, arrayTypePayments } from "@/types/payment";
import { CreateOnPaymentPI } from "@/api-site/payment";

const yearNumber = new Date().getFullYear();
const schema = yup.object({
  type: yup.string().required("choose payment type"),
  cardExpMonth: yup.string().when("type", (type, schema) => {
    if (type[0] === "CARD")
      return yup.number().min(1).max(12).required("month is a required field");
    return schema.nullable();
  }),
  cardExpYear: yup.string().when("type", (type, schema) => {
    if (type[0] === "CARD")
      return yup
        .number()
        .min(
          Number(yearNumber),
          `year must be greater than or equal to ${yearNumber}`
        )
        .required("year is a required field");
    return schema.nullable();
  }),
  cardNumber: yup.string().when("type", (type, schema) => {
    if (type[0] === "CARD")
      return yup
        .string()
        .test(
          "Card Test",
          "Invalid Card Number",
          (value) => valid.number(value).isValid
        )
        .required("card number is a required field");
    return schema.nullable();
  }),
  cardCvc: yup.string().when("type", (type, schema) => {
    if (type[0] === "CARD")
      return yup
        .string()
        .min(3, "cvc must be at least 3 characters")
        .max(3)
        .required("cvc is a required field");
    return schema.nullable();
  }),

  phone: yup.string().when("type", (type, schema) => {
    if (type[0] === "PHONE")
      return yup.string().required("phone number is a required field");
    return schema.nullable();
  }),
});

const CreatePaymentFormCardUser: React.FC<{
  showModal: boolean;
  setShowModal: any;
}> = ({ showModal, setShowModal }) => {
  const {
    watch,
    control,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });
  const watchType = watch("type", "");

  const onSubmit: SubmitHandler<PaymentCardFormModel> = async (
    payload: PaymentCardFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await CreateOnPaymentPI({
        data: { ...payload },
        paymentModel: "PAYMENT-CREATE",
      });

      AlertSuccessNotification({
        text: "Card save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      setHasErrors(false);
      setLoading(false);
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
          <div className="w-full  max-w-2xl p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="p-2 text-base font-bold text-gray-900">
                Add your payment
              </h2>
              <div className="p-2 flex-auto justify-center">
                {hasErrors && (
                  <div className="relative mb-4 block w-full rounded-lg dark:bg-red-500 p-4 text-base leading-5 dark:text-white opacity-100">
                    {hasErrors}
                  </div>
                )}

                <div className="mt-4">
                  <SelectSearchInput
                    firstOptionName="Choose payment method"
                    control={control}
                    errors={errors}
                    placeholder="Select payment type"
                    valueType="text"
                    name="type"
                    dataItem={arrayTypePayments}
                  />
                </div>

                {watchType === "CARD" ? (
                  <>
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
                      <TextInput
                        control={control}
                        type="text"
                        name="cardNumber"
                        placeholder="Card number"
                        errors={errors}
                      />
                    </div>

                    <div className="grid grid-cols-2 mt-4 sm:grid-cols-3 gap-x-6">
                      <div className="mb-2">
                        <NumberInput
                          min={1}
                          max={12}
                          control={control}
                          type="number"
                          name="cardExpMonth"
                          placeholder="MM"
                          errors={errors}
                        />
                      </div>
                      <div className="mb-2">
                        <NumberInput
                          min={yearNumber}
                          control={control}
                          type="number"
                          name="cardExpYear"
                          placeholder="YYYY"
                          errors={errors}
                        />
                      </div>
                      <div className="mb-2">
                        <TextInput
                          min={3}
                          max={3}
                          control={control}
                          type="text"
                          name="cardCvc"
                          placeholder="CVC"
                          errors={errors}
                        />
                      </div>
                    </div>
                  </>
                ) : null}

                {watchType === "PHONE" ? (
                  <>
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
                      <TextInput
                        control={control}
                        type="text"
                        name="phone"
                        placeholder="Phone number"
                        errors={errors}
                      />
                    </div>
                  </>
                ) : null}

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

export { CreatePaymentFormCardUser };

import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/templates/button-input";
import { useState, useEffect } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import { Image } from "antd";
import { arrayMemberships } from "@/components/mock";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { NumberInput, TextAreaInput, TextInput } from "@/components/util/form";
import { InputNumber } from "antd";

const schema = yup.object({
  title: yup
    .string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required(),
  pricePerMonthly: yup.number().required(),
  priceYearly: yup.number().optional(),
  description: yup.string().optional(),
  messageWelcome: yup.string().required(),
});

const MembershipsLevelCreate = () => {
  const [membershipsArrays] = useState(arrayMemberships);
  const [showModal, setShowModal] = useState(false);
  const {
    watch,
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watchTitle = watch("title", "");
  const watchDescription = watch("description", "");
  const watchPricePerMonthly = watch("pricePerMonthly", "");

  const onSubmit: SubmitHandler<any> = (data: any) => {
    const { priceYearly, pricePerMonthly } = data;
    const pricePerYearly =
      priceYearly === 0 ? pricePerMonthly * 10 : priceYearly;
    const payload = { ...data, pricePerYearly };

    console.log("data =======>", data);
    console.log("pricePerMonthly =======>", pricePerYearly);
    console.log("payload =======>", payload);
  };

  return (
    <>
      <LayoutDashboard title={"Memberships"}>
        {showModal ? (
          <CreateOrUpdateDonation
            showModal={showModal}
            setShowModal={setShowModal}
          />
        ) : null}

        <div className="flex flex-col flex-1">
          <main>
            <div className="py-6">
              {/* <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Create level</h1>
                                    <p className="mt-2 text-sm font-medium leading-6 text-gray-500">Creer pluser donation et partager avec vos contact</p>
                                </div>
                            </div> */}

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {/* <HorizontalNavMembership /> */}

                <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                  <>
                    <p className="text-base font-bold text-gray-900">Levels</p>
                  </>

                  <div className="mt-4 sm:mt-0">
                    <ButtonInput
                      onClick={() => setShowModal(true)}
                      shape="default"
                      type="button"
                      size="normal"
                      loading={false}
                      color={"indigo"}
                    >
                      Create level
                    </ButtonInput>
                  </div>
                </div>

                <div className="grid grid-cols-1 mt-8 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
                  <div className="lg:sticky lg:order-2 text-center lg:top-6 lg:col-span-2">
                    <div className="overflow-hidden rounded bg-gray-50">
                      <div className="flex shrink-0 aspect-w-4 aspect-h-3">
                        <Image src="https://shorturl.at/agsW4" alt="Standard" />
                      </div>

                      <div className="flex-1 px-4 sm:p-6">
                        <p className="text-3xl font-bold text-gray-900">
                          {watchTitle}
                        </p>
                        <p className="text-2xl font-semibold tracking-tight text-gray-900">
                          {watchPricePerMonthly} $
                        </p>
                        <p className="pb-1 font-semibold text-gray-900">
                          per month
                        </p>

                        <p className="mt-3 text-gray-600">
                          {" "}
                          {watchDescription}{" "}
                        </p>

                        <ul className="pt-4 space-y-4 text-base font-medium text-left">
                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-600 shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Support me on a monthly basis
                          </li>

                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-600 shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Unlock exclusive posts and messages
                          </li>

                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-600 shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Access to full library
                          </li>

                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-600 shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Free & Discounted Extras
                          </li>

                          <li className="flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-green-600 shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Exclusive Discounts
                          </li>
                        </ul>

                        <div className="mt-2 py-2 space-y-2">
                          <ButtonInput
                            onClick={() => setShowModal(true)}
                            shape="default"
                            type="button"
                            size="large"
                            loading={false}
                            color={"indigo"}
                          >
                            Join
                          </ButtonInput>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-3 xl:col-span-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flow-root">
                        <div className="overflow-hidden bg-white border border-gray-200">
                          <div className="px-4 py-5">
                            <div className="mt-6">
                              <TextInput
                                control={control}
                                label="Title"
                                type="text"
                                name="title"
                                required
                                placeholder="Title levels"
                                errors={errors}
                              />
                            </div>

                            <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-y-5 gap-x-6">
                              <div>
                                <div className="mt-2">
                                  <NumberInput
                                    control={control}
                                    label="Price per monthly"
                                    type="number"
                                    name="pricePerMonthly"
                                    placeholder="Price per monthly"
                                    errors={errors}
                                    required
                                    prefix={"€"}
                                  />
                                </div>
                              </div>

                              <div>
                                <div className="mt-2">
                                  <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor={"pricePerYearly"}
                                  >
                                    Price per yearly
                                  </label>
                                  <input
                                    defaultValue={
                                      watchPricePerMonthly * 10 || 0
                                    }
                                    {...register("priceYearly")}
                                    type="number"
                                    id="priceYearly"
                                    placeholder=""
                                    required
                                    className="block 
                                                                    w-full 
                                                                    px-2 py-2 
                                                                    text-sm 
                                                                    font-normal 
                                                                    text-gray-600 
                                                                    placeholder-gray-500 
                                                                    bg-white 
                                                                    border 
                                                                    rounded-md 
                                                                    caret-gray-200 "
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <div className="mt-2">
                                  <TextAreaInput
                                    row={4}
                                    control={control}
                                    label="Description"
                                    name="description"
                                    placeholder="Description levels"
                                    errors={errors}
                                  />
                                  <span className="text-sm font-medium text-gray-600">
                                    {`This will help your audience decide whether to join your membership. Describe in your own words what you're offering them`}
                                  </span>
                                </div>
                              </div>

                              <div className="sm:col-span-2">
                                <div className="mt-2">
                                  <TextAreaInput
                                    row={4}
                                    control={control}
                                    label="Welcome message"
                                    name="messageWelcome"
                                    placeholder="Welcome message"
                                    errors={errors}
                                    defaultValue={
                                      "Thank you for the support! 🎉 "
                                    }
                                  />
                                  <span className="text-sm font-medium text-gray-600">
                                    {`This will be visible after the payment and in the welcome email. Make it personal, and include any links to rewards you'd like to share with them`}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4">
                              <ButtonInput
                                shape="default"
                                type="submit"
                                size="normal"
                                loading={false}
                                color={"indigo"}
                              >
                                Create level
                              </ButtonInput>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MembershipsLevelCreate);

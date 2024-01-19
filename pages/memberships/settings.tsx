import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { useAuth } from "@/components/util/context-user";
import { useState } from "react";
import { ButtonInput } from "@/components/ui-setting/ant/button-input";
import { TextAreaInput } from "@/components/ui-setting/ant";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Radio } from "antd";
import { SwitchInput } from "@/components/ui-setting/ant/switch-input";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { GetStaticPropsContext } from "next";

const schema = yup.object({
  email: yup
    .string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .optional(),
  password: yup.string().optional(),
  description: yup.string().optional(),
});

const SettingDonations = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const user = useAuth() as any;
  // const {
  //     control,
  //     setValue,
  //     handleSubmit,
  //     formState: { errors },
  //   } = useForm<any>({
  //     resolver: yupResolver(schema),
  //     mode: "onChange",
  //   });

  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log("payload =======>", payload);
  };

  // useEffect(() => {
  //     if (user) {
  //       const fields = ["username"];
  //       fields?.forEach((field: any) => setValue(field, user[field]));
  //     }
  //   }, [user, setValue]);

  return (
    <>
      <LayoutDashboard title={"Memberships setting"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="py-6">
              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Donations</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Creer pluser donation et partager avec vos contact
                  </p>
                </div>
              </div>

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <HorizontalNavMembership />

                <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-10">
                  <div className="flow-root">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="overflow-hidden bg-white border border-gray-200">
                        <div className="px-4 py-5 sm:p-6">
                          <div className="sm:flex sm:items-center sm:justify-between">
                            <div>
                              <p className="text-base font-bold text-gray-900">
                                Price per pot
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-500">
                                Change the default price of a pot to an amount
                                of your choice.
                              </p>
                            </div>

                            {/* <div className="mt-4 sm:mt-0">
                                                            <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="normal" loading={false} color={user?.profile?.color}>
                                                                Create donation
                                                            </ButtonInput>
                                                        </div> */}
                          </div>

                          <div className="flow-root mt-8">
                            <div className="-my-5 divide-y divide-gray-100">
                              <div className="py-5">
                                <Radio.Group
                                  defaultValue="2"
                                  buttonStyle="solid"
                                  size="large"
                                  className="select-category"
                                >
                                  <Radio.Button value="1">
                                    1000 Fcfa
                                  </Radio.Button>
                                  <Radio.Button value="2">
                                    2000 Fcfa
                                  </Radio.Button>
                                  <Radio.Button value="3">
                                    3000 Fcfa
                                  </Radio.Button>
                                  <Radio.Button value="4">
                                    4000 Fcfa
                                  </Radio.Button>
                                  <Radio.Button value="5">
                                    5000 Fcfa
                                  </Radio.Button>
                                </Radio.Group>
                              </div>
                            </div>
                          </div>
                          <hr className="mt-6 border-gray-200" />
                        </div>

                        <div className="px-4 sm:p-6">
                          <div className="py-5">
                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900 truncate">
                                    Accept annual memberships
                                  </p>
                                  <p className="mt-1 text-sm font-medium text-gray-500 truncate">
                                    New members can choose to pay for 12 months
                                    upfront.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                <button
                                  type="button"
                                  title=""
                                  className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                                >
                                  {" "}
                                </button>

                                <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                                  <SwitchInput
                                    control={control}
                                    name="facebookNotif"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="py-5">
                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900">
                                    Display member count
                                  </p>
                                  <p className="mt-1 text-sm font-medium text-gray-500">
                                    Showing your member count might encourage
                                    more people to join.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                <button
                                  type="button"
                                  title=""
                                  className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                                >
                                  {" "}
                                </button>

                                <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                                  <SwitchInput
                                    control={control}
                                    name="facebookNotif"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="py-5">
                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900">
                                    Display member count
                                  </p>
                                  <p className="mt-1 text-sm font-medium text-gray-500">
                                    Showing your member count might encourage
                                    more people to join.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                <button
                                  type="button"
                                  title=""
                                  className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                                >
                                  {" "}
                                </button>

                                <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                                  <SwitchInput
                                    control={control}
                                    name="confirmSwitch"
                                    label=""
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="py-5">
                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                              <div className="flex items-center flex-1 min-w-0">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-bold text-gray-900">
                                    Display monthly earnings
                                  </p>
                                  <p className="mt-1 text-sm font-medium text-gray-500">
                                    Displaying earnings allows you to be
                                    transparent with your supporters.
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                <button
                                  type="button"
                                  title=""
                                  className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                                >
                                  {" "}
                                </button>

                                <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                                  <SwitchInput
                                    control={control}
                                    name="telegramNotif"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr className="mt-6 border-gray-200" />
                        </div>

                        <div className="px-4 sm:p-6">
                          <div className="sm:flex sm:items-center sm:justify-between">
                            <div>
                              <p className="text-base font-bold text-gray-900">
                                Thank you message
                              </p>
                              <p className="mt-1 text-sm font-medium text-gray-500">
                                This will be visible after the payment and in
                                the receipt email. Write a personable thank you
                                message, and include any rewards if you like.
                              </p>
                            </div>
                          </div>

                          <div className="flow-root mt-8">
                            <div className="-my-5 divide-y divide-gray-100">
                              <div className="py-5">
                                <TextAreaInput
                                  row={4}
                                  control={control}
                                  label="Description"
                                  name="description"
                                  placeholder="Description donation"
                                  errors={errors}
                                  defaultValue={
                                    "Thank you for the support! 🎉 "
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-5 sm:p-6">
                          <ButtonInput
                            shape="default"
                            type="submit"
                            size="normal"
                            loading={false}
                            color={"indigo"}
                          >
                            Save changes
                          </ButtonInput>
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

export default PrivateComponent(SettingDonations);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      }
    }
  }
}
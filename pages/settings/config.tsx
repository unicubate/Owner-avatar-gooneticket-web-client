import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavSetting } from '@/components/setting/horizontal-nav-setting';
import { SwitchInput } from '@/components/ui-setting/ant/switch-input';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { yupResolver } from '@hookform/resolvers/yup';
import { Image } from 'antd';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  confirmSwitch: yup.boolean().optional(),
  facebookNotif: yup.boolean().optional(),
  telegramNotif: yup.boolean().optional(),
});

const Configs = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
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

    console.log('payload =======>', payload);
  };

  // useEffect(() => {
  //     if (user) {
  //       const fields = ["username"];
  //       fields?.forEach((field: any) => setValue(field, user[field]));
  //     }
  //   }, [user, setValue]);

  return (
    <>
      <LayoutDashboard title={'Gifts'}>
        <div className="flex flex-1 flex-col">
          <main>
            <div className="mx-auto max-w-6xl py-6">
              <div className="mx-auto px-4 sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Settings</h1>
                </div>
              </div>

              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <HorizontalNavSetting />

                <div className="mt-8 rounded-lg border border-indigo-300 bg-indigo-50">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="md:flex md:items-center md:justify-between">
                      <Image
                        className="size-16 shrink-0 rounded-lg object-cover"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/avatar-female.png"
                        alt=""
                      />
                      <div className="mt-4 max-w-xs flex-1 md:ml-6 md:mt-0">
                        <p className="text-base font-bold text-gray-900">
                          Learn how to connect new apps with Rareblocks API
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Lorem ipsum dolor sit amet, consec tetur.
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-start space-x-6 md:ml-auto md:mt-0 md:justify-end md:space-x-reverse">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 md:order-last"
                        >
                          View Tutorial
                        </button>

                        <button
                          type="button"
                          className="text-sm font-medium text-gray-500 transition-all duration-200 hover:text-gray-900 md:order-first"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-base font-bold text-gray-900">Connect Apps</p>
                                        <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                    </div>

                                    <div className="mt-4 sm:mt-0">
                                        <label className="sr-only"> Search App </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                                </svg>
                                            </div>

                                            <input type="search" name="" id="" className="border block w-full py-2 pl-10 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search App" />
                                        </div>
                                    </div>
                                </div> */}

                <div className="mt-8 flow-root">
                  <div className="overflow-hidden border border-gray-200 bg-white">
                    <div className="px-4 py-5">
                      <div className="-my-5 divide-y divide-gray-200">
                        <div className="py-5">
                          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                            <div className="flex min-w-0 flex-1 items-center">
                              {/* <Image className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/mailchimp-logo.png" alt="" /> */}
                              <div className="ml-4 min-w-0 flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  Mailchimp
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-500">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipis.
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                              <button
                                type="button"
                                title=""
                                className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                              >
                                {' '}
                              </button>

                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none">
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
                            <div className="flex min-w-0 flex-1 items-center">
                              {/* <Image className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/zapier-logo.png" alt="" /> */}
                              <div className="ml-4 min-w-0 flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  Zapier
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-500">
                                  Lorem ipsum dolor sit amet, consectes.
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                              <button
                                type="button"
                                title=""
                                className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                              >
                                {' '}
                              </button>

                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none">
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
                            <div className="flex min-w-0 flex-1 items-center">
                              {/* <Image className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/telegram-logo.png" alt="" /> */}
                              <div className="ml-4 min-w-0 flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  Telegram
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-500">
                                  Lorem ipsum dolor sit amet.
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                              <button
                                type="button"
                                title=""
                                className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                              >
                                {' '}
                              </button>

                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none">
                                <SwitchInput
                                  control={control}
                                  name="telegramNotif"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="py-5">
                          <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                            <div className="flex min-w-0 flex-1 items-center">
                              {/* <Image className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/slack-logo.png" alt="" /> */}
                              <div className="ml-4 min-w-0 flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  Slack
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-500">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipis.
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                              <button
                                type="button"
                                title=""
                                className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                              >
                                {' '}
                              </button>

                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none">
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
                            <div className="flex min-w-0 flex-1 items-center">
                              {/* <Image className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/dropbox-logo.png" alt="" /> */}
                              <div className="ml-4 min-w-0 flex-1">
                                <p className="text-sm font-bold text-gray-900">
                                  Dropbox
                                </p>
                                <p className="mt-1 text-sm font-medium text-gray-500">
                                  Lorem ipsum dolor sit amet adipis.
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between pl-14 sm:mt-0 sm:justify-end sm:space-x-6 sm:pl-0">
                              <button
                                type="button"
                                title=""
                                className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                              >
                                {' '}
                              </button>

                              <div className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-gray-200 bg-white transition-all duration-200 ease-in-out focus:outline-none">
                                <SwitchInput
                                  control={control}
                                  name="confirmSwitch"
                                  label=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default PrivateComponent(Configs);

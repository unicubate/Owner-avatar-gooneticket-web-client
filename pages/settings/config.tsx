import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { Button } from "antd";
import { useAuth } from "@/components/util/session/context-user";
import { getOneProfileAPI } from "../api/profile";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { UpdateFormProfile } from "@/components/user/update-form-profile";



const Configs = () => {
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
            <LayoutDashboard title={"Gifts"}>



                <div className="flex-1">
                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Settings</h1>
                                </div>
                            </div>

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                                <HorizontalNavSetting />


                                <div className="mt-8 border border-indigo-300 rounded-lg bg-indigo-50">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="md:flex md:items-center md:justify-between">
                                            <img className="flex-shrink-0 object-cover w-16 h-16 rounded-lg" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/avatar-female.png" alt="" />
                                            <div className="flex-1 max-w-xs mt-4 md:mt-0 md:ml-6">
                                                <p className="text-base font-bold text-gray-900">Learn how to connect new apps with Rareblocks API</p>
                                                <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consec tetur.</p>
                                            </div>

                                            <div className="flex items-center justify-start mt-6 space-x-6 md:ml-auto md:justify-end md:mt-0 md:space-x-reverse">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500 md:order-last"
                                                >
                                                    View Tutorial
                                                </button>

                                                <button type="button" className="text-sm font-medium text-gray-500 transition-all duration-200 hover:text-gray-900 md:order-first">Dismiss</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 sm:flex sm:items-center sm:justify-between">
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
                                </div>

                                <div className="flow-root mt-8">
                                    <div className="-my-5 divide-y divide-gray-200">
                                        <div className="py-5">
                                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/mailchimp-logo.png" alt="" />
                                                    <div className="flex-1 min-w-0 ml-4">
                                                        <p className="text-sm font-bold text-gray-900 truncate">Mailchimp</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                                    <button
                                                        type="button"
                                                        className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"

                                                    >
                                                        <span className="sr-only">Enable</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"

                                                        ></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/zapier-logo.png" alt="" />
                                                    <div className="flex-1 min-w-0 ml-4">
                                                        <p className="text-sm font-bold text-gray-900 truncate">Zapier</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet, consectes.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                                    <button
                                                        type="button"
                                                        className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"

                                                    >
                                                        <span className="sr-only">Enable</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"

                                                        ></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/telegram-logo.png" alt="" />
                                                    <div className="flex-1 min-w-0 ml-4">
                                                        <p className="text-sm font-bold text-gray-900 truncate">Telegram</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                                    <button
                                                        type="button"
                                                        className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"

                                                    >
                                                        <span className="sr-only">Enable</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"

                                                        ></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/slack-logo.png" alt="" />
                                                    <div className="flex-1 min-w-0 ml-4">
                                                        <p className="text-sm font-bold text-gray-900 truncate">Slack</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                                    <button
                                                        type="button"
                                                        className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"

                                                    >
                                                        <span className="sr-only">Enable</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"

                                                        ></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-5">
                                            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                                                <div className="flex items-center flex-1 min-w-0">
                                                    <img className="flex-shrink-0 object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/3/dropbox-logo.png" alt="" />
                                                    <div className="flex-1 min-w-0 ml-4">
                                                        <p className="text-sm font-bold text-gray-900 truncate">Dropbox</p>
                                                        <p className="mt-1 text-sm font-medium text-gray-500 truncate">Lorem ipsum dolor sit amet adipis.</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                                                    <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Learn More </a>

                                                    <button
                                                        type="button"
                                                        className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none"

                                                    >
                                                        <span className="sr-only">Enable</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className="inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform translate-x-0 bg-gray-400 rounded-full pointer-events-none ring-0"

                                                        ></span>
                                                    </button>
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

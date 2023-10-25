import { PrivateComponent } from "@/components/util/private-component";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { useAuth } from "@/components/util/context-user";
import { useState } from "react";
import { ButtonInput } from "@/components/ui/button-input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { arrayComments } from "@/components/mock";

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

const Payments = () => {
    const [comments] = useState(arrayComments)
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
            <LayoutDashboard title={"Gifts"}>


                <div className="flex flex-col flex-1">
                    <main>
                        <div className="max-w-6xl mx-auto py-6">
                            <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Accept Payments</h1>
                                </div>
                            </div>

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">


                                <HorizontalNavSetting />



                                {/* <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-10">
                                    <div className="flow-root">
                                        <div className="divide-y divide-gray-200 -my-7">


                                           
                                            {user?.id ? <UpdateFormUser userId={user?.id} /> : null}

                                            {user?.profileId ? <UpdateFormProfile profileId={user?.profileId} user={user} /> : null}

                                            {user?.profileId ? <UpdateFormPassword userId={user?.id} user={user} /> : null}
                                            

                                        </div>
                                    </div>
                                </div> */}







                           







                                <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-xl">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-base font-bold text-gray-900">Payment Methods</p>
                                                <p className="mt-1 text-sm font-medium text-gray-500">Accept card payments, paypal, mobile money and more!</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold leading-4 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                                >
                                                    Join Another Team
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flow-root mt-8">
                                            <div className="-my-5 divide-y divide-gray-100">
                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/rareblocks-logo.png" alt="" />
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Rareblocks</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">3 members</p>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Leave </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/astrona-logo.png" alt="" />
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Astrona</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">12 members</p>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Leave </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-xl">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-base font-bold text-gray-900">Donation Settings</p>
                                                <p className="mt-1 text-sm font-medium text-gray-500">Customize the donation panel on your page.</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0">
                                                <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="normal" loading={false} color={user?.profile?.color}>
                                                    Create donation
                                                </ButtonInput>
                                            </div>
                                        </div>

                                        <div className="flow-root mt-8">
                                            <div className="-my-5 divide-y divide-gray-100">
                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/rareblocks-logo.png" alt="" />
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Rareblocks</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">3 members</p>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Leave </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/astrona-logo.png" alt="" />
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Astrona</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">12 members</p>
                                                        </div>

                                                        <div className="ml-auto">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Leave </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-xl">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="sm:flex sm:items-center sm:justify-between">
                                            <div>
                                                <p className="text-base font-bold text-gray-900">Team Members</p>
                                                <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
                                            </div>

                                            <div className="mt-4 sm:mt-0">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold leading-4 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                                >
                                                    Add New Member
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flow-root mt-8">
                                            <div className="-my-5 divide-y divide-gray-100">
                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-female.png" alt="" />
                                                            <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Arlene McCoy</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">@arlenemc</p>
                                                        </div>

                                                        <div className="flex items-center justify-end ml-auto space-x-8">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                            <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-female-2.png" alt="" />
                                                            <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-gray-300 border-2 border-white rounded-full"></div>
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Darrell Steward</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">@darrellsteward</p>
                                                        </div>

                                                        <div className="flex items-center justify-end ml-auto space-x-8">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                            <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-female-3.png" alt="" />
                                                            <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Marvin McKinney</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">@marvinmc</p>
                                                        </div>

                                                        <div className="flex items-center justify-end ml-auto space-x-8">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                            <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-male.png" alt="" />
                                                            <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Floyd Miles</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">@floydmiles</p>
                                                        </div>

                                                        <div className="flex items-center justify-end ml-auto space-x-8">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                            <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="py-5">
                                                    <div className="flex items-center">
                                                        <div className="relative flex-shrink-0">
                                                            <img className="object-cover w-10 h-10 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/settings/1/avatar-male-2.png" alt="" />
                                                            <div className="absolute -top-px -right-px w-3.5 h-3.5 bg-gray-300 border-2 border-white rounded-full"></div>
                                                        </div>

                                                        <div className="ml-4">
                                                            <p className="text-sm font-bold text-gray-900">Albert Flores</p>
                                                            <p className="mt-1 text-sm font-medium text-gray-500">@albertfl</p>
                                                        </div>

                                                        <div className="flex items-center justify-end ml-auto space-x-8">
                                                            <a href="#" title="" className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Remove </a>

                                                            <a href="#" title="" className="text-sm font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700"> Edit </a>
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

export default PrivateComponent(Payments);

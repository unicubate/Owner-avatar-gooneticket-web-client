import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizonta-nav-setting";



const Profile = () => {
  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log("payload =======>", payload);
  };

  return (
    <>
      <LayoutDashboard title={"Profile"}>

      <div className="flex-1">
            <main>
                <div className="py-6">
                    <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                        <div className="max-w-md">
                            <h1 className="text-lg font-bold text-gray-900">Profile</h1>
                            <p className="mt-2 text-sm font-medium leading-6 text-gray-500">Modifier votre profile</p>
                        </div>
                    </div>

                    <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                        <HorizontalNavSetting />

                        <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-xl">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-base font-bold text-gray-900">Teams you are on</p>
                                        <p className="mt-1 text-sm font-medium text-gray-500">Lorem ipsum dolor sit amet, consectetur adipis.</p>
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
                        HorizontalNavSetting</div>

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

export default PrivateComponent(Profile);

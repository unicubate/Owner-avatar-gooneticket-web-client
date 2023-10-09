import { Image } from "antd";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import { BiComment } from "react-icons/bi";
import { GetOneUserPublicAPI } from "@/api-site/user";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { useAuth } from "@/components/util/context-user";

const ProfilePublic = () => {
  const { query } = useRouter();
  const username = String(query?.username);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username });

  return (
    <>

      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">

        <div className="grid grid-cols-1 mt-2 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
          <div className="border-gray-200 lg:col-span-3 xl:col-span-4">
            <div className="flow-root">
              <div className="mt-4 mx-auto sm:px-6 md:px-8">

                <div className="flow-root">
                  <div className="overflow-hidden bg-white shadow-2xl">
                    <div className="px-4 py-4 sm:p-6 lg:p-8">

                      <div className="space-y-6 text-center">
                        <label className="text-base font-medium text-gray-900"> Buy a Coffee for Marc makes comics </label>
                        <div className="flex items-center justify-center mt-5 space-x-5">
                          <button type="button" className="p-1 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                            </svg>
                          </button>

                          <span className="px-6 py-1 text-base font-semibold text-gray-900 bg-white border border-gray-200 rounded-md"> 1 </span>

                          <button type="button" className="p-1 transition-all duration-200 bg-white border border-gray-200 rounded-full hover:bg-gray-50">
                            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>

                        <div className="relative mt-3">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <img className="w-auto h-5" src="https://landingfoliocom.imgix.net/store/collection/niftyui/images/mint/3/ethereum-logo.svg" alt="" />
                          </div>

                          <div className="block w-full py-2 pl-10 pr-4 text-base font-bold text-center text-gray-900 bg-white border border-gray-200 rounded-md">0.72</div>
                        </div>

                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-full px-6 py-4 text-xs font-bold tracking-widest text-white uppercase transition-all duration-200 bg-indigo-600 border border-transparent rounded-lg shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700"
                        >
                          Mint
                        </button>
                      </div>


                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>


          <div className="lg:sticky lg:order-2 lg:top-6 lg:col-span-2">

          </div>
        </div>

      </div>
    </>
  );
};

export default ProfilePublic;

import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { AudioMutedOutlined } from "@ant-design/icons";
import { BiDetail } from "react-icons/bi";
import { LuFileAudio2 } from "react-icons/lu";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";

const Posts = () => {
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
      <LayoutDashboard title={"Posts"}>
        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Articles</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Post public post or make exclusive to you supporters or
                    members
                  </p>
                </div>
              </div>

              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <HorizontalNavCreatePost />
                {/* <div className="grid grid-cols-1 gap-5 mt-8 sm:mt-12 sm:grid-cols-2 xl:grid-cols-2 sm:gap-8 xl:gap-12">
                                    <div className="bg-white border border-gray-200 rounded-xl">
                                        <div className="p-6 lg:px-10 lg:py-8">
                                            <div className="flex items-center justify-start space-x-">
                                                <BiDetail className="flex-shrink-0 w-10 h-10 text-gray-600 md:w-12 md:h-12" />
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                                                        <a href="#" title="">
                                                            Write a post
                                                        </a>
                                                    </h3>
                                                    <p className="mt-2 text-sm font-medium text-gray-500">983 Available Posts</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl">
                                        <div className="p-6 lg:px-10 lg:py-8">
                                            <div className="flex items-center justify-start space-x-3">
                                                <LuFileAudio2 className="flex-shrink-0 w-10 h-10 text-gray-600 md:w-12 md:h-12" />
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 sm:text-base lg:text-lg">
                                                        <a href="#" title="">
                                                            Audio post
                                                        </a>
                                                    </h3>
                                                    <p className="mt-2 text-sm font-medium text-gray-500">142 Available Audio Posts</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
              </div>

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
                  <nav className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Publisher{" "}
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Drafter{" "}
                    </a>

                    <a
                      href="#"
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"
                    >
                      {" "}
                      Scheduled{" "}
                    </a>
                  </nav>
                </div>
              </div>

              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {/* <div className="w-full pb-1 overflow-x-auto">
                                    <div className="border-b border-gray-200">
                                        <nav className="flex -mb-px space-x-10">
                                            <a href="#" className="py-4 text-sm font-medium text-indigo-500 transition-all duration-200 border-b-2 border-indigo-600 whitespace-nowrap"> Publisher </a>

                                            <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Drafted </a>

                                            <a href="#" className="py-4 text-sm font-medium text-gray-600 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Scheduled </a>
                                        </nav>
                                    </div>
                                </div> */}

                <div className="grid grid-cols-1 gap-6 px-8 mt-12 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 sm:px-0">
                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-1.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-2.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-3.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-4.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-5.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-6.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-7.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">
                    <a
                      href="#"
                      title=""
                      className="flex shrink-0 aspect-w-4 aspect-h-3"
                    >
                      <img
                        className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110"
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/2/thumbnail-8.png"
                        alt=""
                      />
                    </a>
                    <div className="flex-1 px-4 py-5 sm:p-6">
                      <a href="#" title="" className="">
                        <p className="text-lg font-bold text-gray-900">
                          How to write content about your photographs
                        </p>
                        <p className="mt-3 text-sm font-normal leading-6 text-gray-500 line-clamp-3">
                          Lorem ipsum dolor sit amet, consec tetur adipiscing
                          elit. Sit quis auctor odio arcu et dolor.
                        </p>
                      </a>
                    </div>
                    <div className="px-4 py-5 mt-auto border-t border-gray-100 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" title="" className="">
                              {" "}
                              Growth{" "}
                            </a>
                          </p>
                          <span className="text-sm font-medium text-gray-900">
                            {" "}
                            •{" "}
                          </span>
                          <p className="text-sm font-medium text-gray-900">
                            7 Mins Read
                          </p>
                        </div>

                        <a href="#" title="" className="" role="button">
                          <svg
                            className="w-5 h-5 text-gray-300 transition-all duration-200 group-hover:text-gray-900"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            stroke-width="2"
                            stroke="currentColor"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <line x1="17" y1="7" x2="7" y2="17"></line>
                            <polyline points="8 7 17 7 17 16"></polyline>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-12 bg-white sm:py-16">
                  <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between">
                      <a
                        href="#"
                        title=""
                        className="inline-flex items-center justify-start text-xs font-bold tracking-widest text-gray-500 uppercase transition-all duration-200 hover:text-gray-900"
                      >
                        <svg
                          className="w-4 h-4 mr-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                          />
                        </svg>
                        Load Oldest
                      </a>

                      <a
                        href="#"
                        title=""
                        className="inline-flex items-center justify-end text-xs font-bold tracking-widest text-gray-900 uppercase transition-all duration-200"
                      >
                        Load newest
                        <svg
                          className="w-4 h-4 ml-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
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

export default PrivateComponent(Posts);

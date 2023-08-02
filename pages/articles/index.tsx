import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";



const Articles = () => {
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
      <LayoutDashboard title={"Articles"}>

      <div className="flex-1">
            <main>
                <div className="py-6">
                    <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                        <div className="max-w-md">
                            <h1 className="text-lg font-bold text-gray-900">Articles</h1>
                            <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                                Post public post or make exclusive to you supporters or members
                            </p>
                        </div>
                    </div>


                    <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                        <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
                                <nav className="flex flex-wrap gap-4">
                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"> Write a post </a>

                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"> Audio post </a>

                                    {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"> Team </a>

                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 rounded-lg group whitespace-nowrap bg-transparent hover:text-gray-900 hover:bg-gray-100"> Notification </a>

                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg group whitespace-nowrap bg-gray-100"> Billing Details </a>

                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"> Integrations </a> */}
                                </nav>
                        </div>

                    </div>




                    <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                        <div className="w-full pb-1 overflow-x-auto">
                            <div className="border-b border-gray-200">
                                <nav className="flex -mb-px space-x-10">
                                    <a href="#" className="py-4 text-sm font-medium text-indigo-500 transition-all duration-200 border-b-2 border-indigo-600 whitespace-nowrap"> Publisher </a>

                                    <a href="#" className="py-4 text-sm font-medium text-gray-500 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Drafted </a>

                                    <a href="#" className="py-4 text-sm font-medium text-gray-600 transition-all duration-200 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap"> Scheduled </a>
                                </nav>
                            </div>
                        </div>

                        <div className="mt-8 bg-white border-gray-200 rounded-xl">

                            <div className="grid grid-cols-1 gap-12 mt-12 xl:gap-20 sm:grid-cols-3 lg:grid-cols-4 sm:mt-16">

                                <div className="group">
                                    <a href="#" title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
                                        <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/1/thumbnail-1.png" alt="" />
                                    </a>
                                    <div className="flex items-center mt-6 space-x-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" title="" className=""> Growth </a>
                                        </p>
                                        <span className="text-sm font-medium text-gray-900"> • </span>
                                        <p className="text-sm font-medium text-gray-900">April 09, 2022</p>
                                    </div>
                                    <p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
                                        <a href="#" title="" className=""> How a visual artist redefines success in graphic design </a>
                                    </p>
                                </div>

                                <div className="group">
                                    <a href="#" title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
                                        <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/1/thumbnail-1.png" alt="" />
                                    </a>
                                    <div className="flex items-center mt-6 space-x-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" title="" className=""> Growth </a>
                                        </p>
                                        <span className="text-sm font-medium text-gray-900"> • </span>
                                        <p className="text-sm font-medium text-gray-900">April 09, 2022</p>
                                    </div>
                                    <p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
                                        <a href="#" title="" className=""> How a visual artist redefines success in graphic design </a>
                                    </p>
                                </div>

                                <div className="group">
                                    <a href="#" title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
                                        <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/1/thumbnail-2.png" alt="" />
                                    </a>
                                    <div className="flex items-center mt-6 space-x-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" title="" className=""> Growth </a>
                                        </p>
                                        <span className="text-sm font-medium text-gray-900"> • </span>
                                        <p className="text-sm font-medium text-gray-900">April 09, 2022</p>
                                    </div>
                                    <p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
                                        <a href="#" title="" className=""> Why choose a theme that looks good with WooCommerce </a>
                                    </p>
                                </div>

                                <div className="group">
                                    <a href="#" title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
                                        <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/1/thumbnail-3.png" alt="" />
                                    </a>
                                    <div className="flex items-center mt-6 space-x-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" title="" className=""> Growth </a>
                                        </p>
                                        <span className="text-sm font-medium text-gray-900"> • </span>
                                        <p className="text-sm font-medium text-gray-900">April 09, 2022</p>
                                    </div>
                                    <p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
                                        <a href="#" title="" className=""> How to write content about your photographs </a>
                                    </p>
                                </div>

                                <div className="group">
                                    <a href="#" title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
                                        <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/1/thumbnail-4.png" alt="" />
                                    </a>
                                    <div className="flex items-center mt-6 space-x-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" title="" className=""> Growth </a>
                                        </p>
                                        <span className="text-sm font-medium text-gray-900"> • </span>
                                        <p className="text-sm font-medium text-gray-900">April 09, 2022</p>
                                    </div>
                                    <p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
                                        <a href="#" title="" className=""> Lessons and insights from 8 years of Pixelgrade </a>
                                    </p>
                                </div>

                                <div className="group">
                                    <a href="#" title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
                                        <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/1/thumbnail-5.png" alt="" />
                                    </a>
                                    <div className="flex items-center mt-6 space-x-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" title="" className=""> Growth </a>
                                        </p>
                                        <span className="text-sm font-medium text-gray-900"> • </span>
                                        <p className="text-sm font-medium text-gray-900">April 09, 2022</p>
                                    </div>
                                    <p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
                                        <a href="#" title="" className=""> Travelling as a way of self-discovery and progress </a>
                                    </p>
                                </div>

                                <div className="group">
                                    <a href="#" title="" className="block overflow-hidden aspect-w-16 aspect-h-9 rounded-xl">
                                        <img className="object-cover w-full h-full transition-all duration-200 transform group-hover:scale-110" src="https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/blog-grid/1/thumbnail-6.png" alt="" />
                                    </a>
                                    <div className="flex items-center mt-6 space-x-2">
                                        <p className="text-sm font-medium text-gray-900">
                                            <a href="#" title="" className=""> Growth </a>
                                        </p>
                                        <span className="text-sm font-medium text-gray-900"> • </span>
                                        <p className="text-sm font-medium text-gray-900">April 09, 2022</p>
                                    </div>
                                    <p className="mt-4 text-xl font-bold text-gray-900 group-hover:text-gray-600">
                                        <a href="#" title="" className=""> The unseen of spending three years at Pixelgrade </a>
                                    </p>
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

export default PrivateComponent(Articles);

import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";



const Shops = () => {
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
                            <h1 className="text-lg font-bold text-gray-900">Shops</h1>
                            <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                                Poster les artcles pour et vend a votre comunauter
                            </p>
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
                            <div className="grid grid-cols-1 gap-6 mt-12 text-center sm:grid-cols-2 lg:gap-5 lg:grid-cols-4 sm:mt-16">
                                
                                <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col">
                                    <div className="absolute top-3 right-3">
                                        <p className="inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold tracking-wide text-white uppercase bg-gray-600 rounded">Sale</p>
                                    </div>
                                    <div className="relative group">
                                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                            <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-1.png" alt="" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            <a href="#" title="">
                                                Arion 30 Smart Light
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="mt-2 text-sm font-bold text-gray-500">$79.00</p>
                                    <div className="flex items-center justify-center flex-1 mt-5 space-x-2">
                                        <div className="w-3 h-3 bg-blue-600 border border-blue-800 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 border border-yellow-700 rounded-full"></div>
                                        <div className="w-3 h-3 bg-red-500 border border-red-800 rounded-full"></div>
                                    </div>
                                    <div className="relative mt-auto">
                                        <button type="button" className="relative flex items-center justify-center w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                                            <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>
                                            <span className="relative"> Add to cart </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col">
                                    <div className="relative group">
                                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                            <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-2.png" alt="" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            <a href="#" title="">
                                                Beoplay M5 Bluetooth Speaker
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="mt-2 text-sm font-bold text-gray-500">$49.00</p>
                                    <div className="flex items-center justify-center flex-1 mt-5 space-x-2">
                                        <div className="w-3 h-3 bg-gray-600 border border-gray-900 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 border border-yellow-700 rounded-full"></div>
                                    </div>
                                    <div className="relative mt-auto">
                                        <button type="button" className="relative flex items-center justify-center w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                                            <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>
                                            <span className="relative"> Add to cart </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col">
                                    <div className="absolute top-3 right-3">
                                        <p className="inline-flex items-center justify-center px-2 py-1.5 text-xs font-bold tracking-wide text-white uppercase bg-gray-600 rounded">Sale</p>
                                    </div>
                                    <div className="relative group">
                                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                            <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-3.png" alt="" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            <a href="#" title="">
                                                Beylob 90 Speaker
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="mt-2 text-sm font-bold text-gray-500">$19.00-$29.00</p>
                                    <div className="flex items-center justify-center flex-1 mt-5 space-x-2">
                                        <div className="w-3 h-3 bg-blue-600 border border-blue-800 rounded-full"></div>
                                        <div className="w-3 h-3 bg-red-500 border border-red-800 rounded-full"></div>
                                    </div>
                                    <div className="relative mt-auto">
                                        <button type="button" className="relative flex items-center justify-center w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                                            <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>
                                            <span className="relative"> Add to cart </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col">
                                    <div className="relative group">
                                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                            <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-4.png" alt="" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            <a href="#" title="">
                                                Apple Smart Watch 6 Edition
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="mt-2 text-sm font-bold text-gray-500">$249.00</p>
                                    <div className="flex items-center justify-center flex-1 mt-5 space-x-2">
                                        <div className="w-3 h-3 bg-gray-600 border border-gray-900 rounded-full"></div>
                                        <div className="w-3 h-3 bg-orange-200 border rounded-full border-amber-600"></div>
                                        <div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="relative mt-auto">
                                        <button type="button" className="relative flex items-center justify-center w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                                            <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>
                                            <span className="relative"> Add to cart </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="relative bg-[#F5F5F5] overflow-hidden flex flex-col">
                                    <div className="relative group">
                                        <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                            <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-110" src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/item-cards/8/product-4.png" alt="" />
                                        </div>
                                        <h3 className="text-base font-bold text-gray-900">
                                            <a href="#" title="">
                                                Apple Smart Watch 6 Edition
                                                <span className="absolute inset-0" aria-hidden="true"></span>
                                            </a>
                                        </h3>
                                    </div>
                                    <p className="mt-2 text-sm font-bold text-gray-500">$249.00</p>
                                    <div className="flex items-center justify-center flex-1 mt-5 space-x-2">
                                        <div className="w-3 h-3 bg-gray-600 border border-gray-900 rounded-full"></div>
                                        <div className="w-3 h-3 bg-orange-200 border rounded-full border-amber-600"></div>
                                        <div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div>
                                    </div>
                                    <div className="relative mt-auto">
                                        <button type="button" className="relative flex items-center justify-center w-full px-4 py-4 mt-8 text-sm font-bold text-gray-900 transition-all duration-200 bg-transparent hover:text-white group">
                                            <span className="absolute inset-0 h-full transition-all duration-200 origin-bottom translate-y-full bg-gray-900 group-hover:translate-y-0"></span>
                                            <span className="relative"> Add to cart </span>
                                        </button>
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

export default PrivateComponent(Shops);

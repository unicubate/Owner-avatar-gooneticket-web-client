import { PrivateComponent } from "@/components/util/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";



const Supporters = () => {
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
            <LayoutDashboard title={"Dashboard"}>

                <div className="flex flex-col flex-1 overflow-x-hidden">

                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="md:items-center md:flex">
                                    <p className="text-base font-bold text-gray-900">Hey Mariana -</p>
                                    <p className="mt-1 text-base font-medium text-gray-500 md:mt-0 md:ml-2">heres whats happening with your store today</p>
                                </div>
                            </div>


                            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="max-w-xl mx-auto mt-12 sm:px-10">


                                    <div className="grid grid-cols-1 mt-8 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
                   

                                        <div className="pt-6 border-t border-gray-200 lg:order-1 lg:col-span-10">
                                            <div className="flow-root">
                                                <div className="divide-y divide-gray-200 -my-7">
                                                    <div className="py-7">
                                                        <h2 className="text-base font-bold text-gray-900">Contact Information</h2>

                                                        <div className="mt-6">
                                                            <label className="text-sm font-medium text-gray-600"> Email address </label>
                                                            <div className="mt-2">
                                                                <input type="email" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="py-7">
                                                        <h2 className="text-base font-bold text-gray-900">Shipping Information</h2>

                                                        <div className="grid grid-cols-1 mt-6 sm:grid-cols-2 gap-y-5 gap-x-6">
                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600"> First name </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600"> Last name </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-2">
                                                                <label className="text-sm font-medium text-gray-600"> Phone number </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-2">
                                                                <label className="text-sm font-medium text-gray-600"> Address line 1 </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>

                                                            <div className="sm:col-span-2">
                                                                <label className="text-sm font-medium text-gray-600"> Address line 2 </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600"> Country </label>
                                                                <div className="mt-2">
                                                                    <select id="" name="" className="block w-full py-3 pl-4 pr-10 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900">
                                                                        <option value="">United States</option>
                                                                    </select>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600"> City </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600"> State </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="text-sm font-medium text-gray-600"> Postal code </label>
                                                                <div className="mt-2">
                                                                    <input type="text" id="" name="" placeholder="" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="py-7">
                                                        <h2 className="text-base font-bold text-gray-900">Payment</h2>

                                                        <div className="mt-6 space-y-4">
                                                            <div className="bg-white border-2 border-gray-900 rounded-md">
                                                                <div className="px-4 py-5 sm:p-6">
                                                                    <div className="flex items-center">
                                                                        <div>
                                                                            <span className="hidden">
                                                                                <svg className="w-6 h-6 text-gray-300" viewBox="0 0 22 22" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle cx="11" cy="11" r="10.25" stroke-width="1.5" />
                                                                                </svg>
                                                                            </span>

                                                                            <span>
                                                                                <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle cx="11" cy="11" r="11" fill="#18181B" />
                                                                                    <path d="M6.91699 11.5833L9.25033 13.9166L15.0837 8.08331" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                </svg>
                                                                            </span>
                                                                        </div>

                                                                        <div className="ml-4">
                                                                            <p className="text-base font-bold text-gray-900">Credit Card</p>
                                                                            <p className="mt-1 text-sm font-medium text-gray-500">Visa, Mastercard, American Amex</p>
                                                                        </div>
                                                                    </div>

                                                                    <div className="grid grid-cols-2 mt-5 sm:grid-cols-4 gap-x-6 gap-y-5">
                                                                        <div className="col-span-2 sm:col-span-4">
                                                                            <label className="text-sm font-medium text-gray-600"> Card number </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="text"
                                                                                    name=""
                                                                                    id=""
                                                                                    placeholder="XXXX XXXX XXXX XXXX"
                                                                                    className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div className="col-span-2">
                                                                            <label className="text-sm font-medium text-gray-600"> Name on the card </label>
                                                                            <div className="mt-2">
                                                                                <input
                                                                                    type="text"
                                                                                    name=""
                                                                                    id=""
                                                                                    placeholder="ex: John Doe"
                                                                                    className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900"
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-600"> Expiry date </label>
                                                                            <div className="mt-2">
                                                                                <input type="text" name="" id="" placeholder="MM/YYYY" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                            </div>
                                                                        </div>

                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-600"> CSV </label>
                                                                            <div className="mt-2">
                                                                                <input type="text" name="" id="" placeholder="XXX" className="block w-full px-4 py-3 text-sm font-normal text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md caret-gray-900 focus:ring-gray-900 focus:border-gray-900" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="bg-white border-2 border-gray-200 rounded-md">
                                                                <div className="px-4 py-5 sm:p-6">
                                                                    <div className="flex items-center">
                                                                        <div>
                                                                            <span>
                                                                                <svg className="w-6 h-6 text-gray-300" viewBox="0 0 22 22" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle cx="11" cy="11" r="10.25" stroke-width="1.5" />
                                                                                </svg>
                                                                            </span>

                                                                            <span className="hidden">
                                                                                <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle cx="11" cy="11" r="11" fill="#18181B" />
                                                                                    <path d="M6.91699 11.5833L9.25033 13.9166L15.0837 8.08331" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                </svg>
                                                                            </span>
                                                                        </div>

                                                                        <div className="ml-4">
                                                                            <p className="text-base font-bold text-gray-900">PayPal</p>
                                                                            <p className="mt-1 text-sm font-medium text-gray-500">One click PayPal payment</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="bg-white border-2 border-gray-200 rounded-md">
                                                                <div className="px-4 py-5 sm:p-6">
                                                                    <div className="flex items-center">
                                                                        <div>
                                                                            <span>
                                                                                <svg className="w-6 h-6 text-gray-300" viewBox="0 0 22 22" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle cx="11" cy="11" r="10.25" stroke-width="1.5" />
                                                                                </svg>
                                                                            </span>

                                                                            <span className="hidden">
                                                                                <svg className="w-6 h-6" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle cx="11" cy="11" r="11" fill="#18181B" />
                                                                                    <path d="M6.91699 11.5833L9.25033 13.9166L15.0837 8.08331" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                                                </svg>
                                                                            </span>
                                                                        </div>

                                                                        <div className="ml-4">
                                                                            <p className="text-base font-bold text-gray-900">Cryptocurrency</p>
                                                                            <p className="mt-1 text-sm font-medium text-gray-500">Bitcoin, Ethereum</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
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

export default PrivateComponent(Supporters);

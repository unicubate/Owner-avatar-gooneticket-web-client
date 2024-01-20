import { PrivateComponent } from "@/components/util/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { LayoutDashboard } from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";



const Notifications = () => {
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
                

                <div className="flex flex-1 flex-col">
                    <main>
                        <div className="mx-auto max-w-6xl py-6">
                            <div className="mx-auto px-4 sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
                                </div>
                            </div>

                            <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">

                                    <HorizontalNavSetting />



                                    <div className="border-t border-gray-200 pt-6 lg:order-1 lg:col-span-10">
                                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full lg:divide-y lg:divide-gray-200">
                                                    <thead className="hidden lg:table-header-group">
                                                        <tr>
                                                            <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-widest text-gray-500">Message</th>

                                                            <th className="px-4 py-3.5 text-left text-xs font-medium uppercase tracking-widest text-gray-500">Date</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="divide-y divide-gray-200">



                                                        <tr className="bg-white">
                                                            <td className="whitespace-nowrap p-4 align-top text-sm font-medium text-gray-900 lg:align-middle">
                                                                <div className="flex items-center">
                                                                    Lorem ipsum dolor sit amet, consectetur adipis.
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap p-4 text-right align-top text-sm font-medium text-gray-900 lg:text-left lg:align-middle">12/01/1990</td>

                                                        </tr>
                                                        <tr className="bg-white">
                                                            <td className="whitespace-nowrap p-4 align-top text-sm font-medium text-gray-900 lg:align-middle">
                                                                <div className="flex items-center">
                                                                    Lorem ipsum dolor sit amet, consectetur adipis.
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap p-4 text-right align-top text-sm font-medium text-gray-900 lg:text-left lg:align-middle">12/01/1990</td>

                                                        </tr>
                                                        <tr className="bg-white">
                                                            <td className="whitespace-nowrap p-4 align-top text-sm font-medium text-gray-900 lg:align-middle">
                                                                <div className="flex items-center">
                                                                    Lorem ipsum dolor sit amet, consectetur adipis.
                                                                </div>
                                                            </td>

                                                            <td className="whitespace-nowrap p-4 text-right align-top text-sm font-medium text-gray-900 lg:text-left lg:align-middle">12/01/1990</td>

                                                        </tr>

                                                    </tbody>
                                                </table>
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

export default PrivateComponent(Notifications);

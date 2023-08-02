import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";



const Messages = () => {
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
      <LayoutDashboard title={"Message"}>

      <div className="flex-1">
            <main>
                <div className="py-6">
                    <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                        <div className="max-w-md">
                            <h1 className="text-lg font-bold text-gray-900">Messages</h1>
                            <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                                Recevez vos message de vos utilisateur
                            </p>
                        </div>
                    </div>


                    <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                        <div className="px-3 py-2 bg-white border border-gray-200 rounded-lg">
                                <nav className="flex flex-wrap gap-4">
                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"> Write a message </a>

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




                    </div>
                </div>
            </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Messages);

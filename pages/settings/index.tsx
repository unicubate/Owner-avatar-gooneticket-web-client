import { PrivateComponent } from "@/components/util/session/private-component";
import { SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavSetting } from "@/components/setting/horizontal-nav-setting";
import { useAuth } from "@/components/util/session/context-user";
import { UpdateFormProfile } from "@/components/user/update-form-profile";
import { UpdateFormPassword } from "@/components/user/update-form-password";
import { UpdateFormUser } from "@/components/user/update-form-user";



const Settings = () => {

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

                            <div className="px-4 sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Settings</h1>
                                </div>
                            </div>

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">


                                <HorizontalNavSetting />



                                <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-10">
                                    <div className="flow-root">

                                            {user?.id ? <UpdateFormUser userId={user?.id} /> : null}

                                            {user?.profileId ? <UpdateFormProfile profileId={user?.profileId} user={user} /> : null}

                                            {user?.profileId ? <UpdateFormPassword userId={user?.id} user={user} /> : null}

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

export default PrivateComponent(Settings);

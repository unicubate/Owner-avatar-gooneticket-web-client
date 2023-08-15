import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import LayoutDashboard from "@/components/layout-dashboard";
import { AudioMutedOutlined } from "@ant-design/icons";
import { BiDetail } from "react-icons/bi";
import { LuFileAudio2 } from "react-icons/lu";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { ButtonInput } from "@/components/templates/button-input";
import { CreateOrUpdateFormAudioPost } from "@/components/post/create-or-update-form-audio-post";



const PostsCreateAudio = () => {
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
            <LayoutDashboard title={"Posts create"}>


                <div className="flex flex-col flex-1">
                    <main>
                        <div className="py-6">

                            <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="grid grid-cols-1 gap-5 mt-8 sm:mt-12 sm:grid-cols-2 xl:grid-cols-2 sm:gap-8 xl:gap-12">
                                    <HorizontalNavCreatePost />
                                </div>
                            </div>


                            <div className="px-4 mx-auto mt-2 sm:px-6 md:px-8">

                                <div className="mt-4 sm:flex sm:items-center sm:justify-between">

                                    <p className="text-base font-bold text-gray-900">Audio Post</p>

                                    {/* <div className="mt-4 sm:mt-0">
                                        <ButtonInput shape="default" type="button" size="normal" loading={false} color={'indigo'}>
                                            Post
                                        </ButtonInput>
                                    </div> */}
                                </div>

                                <CreateOrUpdateFormAudioPost />

                            </div>
                        </div>
                    </main>
                </div>
            </LayoutDashboard>






        </>
    );
};

export default PrivateComponent(PostsCreateAudio);

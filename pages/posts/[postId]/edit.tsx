import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { PostModel } from "@/types/post";
import { useRouter } from "next/router";
import { ButtonInput } from "@/components/templates/button-input";
import { GetOnePostAPI } from "@/api/post";



const PostsCreate = () => {
    const { query } = useRouter()
    const postId = String(query?.postId)

    const { data: postItem } = GetOnePostAPI({ postId });
    
    const post: PostModel | undefined = postItem?.data;

    return (
        <>
            <LayoutDashboard title={`${post?.title ?? ''}`}>


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

                                    <p className="text-base font-bold text-gray-900">Posts</p>

                                    <div className="mt-4 sm:mt-0">
                                        <ButtonInput shape="default" type="button" size="normal" loading={false} color={'indigo'}>
                                            Post
                                        </ButtonInput>
                                    </div>
                                </div>


                                {post?.id ? <CreateOrUpdateFormPost post={post} postId={postId} /> : null}

                            </div>
                        </div>
                    </main>
                </div>
            </LayoutDashboard>






        </>
    );
};

export default PrivateComponent(PostsCreate);

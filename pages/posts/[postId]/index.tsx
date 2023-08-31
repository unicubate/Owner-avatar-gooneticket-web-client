import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavCreatePost } from "@/components/post/horizontal-nav-create-post";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { GetOnePostAPI, getOneFileGalleryAPI } from "@/api/post";
import { PostModel } from "@/types/post";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { ButtonInput } from "@/components/templates/button-input";
import { Image } from "antd";
import ListComments from "@/components/comment/list-comments";
import { MdFavoriteBorder } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import { LayoutSite } from "@/components/layout-site";
import { HtmlParser } from "@/utils/html-parser";

const PostShow = () => {
  const { query } = useRouter();
  const postSlug = String(query?.postId);

  const { data: postItem } = GetOnePostAPI({ postSlug });

  const post: PostModel | undefined = postItem?.data;

  return (
    <>
      <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">
        <div className="mt-6 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto xl:max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-900 mt-7 sm:text-3xl xl:text-3xl font-pj">
              {post?.title}
            </h1>
            <p className="text-sm font-normal text-gray-600 mt-7 font-pj">
              April 14, 2021
            </p>

            {post?.image ? (
            <div className="mt-2">
              <Image
                width="100%"
                height="100%"
                preview={false}
                src={''}
              />
            </div>
          ) : null}

            <div className="mt-10">
              <HtmlParser html={String(post?.description)} />
            </div>
          </div>
        </div>
      </LayoutSite>
    </>
  );
};

export default PostShow;

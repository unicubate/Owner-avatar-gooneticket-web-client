import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { CreateOrUpdateFormPost } from "@/components/post/create-or-update-form-post";
import { useRouter } from "next/router";
import { CreateOrUpdateFormAudioPost } from "@/components/post/create-or-update-form-audio-post";
import { CreateOrUpdateFormVideoPost } from "@/components/post/create-or-update-form-video-post";
import { CreateOrUpdateFormGalleryPost } from "@/components/post/create-or-update-form-gallery-post";

const PostsCreate = () => {
  const { query } = useRouter();
  const { type } = query;

  return (
    <>
      <LayoutDashboard title={"Posts create"}>
        <div className="flex-1 bg-gray-100">
          <main>
            <div className="max-w-4xl mx-auto py-6">
              <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                {type === "article" ? <CreateOrUpdateFormPost /> : null}

                {type === "audio" ? <CreateOrUpdateFormAudioPost /> : null}

                {type === "video" ? <CreateOrUpdateFormVideoPost /> : null}

                {type === "gallery" ? <CreateOrUpdateFormGalleryPost /> : null}
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(PostsCreate);

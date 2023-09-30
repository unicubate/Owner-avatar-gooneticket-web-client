import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { useEffect, useState } from "react";
import { Input, Spin } from "antd";
import { EmptyData } from "@/components/ui/empty-data";
import { CreateOrUpdateGallery } from "@/components/gallery/create-or-update-gallery";
import ListGallery from "@/components/gallery/list-gallery";
import { useAuth } from "@/components/util/context-user";
import { GetInfinitePostsAPI } from "@/api-site/post";
import { useInView } from "react-intersection-observer";
import { LoadingOutlined } from "@ant-design/icons";
import { LoadingFile } from "@/components/ui/loading-file";
import { EnableGallery } from "@/components/gallery/enable-gallery";
import { useRouter } from "next/router";

const Gallery = () => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const { userStorage, profile } = useAuth() as any;
  const [openModal, setOpenModal] = useState(false);

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    userId: userStorage?.id,
    take: 6,
    sort: "DESC",
    type: "GALLERY",
    queryKey: ['gallery-posts', "infinite"]
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableGallery = isLoadingGallery ? (
    <LoadingFile />
  ) : isErrorGallery ? (
    <strong>Error find data please try again...</strong>
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      title="Add your first file gallery"
      description={`Extras is a simple and effective way to offer something to your audience. It could be anything. See some examples here`}
    />
  ) : (
    dataGallery.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListGallery item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={"Gallery"}>
        {/* {openModal ? (
          <CreateOrUpdateGallery
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : null} */}

        <div className="flex flex-col flex-1 bg-gray-100">
          <main>
            <div className="max-w-6xl mx-auto py-6">

              <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">
                
                {profile?.id ? <EnableGallery profile={profile} /> : null}
                {/* <HorizontalNavDonation /> */}

                  <div className="flow-root">
                    <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
                      <div className="px-4 py-8">
                        <div className="sm:flex sm:items-center sm:justify-between">
                          <div className="mt-4 sm:mt-0">
                            <ButtonInput
                              onClick={() => router.push(`/posts/create?type=gallery`)}
                              shape="default"
                              type="button"
                              size="normal"
                              loading={false}
                              color={"indigo"}
                            >
                              Create File
                            </ButtonInput>
                          </div>
                          <div className="mt-4 sm:mt-0">
                            <Input placeholder="Search file" />
                          </div>
                        </div>

                        <div className="divide-y divide-gray-200">
                          {dataTableGallery}
                        </div>
                      </div>
                    </div>

                    {hasNextPage && (
                      <div className="mt-4 text-center justify-center mx-auto">
                        <div className="mt-4 sm:mt-0">
                          <ButtonInput
                            ref={ref}
                            onClick={() => fetchNextPage()}
                            shape="default"
                            type="button"
                            size="large"
                            loading={isFetchingNextPage ? true : false}
                            color={"indigo"}
                            minW="fit"
                          >
                            Load More
                          </ButtonInput>
                        </div>
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Gallery);

import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/templates/button-input";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { EmptyData } from "@/components/templates/empty-data";
import { CreateOrUpdateGallery } from "@/components/gallery/create-or-update-gallery";
import ListGallery from "@/components/gallery/list-gallery";
import { useAuth } from "@/components/util/session/context-user";
import { GetInfinitePostsAPI } from "@/api/post";
import { useInView } from "react-intersection-observer";

const Gallery = () => {
  const { ref, inView } = useInView();
  const { userStorage } = useAuth() as any;
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
  });

  const dataTableGallery = isLoadingGallery ? (
    <strong>Loading...</strong>
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

  return (
    <>
      <LayoutDashboard title={"Gallery"}>
        {openModal ? (
          <CreateOrUpdateGallery
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : null}

        <div className="flex flex-col flex-1">
          <main>
            <div className="max-w-6xl mx-auto py-6">
              <div className="px-4 mx-auto sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Gallery</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Creer plusieur image et partager avec vos contact
                  </p>
                </div>
              </div>

              <div className="px-4 mx-auto sm:px-6 md:px-8">
                {/* <HorizontalNavDonation /> */}

                <div className="border-gray-200 lg:order-1 lg:col-span-10">
                  <div className="flow-root">
                    <div className="mt-8 overflow-hidden bg-white border border-gray-200">
                      <div className="px-4 py-5">
                        <div className="sm:flex sm:items-center sm:justify-between">
                          <div className="mt-4 sm:mt-0">
                            <ButtonInput
                              onClick={() => setOpenModal(true)}
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
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Gallery);

/* eslint-disable jsx-a11y/anchor-is-valid */
import { ButtonInput } from "@/components/ui/button-input";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { EmptyData } from "@/components/ui/empty-data";
import ListGallery from "@/components/gallery/list-gallery";
import { GetInfinitePostsAPI } from "@/api-site/post";
import { useInView } from "react-intersection-observer";
import { LoadingFile } from "@/components/ui/loading-file";
import { useRouter } from "next/router";
import { UserVisitorModel } from "@/types/user.type";
import { BiImage } from "react-icons/bi";
import { ErrorFile } from "../ui/error-file";

type Props = {
  userVisitor: UserVisitorModel;
};

const TableGallery: React.FC<Props> = ({ userVisitor }) => {
  const router = useRouter();
  const { ref, inView } = useInView();
  const [openModal, setOpenModal] = useState(false);

  const {
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    userVisitor,
    take: 10,
    sort: "DESC",
    typeIds: ["GALLERY"],
    queryKey: ["posts", "infinite"],
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
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<BiImage className="h-10 w-10" />}
      title="Add your first file gallery"
      description={`Extras is a simple and effective way to offer something to your audience. It could be anything. See some examples here`}
    />
  ) : (
    dataGallery?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListGallery item={item} key={index} index={index} />
      ))
  );
  return (
    <>
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

          <div className="divide-y divide-gray-200">{dataTableGallery}</div>
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
    </>
  );
};

export { TableGallery };

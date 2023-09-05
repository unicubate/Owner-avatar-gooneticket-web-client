/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Image, Spin } from "antd";
import { GetInfinitePostsAPI } from "@/api/post";
import { LoadingOutlined } from "@ant-design/icons";
import { ButtonInput } from "../templates/button-input";
import { useInView } from "react-intersection-observer";
import ListPublicPosts from "./list-public-posts";
import { CreateOrUpdateFormLike } from "../like-follow/create-or-update-form-like";
import { BiComment } from "react-icons/bi";
import ListLastPosts from "./list-last-posts";
import { PostModel } from "@/types/post";

type Props = {
  post?: PostModel
  userId: string;
};

const PublicLastPosts: React.FC<Props> = ({ userId, post }) => {

  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 4,
    sort: "DESC",
    userId: userId,
    typeIds: ['ARTICLE', 'AUDIO']
  });



  const dataTablePosts = isLoadingPosts ? (
    <Spin
      tip="Loading"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      size="large"
    >
      <div className="content" />
    </Spin>
  ) : isErrorPosts ? (
    <strong>Error find data please try again...</strong>
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    dataPosts.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListLastPosts item={item} key={index} />
      ))
  );

  return (
    <>


      <div className="lg:sticky lg:order-2 lg:top-6 lg:col-span-2">
        <div className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-400/60">
          <div className="overflow-hidden rounded ">
            <div className="px-4 py-6 sm:p-6 lg:p-8">
              <h3 className="font-bold text-gray-700"> Latest Posts </h3>

              <div className="flow-root mt-8">
                <ul className="divide-y divide-gray-200 -my-7">


                  {dataTablePosts}


                </ul>
              </div>
              {post && userId || post?.userId ? (
                <div className="mt-6 text-center justify-center mx-auto">
                  <div className="sm:mt-0">
                    <ButtonInput
                      shape="default"
                      type="button"
                      size="huge"
                      loading={false}
                      color="indigo"
                      minW="fit"
                    >
                      Support
                    </ButtonInput>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicLastPosts;

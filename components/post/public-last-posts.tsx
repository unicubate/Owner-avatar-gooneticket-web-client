/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Spin } from "antd";
import { GetInfinitePostsAPI } from "@/api-site/post";
import { LoadingOutlined } from "@ant-design/icons";
import { ListLastPosts } from "./list-last-posts";
import { PostModel } from "@/types/post";
import { UserVisitorModel } from "@/types/user.type";
import { ErrorFile } from "../ui-setting/ant/error-file";

type Props = {
  userVisitor: UserVisitorModel;
};

const PublicLastPosts: React.FC<Props> = ({ userVisitor }) => {
  const {
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    data: dataPosts,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfinitePostsAPI({
    take: 6,
    sort: "DESC",
    userVisitor,
    status: 'ACTIVE',
    typeIds: ['ARTICLE', 'AUDIO', 'VIDEO'],
    queryKey: ['last-posts', "infinite"]

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
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
    ""
  ) : (
    <>
      <div className="mt-8 flow-root">
        <ul className="-my-7 divide-y divide-gray-200 dark:divide-gray-800">
          {dataPosts?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item: PostModel, index) => (
              <ListLastPosts item={item} key={index} />
            ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      <div className="px-4 py-6 sm:p-6 lg:p-8">
        <h3 className="font-bold dark:text-white">
          Latest Posts
        </h3>
        {dataTablePosts}
      </div>
    </>
  );
};

export { PublicLastPosts };

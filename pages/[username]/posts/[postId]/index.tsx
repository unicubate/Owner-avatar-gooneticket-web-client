import { LoadingOutlined } from "@ant-design/icons";
import { Image, Spin } from "antd";
import { GetOnePostAPI } from "@/api/post";
import { CreateOrUpdateFormLike } from "@/components/like-follow/create-or-update-form-like";
import { BiComment } from "react-icons/bi";
import { useRouter } from "next/router";
import { HorizontalNavPublicUser } from "@/components/user/horizontal-nav-public-user";
import { PostModel } from "@/types/post";
import { useAuth } from "@/components/util/session/context-user";
import ListPublicPostsComments from "@/components/post/list-public-posts-comments";
import { ButtonInput } from "@/components/templates/button-input";
import { GetOneUserPublicAPI } from "@/api/user";

const PostsShowUserPublic = () => {
  const userVisiter = useAuth() as any;
  const { query } = useRouter();
  const username = String(query?.username);
  const postSlug = String(query?.postId);

  const {
    isLoading: isLoadingUser,
    isError: isErrorUser,
    data: user,
  } = GetOneUserPublicAPI({ username, followerId: userVisiter?.id });

  const {
    data: post,
    isError: isErrorPost,
    isLoading: isLoadingPost,
  } = GetOnePostAPI({ postSlug, likeUserId: user?.id });

  const dataTablePosts =
    isLoadingPost || isLoadingUser ? (
      <Spin
        tip="Loading"
        indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
        size="large"
      >
        <div className="content" />
      </Spin>
    ) : isErrorPost || isErrorUser ? (
      <strong>Error find data please try again...</strong>
    ) : (
      <ListPublicPostsComments item={post} commentTake={10} />
    );
  return (
    <>
      {user?.id ? <HorizontalNavPublicUser user={user} /> : null}

      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* <div className="max-w-7xl mx-auto"> */}

        <div className="grid grid-cols-1 mt-2 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
          <div className="py-6 border-gray-200 lg:col-span-3 xl:col-span-4">
            <div className="flow-root">
              <div className="px-4 mt-4 mx-auto sm:px-6 md:px-8">
                {dataTablePosts}
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:order-2 lg:top-6 lg:col-span-2">
            <div className="mt-8 overflow-hidden bg-white shadow-2xl shadow-gray-400/60">
              <div className="overflow-hidden rounded ">
                <div className="px-4 py-6 sm:p-6 lg:p-8">
                  <h3 className="font-bold text-gray-700"> Latest Posts </h3>

                  <div className="flow-root mt-8">
                    <ul className="divide-y divide-gray-200 -my-7">
                      <li className="flex items-stretch justify-between space-x-2 py-7">
                        <div className="flex-shrink-0">
                          <Image
                            height={65}
                            preview={false}
                            className="object-cover w-16 h-16 rounded-lg"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-1.png"
                            alt=""
                          />
                        </div>

                        <div className="flex flex-col justify-between flex-1 ml-5">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                              Apple Watch Series 7
                            </p>
                            <div className="flex mt-4 items-center text-gray-500">
                              <CreateOrUpdateFormLike
                                typeLike="POST"
                                item={[]}
                              />

                              <button className="ml-3.5 text-lg font-bold text-gray-500">
                                <BiComment />
                              </button>
                              <span className="ml-1.5 font-normal text-sm">
                                20
                              </span>
                              <span className="ml-7 font-normal text-sm">
                                01 sept. 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="flex items-stretch justify-between space-x-2 py-7">
                        <div className="flex-shrink-0">
                          <Image
                            height={65}
                            preview={false}
                            className="object-cover w-16 h-16 rounded-lg"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-2.png"
                            alt=""
                          />
                        </div>

                        <div className="flex flex-col justify-between flex-1 ml-5">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                              Voici donc les 3 prochains sujets prévus sur
                              Patreon
                            </p>
                            <div className="flex mt-4 items-center text-gray-500">
                              <CreateOrUpdateFormLike
                                typeLike="POST"
                                item={[]}
                              />

                              <button className="ml-3.5 text-lg font-bold text-gray-500">
                                <BiComment />
                              </button>
                              <span className="ml-1.5 font-normal text-sm">
                                19
                              </span>
                              <span className="ml-7 font-normal text-sm">
                                16 jui. 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="flex items-stretch justify-between space-x-2 py-7">
                        <div className="flex-shrink-0">
                          <Image
                            height={65}
                            preview={false}
                            className="object-cover w-16 h-16 rounded-lg"
                            src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/checkout/1/product-2.png"
                            alt=""
                          />
                        </div>

                        <div className="flex flex-col justify-between flex-1 ml-5">
                          <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">
                              Voici donc les 3 prochains sujets prévus sur
                              Patreon
                            </p>
                            <div className="flex mt-2 items-center text-gray-500">
                              <CreateOrUpdateFormLike
                                typeLike="POST"
                                item={[]}
                              />

                              <button className="ml-3.5 text-lg font-bold text-gray-500">
                                <BiComment />
                              </button>
                              <span className="ml-1.5 font-normal text-sm">
                                599
                              </span>
                              <span className="ml-7 font-normal text-sm">
                                04 jui. 2023
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {user?.id || post?.id ? (
                    <div className="mt-6 text-center justify-center mx-auto">
                      <div className="sm:mt-0">
                        <ButtonInput
                          shape="default"
                          type="button"
                          size="huge"
                          loading={false}
                          color={user?.profile?.color}
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
        </div>
      </div>
    </>
  );
};

export default PostsShowUserPublic;

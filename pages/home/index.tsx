import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/templates/button-input";
import { GetInfiniteFollowsPostsAPI } from "@/api/post";
import ListFollowPosts from "@/components/post/list-follow-posts";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Home = () => {
    const {
        status,
        error,
        isLoading: isLoadingPosts,
        isError: isErrorPosts,
        data: dataPosts,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = GetInfiniteFollowsPostsAPI({
        take: 6,
        sort: "DESC",
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
                <ListFollowPosts item={item} key={index} index={index} />
            ))
    );


    return (
        <>
            <LayoutDashboard title={"Home"}>
                <div className="flex flex-col flex-1">
                    <main>
                        <div className="max-w-3xl mx-auto py-6">
                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                                {dataTablePosts}

                                {/* <div className="bg-gray-100 h-96">
                                    <div className="flex items-center justify-center w-full h-full px-4 py-5 sm:p-6">
                                        <div className="w-full max-w-sm bg-white shadow-lg rounded-xl">
                                            <div className="px-4 py-5 sm:p-6 text-center">
                                                <p className="mt-5 text-xl font-bold text-gray-900">Delete Project?</p>
                                                <p className="mt-3 text-sm font-medium tex text-gray-500">Lorem ipsum dolor sit amet, consec tetur adipiscing elit.</p>
                                                <div className="flex items-center mt-8 space-x-4">
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                    >
                                                        Cancel
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}


                                {hasNextPage && (
                                    <div className="mt-6 text-center justify-center mx-auto">
                                        <div className="sm:mt-0">
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
                    </main>
                </div>
            </LayoutDashboard>
        </>
    );
};

export default PrivateComponent(Home);

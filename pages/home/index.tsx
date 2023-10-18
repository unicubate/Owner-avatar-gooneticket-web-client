import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { ButtonInput } from "@/components/ui/button-input";
import { GetInfiniteFollowsPostsAPI } from "@/api-site/post";
import ListFollowPosts from "@/components/post/list-follow-posts";
import { LoadingFile } from "@/components/ui/loading-file";

const Home = () => {
    const {
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
        <LoadingFile />
    ) : isErrorPosts ? (
        <strong>Error find data please try again...</strong>
    ) : dataPosts?.pages[0]?.data?.total <= 0 ? (
        ""
    ) : (
        dataPosts?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item, index) => (
                <ListFollowPosts item={item} key={index} commentTake={2} />
            ))
    );


    return (
        <>
            <LayoutDashboard title={"Home"}>
                <div className="flex flex-col flex-1 bg-gray-100">
                    <main>
                        <div className="max-w-3xl mx-auto py-6">
                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                                
                                {dataTablePosts}


                                {hasNextPage && (
                                    <div className="mt-4 text-center justify-center mx-auto">
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

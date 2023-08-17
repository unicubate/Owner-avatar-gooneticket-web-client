import { PrivateComponent } from "@/components/util/session/private-component";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { usePathname } from "next/navigation";
import LayoutDashboard from "@/components/layout-dashboard";
import { Avatar, Image } from "antd";
import { arrayComments } from "@/components/mock";
import { useState } from "react";
import Link from "next/link";
import { TextAreaInput } from "@/components/util/form";
import { ButtonInput } from "@/components/templates/button-input";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CommentOutlined, HeartOutlined } from "@ant-design/icons";
import { getFollowsPostsAPI } from "@/api/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListFollowPosts from "@/components/post/list-follow-posts";

const schema = yup.object({
    description: yup.string().required(),
});


const Home = () => {
    const [comments] = useState(arrayComments)
    const pathname = usePathname();
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<any> = (payload: any) => {
        // let data = new FormData();
        // data.append("confirm", `${payload.confirm}`);
        // payload?.attachment?.fileList?.length > 0 &&
        //   payload?.attachment?.fileList.forEach((file: any) => {
        //     data.append("attachment", file as RcFile);
        //   });

        console.log("payload =======>", payload);
    };

    const fetchData = async (pageParam: number) =>
        await getFollowsPostsAPI({
            take: 2,
            page: pageParam,
            sort: "DESC",
        });
    const {
        status,
        error,
        isLoading: isLoadingPosts,
        isError: isErrorPosts,
        data: dataPosts,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["posts-follows"],
        getNextPageParam: (lastPage: any) => lastPage.data.next_page,
        queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
        keepPreviousData: true,
    });

    const dataTablePosts = isLoadingPosts ? (
        ''
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
                        <div className="py-6">

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">
                                {/* <HorizontalNavSetting /> */}


                                {dataTablePosts}

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

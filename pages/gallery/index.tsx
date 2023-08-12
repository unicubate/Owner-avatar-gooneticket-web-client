import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { ButtonInput } from "@/components/templates/button-input";
import { useEffect, useState } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import {
  CommentOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FieldTimeOutlined,
  FundOutlined,
  HeartOutlined,
  LikeOutlined,
  PlusOutlined,
  SmallDashOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, MenuProps, Tooltip } from "antd";
import { arrayDonation, arrayGallery } from "@/components/mock";
import Swal from "sweetalert2";
import { EmptyData } from "@/components/templates/empty-data";
import { CreateOrUpdateGallery } from "@/components/gallery/create-or-update-gallery";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOneGalleryAPI, getGalleriesApi } from "@/api/gallery";
import { AlertDangerNotification, useDebounce } from "@/utils";
import ListGallery from "@/components/gallery/list-gallery";

const Gallery = () => {
  const [galleryArrays] = useState(arrayGallery);
  const [openModal, setOpenModal] = useState(false);
  const userId = "27470c31-8409-48d4-bbfc-90f773534ef3";

  const fetchData = async (pageParam: number) =>
    await getGalleriesApi({
      userId: userId,
      take: 6,
      page: pageParam,
      sort: "DESC",
    });
  const {
    status,
    error,
    isLoading: isLoadingGallery,
    isError: isErrorGallery,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["galleries"],
    getNextPageParam: (lastPage: any) => lastPage.data.next_page,
    queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
    keepPreviousData: true,
  });

  const dataTableGallery = isLoadingGallery ? (
    <strong>Loading...</strong>
  ) : isErrorGallery ? (
    <strong>Error find data please try again...</strong>
  ) : dataGallery?.pages?.length <= 0 ? (
    ""
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
        {openModal ? (
          <CreateOrUpdateGallery
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        ) : null}

        <div className="flex flex-col flex-1">
          <main>
            <div className="py-6">
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

                        {hasNextPage && (
                          <div className="text-center justify-center mx-auto">
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

                        <div className="text-center justify-center mx-auto">
                          {/* <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"> */}
                          {/* <h2 className="text-xl font-semibold text-gray-900">Button with Icons</h2> */}

                          {/* <div className="flex flex-wrap gap-5 mt-8"> */}
                          {/* <button
                                                                type="button"
                                                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                                            >
                                                                Button name
                                                                <svg className="w-6 h-6 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                                </svg>
                                                            </button> */}

                          {/* <button
                                                                type="button"
                                                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500"
                                                            >
                                                                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                                                </svg>
                                                                Button name
                                                            </button> */}

                          {/* <button type="button" className="inline-flex items-center justify-center p-3 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-500">
                                                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                                </svg>
                                                            </button> */}
                          {/* </div> */}
                          {/* </div> */}
                        </div>
                      </div>
                    </div>
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

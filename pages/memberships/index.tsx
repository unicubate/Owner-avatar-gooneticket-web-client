import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { ButtonInput } from "@/components/templates/button-input";
import { useState } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import { CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Empty, Input } from "antd";
import { arrayMemberships } from "@/components/mock";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { EmptyData } from "@/components/templates/empty-data";
import { useRouter } from "next/router";


const Memberships = () => {
    const router = useRouter();
    const [membershipsArrays] = useState(arrayMemberships)
    const [showModal, setShowModal] = useState(false);


    return (
        <>

            <LayoutDashboard title={"Memberships"}>
                <div className="flex-1">
                    <main>
                        <div className="max-w-6xl mx-auto py-6">

                            <div className="px-4 mx-auto mt-6 sm:px-6 md:px-8">

                                <HorizontalNavMembership />



                                <div className="flow-root">
                                    <div className="mt-8 overflow-hidden bg-white border border-gray-200 rounded-lg">
                                        <div className="px-4 py-8">
                                            <div className="sm:flex sm:items-center sm:justify-between">
                                                <div className="mt-4 sm:mt-0">
                                                    <ButtonInput
                                                        onClick={() =>
                                                            router.push(`${`/memberships/create`}`)
                                                        }
                                                        shape="default"
                                                        type="button"
                                                        size="normal"
                                                        loading={false}
                                                        color={"indigo"}
                                                    >
                                                        Create level
                                                    </ButtonInput>
                                                </div>
                                                <div className="mt-4 sm:mt-0">
                                                    <Input placeholder="Search product" />
                                                </div>
                                            </div>

                                            <div className="divide-y divide-gray-200">
                                                {/* {dataTableProducts} */}
                                            </div>
                                        </div>
                                    </div>

                                    {/* {hasNextPage && (
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
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </LayoutDashboard>




        </>
    );
};

export default PrivateComponent(Memberships);

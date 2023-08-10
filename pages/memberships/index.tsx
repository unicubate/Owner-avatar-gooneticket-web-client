import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { ButtonInput } from "@/components/templates/button-input";
import { useState } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import { CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { arrayMemberships } from "@/components/mock";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";


const Memberships = () => {
    const [membershipsArrays] = useState(arrayMemberships)
    const [showModal, setShowModal] = useState(false);


    return (
        <>

            <LayoutDashboard title={"Memberships"}>


                {showModal ? (
                    <CreateOrUpdateDonation showModal={showModal} setShowModal={setShowModal} />
                ) : null}



                <div className="flex flex-col flex-1">
                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Memberships</h1>
                                    <p className="mt-2 text-sm font-medium leading-6 text-gray-500">Creer pluser donation et partager avec vos contact</p>
                                </div>
                            </div>

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                                <HorizontalNavMembership />

                                <div className="pt-6 border-gray-200 lg:order-1 lg:col-span-10">

                                    <div className="flow-root">

                                        <div className="overflow-hidden bg-white border border-gray-200">
                                            <div className="px-4 py-5">

                                                {/* <p className="text-base font-bold text-gray-900">Memberships</p> */}

                                                <div className="mt-4 sm:mt-0">
                                                    {/* <button
                                                        type="button"
                                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                                    >
                                                        Create donation
                                                    </button> */}
                                                    <Button onClick={() => setShowModal(true)} size={'middle'}>
                                                        Create membership
                                                    </Button>
                                                    {/* <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="normal" loading={false} color={'indigo'}>
                                                        Create membership
                                                    </ButtonInput> */}
                                                </div>
                                            </div>

                                            {/* <hr className="mt-6 border-gray-200" /> */}

                                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <table className="min-w-full lg:divide-y lg:divide-gray-200">
                                                    <thead className="hidden lg:table-header-group">
                                                        <tr>
                                                            <th className="text-left text-sm font-medium text-gray-500">
                                                                <div className="flex items-center">
                                                                    Title
                                                                </div>
                                                            </th>

                                                            <th className="text-left text-sm font-medium text-gray-500">
                                                                <div className="flex items-center">
                                                                    Price per month
                                                                </div>
                                                            </th>

                                                            <th className="text-left text-sm font-medium text-gray-500">
                                                                <div className="flex items-center">
                                                                    Price per year
                                                                </div>
                                                            </th>


                                                            <th className="text-left text-sm font-medium text-gray-500">
                                                                <div className="flex items-center">
                                                                    Date
                                                                </div>
                                                            </th>

                                                            {/* <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                    <div className="flex items-center">
                        Status
                    </div>
                </th> */}

                                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                                                                <span className="sr-only"> Actions </span>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody className="divide-y divide-gray-200">

                                                        {membershipsArrays.map((donation, index) => (


                                                            <tr key={index}>

                                                                <td className="text-sm font-bold text-gray-900 whitespace-nowrap">
                                                                    <div className="inline-flex items-center">
                                                                        {/* <img className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-list/1/clarity-landing-logo.png" alt="" /> */}
                                                                        {donation?.title}
                                                                    </div>
                                                                    <div className="space-y-1 lg:hidden pt-2">
                                                                        {/* <p className="text-sm font-medium text-gray-500">#29345</p> */}
                                                                        <p className="text-sm font-medium text-gray-500">07 January, 2022</p>
                                                                    </div>
                                                                </td>

                                                                <td className="hidden text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">{donation?.pricePerMonthly} €</td>

                                                                <td className="hidden text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">{donation?.pricePerYearly} €</td>

                                                                <td className="hidden text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">07 January, 2022</td>



                                                                <td className="py-3 px-10 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
                                                                    <Button type="text" shape="circle" icon={<CopyOutlined />} size="small" />
                                                                    <Button type="link" shape="circle" icon={<EditOutlined />} size="small" />
                                                                    <Button type="link" danger shape="circle" icon={<DeleteOutlined />} size="small" />
                                                                    <div className="mt-1 lg:hidden pt-1">
                                                                        <p>{donation?.pricePerMonthly} € - {donation?.pricePerYearly} €</p>
                                                                        {/* <div className="inline-flex items-center justify-end mt-1">
                                <svg className="mr-1.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                    <circle cx="4" cy="4" r="3" />
                                </svg>
                                Complete
                            </div> */}
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        ))}



                                                    </tbody>
                                                </table>
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

export default PrivateComponent(Memberships);

import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { ButtonInput } from "@/components/templates/button-input";
import { useState } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import { CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { arrayMemberships } from "@/components/mock";
import { HorizontalNavMembership } from "@/components/membership/horizontal-nav-membership";
import { useRouter } from "next/router";


const MembershipsLevels = () => {
    const router = useRouter();
    const [membershipsArrays] = useState(arrayMemberships)
    const [showModal, setShowModal] = useState(false);


    return (
        <>

            <LayoutDashboard title={"Memberships levels"}>


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

                                <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                                    <>
                                        <p className="text-base font-bold text-gray-900">Memberships</p>
                                    </>


                                    <div className="mt-4 sm:mt-0">
                                        <ButtonInput onClick={() => router.push(`${`/memberships/levels/create`}`)} shape="default" type="button" size="normal" loading={false} color={'indigo'}>
                                            Create level
                                        </ButtonInput>
                                    </div>
                                </div>

                                {/* <div className="mt-4 sm:mt-0"> */}

                                {/* grid grid-cols-1 gap-6  sm:grid-cols-2 px-8 mt-12 sm:mt-16 lg:grid-cols-3 xl:grid-cols-5 sm:px-0 */}

                                <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-1 px-4 mt-4 sm:mt-4 lg:grid-cols-2 xl:grid-cols-4 sm:px-0">


                                    {membershipsArrays.map((item: any, index) => (


                                        <div key={index} className="flex flex-col overflow-hidden transition-all duration-200 transform bg-white border border-gray-100 shadow group rounded-xl hover:shadow-lg hover:-translate-y-1">

                                            {item?.image ? <div className="flex shrink-0 aspect-w-4 aspect-h-3">
                                                <Image src={`${item?.image}`} alt={item?.title} />
                                            </div> : null}

                                            <div className="flex-1 px-4 sm:p-6">
                                                <p className="text-3xl font-bold text-gray-900">{item?.title}</p>
                                                <p className="text-2xl font-semibold tracking-tight text-gray-900">{item?.pricePerMonthly} $</p>
                                                <p className="pb-1 font-semibold text-gray-900">per month</p>

                                                <p className="mt-3 text-gray-600">
                                                    {item?.description}
                                                </p>

                                                <ul className="pt-4 space-y-4 text-base font-medium text-left">
                                                    <li className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2 text-green-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Support me on a monthly basis
                                                    </li>

                                                    <li className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2 text-green-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Unlock exclusive posts and messages
                                                    </li>

                                                    <li className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2 text-green-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Access to full library
                                                    </li>

                                                    <li className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2 text-green-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Free & Discounted Extras
                                                    </li>

                                                    <li className="flex items-center">
                                                        <svg className="w-5 h-5 mr-2 text-green-600 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        Exclusive Discounts
                                                    </li>
                                                </ul>

                                                <div className="mt-2 py-2 space-y-2">
                                                    <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="large" loading={false} color="gray">
                                                        Edit
                                                    </ButtonInput>
                                                    <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="large" loading={false} color={'indigo'}>
                                                        Join
                                                    </ButtonInput>
                                                </div>
                                            </div>
                                        </div>
                                    ))}





                                </div>

                            </div>
                        </div>
                    </main>
                </div>
            </LayoutDashboard>

















        </>
    );
};

export default PrivateComponent(MembershipsLevels);

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

                                <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-base font-bold text-gray-900">Memberships</p>
                                        {/* <p className="mt-1 text-sm font-medium text-gray-500">Monthly Plan</p> */}
                                    </div>

                                    <div className="mt-4 sm:mt-0">
                                        {/* <button
                                            type="button"
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold leading-5 text-gray-600 transition-all duration-200 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                        >
                                            Create donation
                                        </button> */}

                                        <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="normal" loading={false} color={'indigo'}>
                                            Create membership
                                        </ButtonInput>
                                    </div>
                                </div>

                                <hr className="mt-6 border-gray-200" />


                                {/* <div className="flex items-center justify-between">
                                    <p className="text-xl font-bold text-gray-900">Sales</p>

                                    <div className="inline-flex items-center justify-end">
                                        <label className="text-sm font-medium text-gray-900"> Sort: </label>
                                        <select id="sort" name="sort" className="block w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
                                            <option>Popularity</option>
                                        </select>
                                    </div>
                                </div> */}

                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-10">
                                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                        <table className="min-w-full lg:divide-y lg:divide-gray-200">
                                            <thead className="hidden lg:table-header-group">
                                                <tr>
                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                        <div className="flex items-center">
                                                            Title
                                                        </div>
                                                    </th>

                                                    {/* <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                        <div className="flex items-center">
                                                            Customer Name
                                                        </div>
                                                    </th> */}

                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                        <div className="flex items-center">
                                                            Price per month
                                                        </div>
                                                    </th>

                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
                                                        <div className="flex items-center">
                                                            Price per year
                                                        </div>
                                                    </th>


                                                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-500">
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

                                                        <td className="px-4 py-4 text-sm font-bold text-gray-900 whitespace-nowrap">
                                                            <div className="inline-flex items-center">
                                                                {/* <img className="flex-shrink-0 object-cover w-8 h-8 mr-3 rounded-full" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/table-list/1/clarity-landing-logo.png" alt="" /> */}
                                                                {donation?.title}
                                                            </div>
                                                            <div className="space-y-1 lg:hidden pt-2">
                                                                {/* <p className="text-sm font-medium text-gray-500">#29345</p> */}
                                                                <p className="text-sm font-medium text-gray-500">07 January, 2022</p>
                                                            </div>
                                                        </td>

                                                        {/* <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">James Dorgan</td> */}
                                                        <td className="hidden px-4 py-4 text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">{donation?.pricePerMonthly} €</td>

                                                        <td className="hidden px-4 py-4 text-sm font-bold text-gray-900 lg:table-cell whitespace-nowrap">{donation?.pricePerYearly} €</td>

                                                        <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">07 January, 2022</td>


                                                        {/* <td className="hidden px-4 py-4 text-sm font-medium text-gray-900 lg:table-cell whitespace-nowrap">
                                                        <div className="inline-flex items-center">
                                                            <svg className="mr-1.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                                                <circle cx="4" cy="4" r="3" />
                                                            </svg>
                                                            Complete
                                                        </div>
                                                        </td> */}

                                                        <td className="px-4 py-4 text-sm font-medium text-right text-gray-900 whitespace-nowrap">
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


                                {/* <div className="mt-4 sm:flex sm:items-center sm:justify-between">
                                    <p className="text-sm font-medium text-gray-900">Your next payment is <span className="font-bold">$59.00 USD</span>, to be charged on <span className="font-bold">April 08, 2022</span></p>

                                    <p className="mt-2 text-sm font-medium text-gray-500 sm:mt-0">Your payment will be automatically renewed each month</p>
                                </div>

                                <div className="mt-8 bg-white border border-gray-200 rounded-xl">
                                    <div className="px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-x-24 gap-y-8">
                                            <div className="lg:col-span-2">
                                                <p className="text-base font-bold text-gray-900">Payment Method</p>
                                                <p className="mt-2 text-sm font-medium text-gray-500">Choose your preferred payment method for making future payments</p>
                                            </div>

                                            <div className="lg:col-span-3">
                                                <div className="space-y-5">
                                                    <div className="relative overflow-hidden border border-indigo-600 rounded-xl bg-indigo-50">
                                                        <div className="absolute top-4 right-4">
                                                            <svg className="w-6 h-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>

                                                        <div className="relative px-4 py-5">
                                                            <div className="flex items-start">
                                                                <img className="flex-shrink-0 w-auto h-6 rounded-md" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/select-box/3/visa-logo.png" alt="" />

                                                                <div className="ml-4">
                                                                    <p className="text-sm font-bold text-gray-900">Visa ending 4331</p>
                                                                    <p className="mt-1 text-sm font-medium text-gray-500">Expiry 09/2024</p>

                                                                    <div className="flex items-center mt-4 space-x-6">
                                                                        <a href="#" title="" className="text-sm font-semibold text-gray-400 transition-all duration-200 rounded-md cursor-not-allowed pointer-events-none hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600">
                                                                            Primary Card
                                                                        </a>

                                                                        <a href="#" title="" className="text-sm font-semibold text-indigo-600 transition-all duration-200 rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"> Edit </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl">
                                                        <div className="absolute top-4 right-4">
                                                            <svg className="w-6 h-6 text-indigo-600 opacity-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                                                            </svg>
                                                        </div>

                                                        <div className="relative px-4 py-5">
                                                            <div className="flex items-start">
                                                                <img className="flex-shrink-0 w-auto h-6 rounded-md" src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/select-box/3/visa-logo.png" alt="" />

                                                                <div className="ml-4">
                                                                    <p className="text-sm font-bold text-gray-900">Visa ending 5442</p>
                                                                    <p className="mt-1 text-sm font-medium text-gray-500">Expiry 08/2023</p>

                                                                    <div className="flex items-center mt-4 space-x-6">
                                                                        <a href="#" title="" className="text-sm font-semibold text-gray-600 transition-all duration-200 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"> Set as Primary </a>

                                                                        <a href="#" title="" className="text-sm font-semibold text-indigo-600 transition-all duration-200 rounded-md hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"> Edit </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6">
                                                    <button type="button" className="inline-flex items-center justify-center text-sm font-medium leading-5 text-gray-600 transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:text-gray-900">
                                                        <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                        </svg>
                                                        Add New Payment Method
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                    </main>
                </div>
            </LayoutDashboard>




        </>
    );
};

export default PrivateComponent(Memberships);

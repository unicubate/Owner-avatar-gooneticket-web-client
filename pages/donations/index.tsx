import { PrivateComponent } from "@/components/util/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { ButtonInput } from "@/components/ui/button-input";
import { useState } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import { CopyOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { arrayDonation } from "@/components/mock";
import Swal from 'sweetalert2';
import { EmptyData } from "@/components/ui/empty-data";


const Donations = () => {
    const [donationsArrays] = useState(arrayDonation)
    const [showModal, setShowModal] = useState(false);


    const deleteItem = (donation: any) => {

        Swal.fire({
            title: 'Delete?',
            text: 'Are you sure you want to perform this action?',
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            // confirmButtonColor: '#3085d6',
            // cancelButtonColor: '#d33',
            // customClass: {
            //   confirmButton: 'btn btn-primary',
            //   cancelButton: 'btn btn-outline-default',
            // },
            showCancelButton: true,
            reverseButtons: true,
            footer: `<b>Delete: ${donation?.title} </b>`
        }).then(async (result) => {
            // if (result.value) {
            //   //Envoyer la requet au serve
            //   const payloadSave = { code: voucher?.code }
            //   // eslint-disable-next-line no-lone-blocks
            //   {
            //     voucher?.voucherType === 'COUPON' ?
            //       actionDeleteCouponMutation.mutateAsync(payloadSave) :
            //       actionDeleteVoucherMutation.mutateAsync(payloadSave)
            //   }

            // }
        });

    }

    return (
        <>

            <LayoutDashboard title={"Donations"}>


                {showModal ? (
                    <CreateOrUpdateDonation showModal={showModal} setShowModal={setShowModal} />
                ) : null}



                <div className="flex flex-col flex-1">
                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Donations</h1>
                                    <p className="mt-2 text-sm font-medium leading-6 text-gray-500">Creer pluser donation et partager avec vos contact</p>
                                </div>
                            </div>

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                                <HorizontalNavDonation />


                                <div className="border-gray-200 lg:order-1 lg:col-span-10">
                                    <div className="flow-root">
                                        <div className="mt-8 overflow-hidden bg-white border border-gray-200">
                                            <div className="px-4 py-5">

                                                <div className="sm:flex sm:items-center sm:justify-between">
                                                    <div className="mt-4 sm:mt-0">
                                                        <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="large" loading={false} color={'indigo'}>
                                                            Create donation
                                                        </ButtonInput>
                                                    </div>
                                                    <div className="mt-4 sm:mt-0">
                                                        <Input placeholder="Search donation" />
                                                    </div>
                                                </div>




                                                {donationsArrays.length > 0 ?
                                                    <table className="min-w-full lg:divide-y lg:divide-gray-200">
                                                        <thead className="hidden lg:table-header-group">
                                                            <tr>
                                                                <th className="py-4 text-left text-sm font-medium text-gray-500">
                                                                    <div className="flex items-center">
                                                                        Title
                                                                    </div>
                                                                </th>

                                                                <th className="py-4 text-left text-sm font-medium text-gray-500">
                                                                    <div className="flex items-center">
                                                                        Amount
                                                                    </div>
                                                                </th>

                                                                <th className="py-4 text-left text-sm font-medium text-gray-500">
                                                                    <div className="flex items-center">
                                                                        Date
                                                                    </div>
                                                                </th>

                                                                <th className="relative py-4 pl-3 pr-4 sm:pr-6 md:pr-0"></th>
                                                            </tr>
                                                        </thead>

                                                        <tbody className="divide-y divide-gray-200">

                                                            {donationsArrays.map((donation: any, index) => (


                                                                <tr key={index}>

                                                                    <td className="py-4 text-sm font-bold text-gray-900">
                                                                        <div className="inline-flex items-center">
                                                                            {donation?.title}
                                                                        </div>
                                                                        <div className="space-y-1 lg:hidden pt-2">
                                                                            <p className="text-sm font-medium text-gray-500">07 January, 2022</p>
                                                                        </div>
                                                                    </td>

                                                                    <td className="hidden py-4 text-sm font-bold text-gray-900 lg:table-cell">{donation?.amount}&nbsp;€</td>

                                                                    <td className="hidden py-4 text-sm font-medium text-gray-900 lg:table-cell">07 January, 2022</td>



                                                                    <td className="py-4 text-sm font-medium text-right text-gray-900">
                                                                        <Button type="text" shape="circle" icon={<CopyOutlined />} size="small" />
                                                                        <Button type="link" shape="circle" icon={<EditOutlined />} size="small" />
                                                                        <Button type="link" danger shape="circle" icon={<DeleteOutlined />} size="small" onClick={() => deleteItem(donation)} />
                                                                        <div className="mt-1 lg:hidden pt-1">
                                                                            <p>{donation?.amount}&nbsp;€</p>
                                                                            {/* <div className="inline-flex items-center justify-end mt-1">
                                                                    <svg className="mr-1.5 h-2.5 w-2.5 text-green-500" fill="currentColor" viewBox="0 0 8 8">
                                                                        <circle cx="4" cy="4" r="3" />
                                                                    </svg>
                                                                    1000.000.000
                                                                </div> */}
                                                                        </div>
                                                                    </td>
                                                                </tr>

                                                            ))}



                                                        </tbody>
                                                    </table>
                                                    : <EmptyData
                                                        title='Add your first donation to get started'
                                                        description={`Extras is a simple and effective way to offer something to your audience. It could be anything. See some examples here`}
                                                    />}




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

export default PrivateComponent(Donations);

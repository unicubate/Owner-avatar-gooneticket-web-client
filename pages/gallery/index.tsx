import { PrivateComponent } from "@/components/util/session/private-component";
import LayoutDashboard from "@/components/layout-dashboard";
import { HorizontalNavDonation } from "@/components/donation/horizontal-nav-donation";
import { ButtonInput } from "@/components/templates/button-input";
import { useState } from "react";
import { CreateOrUpdateDonation } from "@/components/donation/create-or-update-donation";
import { CommentOutlined, CopyOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FieldTimeOutlined, FundOutlined, HeartOutlined, LikeOutlined, PlusOutlined, SmallDashOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Input, MenuProps, Tooltip } from "antd";
import { arrayDonation, arrayGallery } from "@/components/mock";
import Swal from 'sweetalert2';
import { EmptyData } from "@/components/templates/empty-data";


const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Edit
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Delete
            </a>
        ),
    },
];

const Gallery = () => {
    const [galleryArrays] = useState(arrayGallery)
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

            <LayoutDashboard title={"Gallery"}>


                {showModal ? (
                    <CreateOrUpdateDonation showModal={showModal} setShowModal={setShowModal} />
                ) : null}



                <div className="flex flex-col flex-1">
                    <main>
                        <div className="py-6">
                            <div className="px-4 mx-auto sm:px-6 md:px-8">
                                <div className="max-w-md">
                                    <h1 className="text-lg font-bold text-gray-900">Gallery</h1>
                                    <p className="mt-2 text-sm font-medium leading-6 text-gray-500">Creer plusieur image et partager avec vos contact</p>
                                </div>
                            </div>

                            <div className="px-4 mx-auto mt-8 sm:px-6 md:px-8">

                                {/* <HorizontalNavDonation /> */}


                                <div className="border-gray-200 lg:order-1 lg:col-span-10">
                                    <div className="flow-root">
                                        <div className="mt-8 overflow-hidden bg-white border border-gray-200">
                                            <div className="px-4 py-5">

                                                <div className="sm:flex sm:items-center sm:justify-between">
                                                    <div className="mt-4 sm:mt-0">
                                                        <ButtonInput onClick={() => setShowModal(true)} shape="default" type="button" size="normal" loading={false} color={'indigo'}>
                                                            <PlusOutlined color="#ffff" /> Create File
                                                        </ButtonInput>
                                                    </div>
                                                    <div className="mt-4 sm:mt-0">
                                                        <Input placeholder="Search file" />
                                                    </div>
                                                </div>


                                                <div className="divide-y divide-gray-200">

                                                    {galleryArrays.map((item, index) => (
                                                        <>
                                                            <div key={index} className="py-5 divide-y divide-gray-200">
                                                                <div className="flex items-center">
                                                                    <div className="relative flex-shrink-0 cursor-pointer">
                                                                        <Avatar size={150} shape="square" src={item?.image} alt={item?.title} />
                                                                    </div>

                                                                    <div className="flex-1 min-w-0 ml-4 cursor-pointer">
                                                                        <p className="mt-4 text-sm font-medium text-gray-500"><FieldTimeOutlined /> {item?.createdAt}</p>
                                                                        <p className="mt-4 text-sm font-medium text-gray-500"><LikeOutlined /> 0</p>
                                                                        <p className="mt-4 text-sm font-medium text-gray-500"><CommentOutlined /> 0</p>
                                                                        <p className="mt-4 text-sm font-medium text-gray-500"><FundOutlined /> {item?.type}</p>
                                                                    </div>

                                                                    {/* <div className="flex-1 min-w-0 ml-4 cursor-pointer">
                                                                        <p className="text-sm font-medium text-gray-500">200 <LikeOutlined /></p>
                                                                        <p className="mt-20 text-sm font-medium text-gray-500">150 <CommentOutlined /></p>
                                                                    </div> */}

                                                                    <div className="py-4 text-sm font-medium text-right text-gray-900">
                                                                        <Tooltip placement="bottomRight" title={'View'}>
                                                                            <Button type="link" shape="circle" icon={<EyeOutlined />} size="small" />
                                                                        </Tooltip>
                                                                        <Tooltip placement="bottomRight" title={'Edit'}>
                                                                            <Button type="link" shape="circle" icon={<EditOutlined />} size="small" />
                                                                        </Tooltip>
                                                                        <Tooltip placement="bottomRight" title={'Delete'}>
                                                                            <Button type="link" danger shape="circle" icon={<DeleteOutlined />} size="small" />
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </>
                                                    ))}

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

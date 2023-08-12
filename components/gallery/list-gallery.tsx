/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import Swal from 'sweetalert2';
import { UseFormRegister } from 'react-hook-form'
import { GalleryModel } from '@/types/gallery';
import { Avatar, Button, Tooltip } from 'antd';
import { CommentOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FieldTimeOutlined, FundOutlined, LikeOutlined } from '@ant-design/icons';
import { DeleteOneGalleryAPI, getOneFileGalleryAPI } from '@/api/gallery';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { CreateOrUpdateGallery } from './create-or-update-gallery';
import ReactPlayer from 'react-player'


type Props = {
    item?: GalleryModel;
    index: number;
}

const ListGallery: React.FC<Props> = ({ item, index }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const saveMutation = DeleteOneGalleryAPI({
        onSuccess: () => { },
        onError: (error?: any) => { },
    });

    const deleteItem = (item: any) => {

        Swal.fire({
            title: 'Delete?',
            text: 'Are you sure you want to delete this?',
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            confirmButtonColor: '#573DDB',
            cancelButtonColor: '#BEC1C5',
            showCancelButton: true,
            reverseButtons: true,
        }).then(async (result) => {
            if (result.value) {
                //Envoyer la requet au serve
                try {
                    await saveMutation.mutateAsync({ galleryId: item?.id });
                    AlertSuccessNotification({
                        text: "Image deleted successfully",
                        className: "info",
                        gravity: "top",
                        position: "center",
                    });
                } catch (error: any) {
                    AlertDangerNotification({
                        text: `${error.response.data.message}`,
                        gravity: "top",
                        className: "info",
                        position: "center",
                    });
                }
            }
        });

    }

    return (
        <>
            <div key={index} className="py-5 divide-y divide-gray-200">
                <div className="flex items-center">
                    <div className="relative flex-shrink-0 cursor-pointer">
                        <Avatar size={150} shape="square" src={getOneFileGalleryAPI(String(item?.path))} alt={item?.title} />
                    </div>

                    <div className="flex-1 min-w-0 ml-4 cursor-pointer">
                        <p className="mt-4 text-sm font-medium text-gray-500"><FieldTimeOutlined /> {formateDateDayjs(item?.createdAt as Date)}</p>
                        <p className="mt-4 text-sm font-medium text-gray-500"><LikeOutlined /> 0</p>
                        <p className="mt-4 text-sm font-medium text-gray-500"><CommentOutlined /> 0</p>
                        <p className="mt-4 text-sm font-medium text-gray-500"><FundOutlined /> {item?.whoCanSee}</p>
                    </div>

                    {/* <div className="flex-1 min-w-0 ml-4 cursor-pointer">
                                                                            <p className="text-sm font-medium text-gray-500">200 <LikeOutlined /></p>
                                                                            <p className="mt-20 text-sm font-medium text-gray-500">150 <CommentOutlined /></p>
                                                                        </div> */}

                    <div className="py-4 text-sm font-medium text-right text-gray-900">
                        <Tooltip placement="bottomRight" title={'View'}>
                            <Button type="text" shape="circle" icon={<EyeOutlined />} size="small" />
                        </Tooltip>
                        <Tooltip placement="bottomRight" title={'Edit'}>
                            <Button type="link" onClick={() => setOpenModal(true)} shape="circle" icon={<EditOutlined />} size="small" />
                        </Tooltip>
                        <Tooltip placement="bottomRight" title={'Delete'}>
                            <Button type="link" onClick={() => deleteItem(item)} danger shape="circle" icon={<DeleteOutlined />} size="small" />
                        </Tooltip>
                    </div>
                </div>
            </div>

            {openModal && (<CreateOrUpdateGallery
                gallery={item}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />)}
        </>
    )
}

export default ListGallery
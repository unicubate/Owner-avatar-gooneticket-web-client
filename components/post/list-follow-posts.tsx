/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import Swal from 'sweetalert2';
import { Avatar, Button, Image, Tooltip } from 'antd';
import { CommentOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FieldTimeOutlined, FundOutlined, HeartOutlined, LikeOutlined } from '@ant-design/icons';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';

import { PostModel } from '@/types/post';
import Link from 'next/link';
import { ButtonInput } from '../templates/button-input';
import { TextAreaInput } from '../util/form';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { usePathname } from 'next/navigation';
import { arrayComments } from '../mock';

type Props = {
    item?: PostModel;
    index: number;
}

const schema = yup.object({
    description: yup.string().required(),
});


const ListFollowPosts: React.FC<Props> = ({ item, index }) => {
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

    // const saveMutation = DeleteOnePostAPI({
    //     onSuccess: () => { },
    //     onError: (error?: any) => { },
    // });

    // const deleteItem = (item: any) => {

    //     Swal.fire({
    //         title: 'Delete?',
    //         text: 'Are you sure you want to delete this?',
    //         confirmButtonText: 'Yes, Deleted',
    //         cancelButtonText: 'No, Cancel',
    //         confirmButtonColor: '#573DDB',
    //         cancelButtonColor: '#BEC1C5',
    //         showCancelButton: true,
    //         reverseButtons: true,
    //     }).then(async (result) => {
    //         if (result.value) {
    //             //Envoyer la requet au serve
    //             try {
    //                 await saveMutation.mutateAsync({ postId: item?.id });
    //                 AlertSuccessNotification({
    //                     text: "Image deleted successfully",
    //                     className: "info",
    //                     gravity: "top",
    //                     position: "center",
    //                 });
    //             } catch (error: any) {
    //                 AlertDangerNotification({
    //                     text: `${error.response.data.message}`,
    //                     gravity: "top",
    //                     className: "info",
    //                     position: "center",
    //                 });
    //             }
    //         }
    //     });

    // }

    return (
        <>
            <div key={index} className="mt-8 max-w-2xl mx-auto overflow-hidden bg-white shadow-2xl shadow-gray-300/50">

                <div className="p-8 sm:py-10 sm:px-12">
                    <div className="flex items-center">
                        <div className="relative flex-shrink-0">
                            <Avatar size={40} className="object-cover w-10 h-10 rounded-full" src="https://picsum.photos/seed/bXJsaR0Ga/640/480" alt="" />
                        </div>

                        <div className="ml-4">
                            <p className="text-sm font-bold text-gray-900">Rareblocks</p>
                            <p className="mt-1 text-sm font-medium text-gray-500">18 nov. 2022 à 16:57</p>
                        </div>

                        <div className="ml-auto">
                            <p className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"> Private </p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Image
                            width="100%"
                            height="100%"
                            preview={true}
                            src="https://picsum.photos/seed/qiPtavBwFF/640/480"
                            placeholder={
                                <Image
                                    preview={true}
                                    src="https://picsum.photos/seed/qiPtavBwFF/640/480"
                                    width={200}
                                />
                            }
                        />
                    </div>


                    <h3 className="mt-4 text-xl font-bold text-gray-900">Join 2100+ others & get 10 reports every month</h3>
                    <p className="mt-4 text-base font-normal text-gray-500">
                        {`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`}
                    </p>



                    <ul className="mt-4 divide-y divide-gray-200 -my-9">

                        {comments.map((item, index) => (
                            <li key={index} className="py-4">
                                <div className="flex items-start">
                                    <Avatar size={40} className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10" src={item?.image} alt="" />

                                    <div className="ml-6">
                                        <div className="flex items-center space-x-px">
                                            <div className="flex items-center">
                                                <p className="text-sm font-bold text-gray-900"> {item?.firstName} {item?.lastName} </p>
                                                <p className="ml-3.5 text-sm font-normal text-gray-500"> {item?.createdAt}</p>
                                            </div>

                                        </div>
                                        <p className="mt-2 text-base font-normal leading-7 text-gray-900"> {item?.description} </p>
                                        <div className="flex mt-2 items-center">
                                            <p className="text-sm font-bold "><HeartOutlined /></p>
                                            <p className="ml-3.5 text-sm font-bold text-gray-900"><CommentOutlined /></p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}

                    </ul>


                    <div className="flex flex-col justify-between items-center">
                        <label
                            htmlFor="password"
                            className="block text-sm mb-2 dark:text-white"
                        ></label>
                        <Link
                            className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                            href="/forgot-password"
                        >
                            Load more
                        </Link>
                    </div>


                    <form action="#" method="POST" >
                        <div className="mt-12 space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:items-end">
                            <div className="flex items-start">
                                <Avatar size={40} className="flex-shrink-0 bg-gray-300 rounded-full w-10 h-10" src="https://picsum.photos/seed/NLHCIy/640/480" alt="" />
                            </div>
                            <TextAreaInput
                                row={1}
                                control={control}
                                name="description"
                                placeholder="Participate in the conversation"
                                errors={errors}
                            />

                            <div className="sm:flex flex-col sm:items-end sm:justify-between">
                                <ButtonInput
                                    shape="default"
                                    type="submit"
                                    size="large"
                                    loading={false}
                                    color={'indigo'}
                                >
                                    Save
                                </ButtonInput>
                            </div>
                        </div>
                    </form>
                </div>


            </div>
        </>
    )
}

export default ListFollowPosts
import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ReactQuillInput, TextAreaInput, TextInput, TextInputPassword } from '../util/form';
import { ButtonInput } from '../templates/button-input';
import { SelectSearchInput } from '../util/form/select-search-input';
import { PostFormModel, arrayWhoCanSees } from '@/types/post';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { CreateOrUpdateOnePostAPI, getOneFilePostAPI } from '@/api/post';
import { Avatar, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type Props = {
    postId?: string
    post?: any
}

const schema = yup.object({
    title: yup.string().required(),
    description: yup.string().min(10, 'minimum 3 symbols').required(),
    // newPassword: yup.string().optional(),
    // confirmPassword: yup.string().optional(),
});

const CreateOrUpdateFormAudioPost: React.FC<Props> = ({ postId, post }) => {
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
        undefined
    );
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });


    useEffect(() => {
        if (post) {
            const fields = ['title', 'description', 'whoCanSee', 'type'];
            fields?.forEach((field: any) => setValue(field, post[field]));
        }
    }, [post, postId, setValue]);

    // Create or Update data
    const saveMutation = CreateOrUpdateOnePostAPI({
        onSuccess: () => {
            setHasErrors(false);
            setLoading(false);
        },
        onError: (error?: any) => {
            setHasErrors(true);
            setHasErrors(error.response.data.message);
        },
    });

    const onSubmit: SubmitHandler<PostFormModel> = async (
        payload: PostFormModel
    ) => {
        setLoading(true);
        setHasErrors(undefined);
        try {
            await saveMutation.mutateAsync({
                ...payload, postId: post?.id
            });
            setHasErrors(false);
            setLoading(false);
            AlertSuccessNotification({
                text: "Image save successfully",
                className: "info",
                gravity: "top",
                position: "center",
            });
        } catch (error: any) {
            setHasErrors(true);
            setLoading(false);
            setHasErrors(error.response.data.message);
            AlertDangerNotification({
                text: `${error.response.data.message}`,
                gravity: "top",
                className: "info",
                position: "center",
            });
        }
    };

    return (
        <>
            <div className="border-gray-200 mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="flow-root">

                        <div className="overflow-hidden bg-white border border-gray-200">
                            <div className="px-4 py-5">

                                {post?.image ? <div className="mt-2 text-center space-x-2">
                                    <Avatar size={200} shape="square" src={getOneFilePostAPI(String(post?.image))} alt={post?.title} />
                                </div> : null}


                                <div className="mb-4">

                                    <Controller
                                        name="attachment"
                                        control={control}
                                        render={({ field: { onChange } }) => (
                                            <>
                                                <div className="text-center justify-center mx-auto">
                                                    <Upload
                                                        name="attachment"
                                                        listType="picture"
                                                        maxCount={1}
                                                        className="upload-list-inline"
                                                        onChange={onChange}
                                                        accept=".mp3"
                                                    >
                                                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                                    </Upload>
                                                </div>
                                            </>
                                        )}
                                    />
                                    {/* {errors?.attachment && (
                                        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors?.attachment?.message}
                                        </span>
                                    )} */}
                                </div>

                                <div className="mb-4">
                                    <TextInput
                                        control={control}
                                        label="Title"
                                        type="text"
                                        name="title"
                                        required
                                        placeholder="Title"
                                        errors={errors}
                                    />
                                </div>


                                <div className="mb-4">
                                    <SelectSearchInput
                                        firstOptionName="Choose who can see this post?"
                                        label="Who can see this post?"
                                        control={control}
                                        errors={errors}
                                        placeholder="Select who can see this post?"
                                        valueType="text"
                                        name="whoCanSee"
                                        dataItem={arrayWhoCanSees}
                                    />
                                </div>

                                <div className="mb-4">
                                    <TextAreaInput
                                        control={control}
                                        label="Description"
                                        name="description"
                                        placeholder="Write description"
                                        errors={errors}
                                    />
                                </div>


                                <div className="sm:flex flex-col sm:items-end sm:justify-between">
                                    <div className="mt-4">
                                        <ButtonInput shape="default" type="submit" size="large" loading={loading} color={'indigo'}>
                                            {post?.id ? `Update changes` : `Create post`}
                                        </ButtonInput>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>


                </form>
            </div>


        </>
    )
}

export { CreateOrUpdateFormAudioPost }
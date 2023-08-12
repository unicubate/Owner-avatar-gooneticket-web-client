import { NumberInput, TextAreaInput, TextInput } from '../util/form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CloseOutlined, InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ButtonInput } from '../templates/button-input';
import { Alert, Avatar, Button, Checkbox, Upload, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import { SelectSearchInput } from '../util/form/select-search-input';
import { RcFile } from 'antd/es/upload';
import { GalleryFormModel } from '@/types/gallery';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils/alert-notification';
import { CreateOrUpdateOneGalleryAPI, getOneFileGalleryAPI } from '@/api/gallery';

const { Dragger } = Upload;

const schema = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    whoCanSee: yup.string().required(),
    allowDownload: yup.string().optional(),
});

type Props = {
    openModal: boolean,
    setOpenModal: any,
    gallery?: any
}

const CreateOrUpdateGallery: React.FC<Props> = ({ openModal, setOpenModal, gallery }) => {
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
        if (gallery) {
            const fields = ['title', 'description', 'whoCanSee', 'allowDownload'];
            fields?.forEach((field: any) => setValue(field, gallery[field]));
        }
    }, [gallery, setValue]);


    // Create or Update data
    const saveMutation = CreateOrUpdateOneGalleryAPI({
        onSuccess: () => {
            setHasErrors(false);
            setLoading(false);
        },
        onError: (error?: any) => {
            setHasErrors(true);
            setHasErrors(error.response.data.message);
        },
    });

    const onSubmit: SubmitHandler<GalleryFormModel> = async (
        payload: GalleryFormModel
    ) => {
        setLoading(true);
        setHasErrors(undefined);
        try {
            await saveMutation.mutateAsync({
                ...payload, galleryId: gallery?.id
            });
            setHasErrors(false);
            setLoading(false);
            AlertSuccessNotification({
                text: "Image save successfully",
                className: "info",
                gravity: "top",
                position: "center",
            });
            setOpenModal(false)
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
            {openModal ? (
                <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
                    <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                    <div className="w-full  max-w-xl p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setOpenModal(false)}
                        >
                            <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                                <CloseOutlined />
                            </span>
                        </button>
                        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2 flex-auto justify-center">

                                {hasErrors ?
                                    <div className="mb-4">
                                        <Alert message={hasErrors} type="error" showIcon />
                                    </div>
                                    : null}





                                {gallery?.path ? <div className="mt-2 text-center space-x-2">

                                    <Avatar size={200} shape="square" src={getOneFileGalleryAPI(String(gallery?.path))} alt={gallery?.title} />

                                </div> :
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
                                                            // accept=".png,.jpg"
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
                                    </div>}


                                <div className="mb-4">
                                    <TextInput
                                        control={control}
                                        label="Title"
                                        type="text"
                                        name="title"
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
                                        dataItem={[
                                            { name: "PUBLIC" },
                                            { name: "MEMBERSHIP" },
                                            { name: "PRIVATE" },
                                        ]}
                                    />
                                </div>
                                <div className="mb-4">
                                    <Controller
                                        name="allowDownload"
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <div className="flex">
                                                        <Checkbox checked={value} onChange={onChange} />
                                                    </div>
                                                    <div className="ml-3">
                                                        <label
                                                            htmlFor="allowDownload"
                                                            className="text-sm text-gray-700 font-bold"
                                                        >
                                                            Allow download in original quality
                                                        </label>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="mb-4">
                                    <TextAreaInput
                                        control={control}
                                        label="Description"
                                        name="description"
                                        placeholder="Description"
                                        errors={errors}
                                    />
                                </div>
                            </div>
                            <div className="mt-2 text-center space-x-2">
                                <ButtonInput shape="default" type="submit" size="large" loading={loading} color={'indigo'}>
                                    Save
                                </ButtonInput>
                            </div>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export { CreateOrUpdateGallery }
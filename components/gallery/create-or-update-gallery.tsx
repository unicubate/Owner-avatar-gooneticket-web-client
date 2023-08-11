import { NumberInput, TextAreaInput, TextInput } from '../util/form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { CloseOutlined, InboxOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { ButtonInput } from '../templates/button-input';
import { Button, Upload, UploadFile } from 'antd';
import { useState } from 'react';
import { SelectSearchInput } from '../util/form/select-search-input';
import { RcFile } from 'antd/es/upload';
import { GalleryFormModel } from '@/types/gallery';
import { AlertDangerNotification } from '@/utils/alert-notification';
import { CreateOneGalleryAPI } from '@/api/gallery';

const { Dragger } = Upload;

const schema = yup.object({
    title: yup.string().optional(),
    description: yup.string().optional(),
    whoCanSee: yup.string().required(),
});



const CreateOrUpdateGallery: React.FC<{ showModal: boolean, setShowModal: any }> = ({ showModal, setShowModal }) => {
    const [loading, setLoading] = useState(false);
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
        undefined
    );
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });


    const saveMutation = CreateOneGalleryAPI({
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
                ...payload,
            });
            setHasErrors(false);
            setLoading(false);
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
            {showModal ? (
                <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
                    <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                    <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white">
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                                <CloseOutlined />
                            </span>
                        </button>
                        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2 flex-auto justify-center">
                                {/* <div className="font-regular text-center relative mb-4 block w-full rounded-lg bg-red-500 p-4 text-base leading-5 text-white opacity-100">
                                    Error message save to de db je me demande ou je suis merde
                                </div> */}

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
                                                        accept=".png,.jpg"
                                                    >
                                                       <Button icon={<UploadOutlined />}>Upload</Button>
                                                    </Upload>
                                                </div>
                                            </>
                                        )}
                                    />
                                </div>
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
                                            { name: "PUBLIC", code: "PUBLIC" },
                                            { name: "MEMBERSHIP", code: "MEMBERSHIP" },
                                            { name: "PRIVATE", code: "PRIVATE" },
                                        ]}
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
                                <ButtonInput shape="default" type="submit" size="normal" loading={loading} color={'indigo'}>
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
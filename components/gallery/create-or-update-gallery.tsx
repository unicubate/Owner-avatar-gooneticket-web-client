import { TextInput } from "../util/form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ButtonInput } from "../templates/button-input";
import { Alert, Avatar, Checkbox, Upload, UploadFile, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { SelectSearchInput } from "../util/form/select-search-input";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { PostFormModel, arrayWhoCanSees } from "@/types/post";
import {
  CreateOrUpdateOnePostGalleryAPI,
} from "@/api/post";
import { TextareaReactQuillInput } from "../util/form/textarea-react-quill-input";
import { filterImageAndFile } from "@/utils/utils";
import { viewOneFileUploadAPI } from "@/api/upload";

const { Dragger } = Upload;

const schema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  whoCanSee: yup.string().required(),
  allowDownload: yup.string().optional(),
});

type Props = {
  openModal: boolean;
  setOpenModal: any;
  uploadImages?: any;
  post?: any;
};

const CreateOrUpdateGallery: React.FC<Props> = ({
  openModal,
  setOpenModal,
  uploadImages,
  post,
}) => {
  const [loading, setLoading] = useState(false);

  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);
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
      const fields = [
        "title",
        "description",
        "whoCanSee",
        "type",
        "allowDownload",
      ];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, setValue]);

  // Create or Update data
  const saveMutation = CreateOrUpdateOnePostGalleryAPI({
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
    data: PostFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {

      const { newImageLists } = filterImageAndFile({
        imageList,
      });
      const payload = {
        ...data,
        imageList,
        newImageLists,
      };

      await saveMutation.mutateAsync({
        ...payload,
        postId: post?.id,
        type: "GALLERY",
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Post save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      setOpenModal(false);
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

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  return (
    <>
      {openModal ? (
        <>
          <div className="z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
            <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
              <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
              <div className="w-full overflow-hidden border-none max-w-2xl p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white overflow-x-hidden max-h-full flex flex-col pointer-events-auto bg-clip-padding outline-none text-current">
                <div className="flex flex-shrink-0 items-center justify-between p-4 border-gray-200 rounded-t-md">
                  <h5 className="text-xl font-medium leading-normal text-gray-800">
                    {post?.id ? "Update" : "Create"} Gallery
                  </h5>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setOpenModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                      <CloseOutlined />
                    </span>
                  </button>
                </div>

                <div className="flex-auto overflow-y-auto relative p-4">
                  <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-2 flex-auto justify-center">
                      {hasErrors ? (
                        <div className="mb-4">
                          <Alert message={hasErrors} type="error" showIcon />
                        </div>
                      ) : null}

                      {uploadImages?.length > 0 ? (
                        <div className="mt-2 text-center space-x-2">
                          <Avatar
                            size={200}
                            shape="square"
                            src={viewOneFileUploadAPI({ folder: 'posts', fileName: String(uploadImages[0]?.path) })}
                            alt={post?.title}
                          />
                        </div>
                      ) : (
                        <div className="mt-2">
                          <Controller
                            name="attachmentImages"
                            control={control}
                            render={({ }) => (
                              <>
                                <div className="text-center justify-center mx-auto">
                                  <Upload
                                    multiple
                                    name="attachmentImages"
                                    listType="picture-card"
                                    fileList={imageList}
                                    onChange={handleImageChange}
                                    accept=".png,.jpg,.jpeg"
                                    maxCount={1}
                                  >
                                    {imageList.length >= 1 ? null : (
                                      <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>
                                          Upload cover
                                        </div>
                                      </div>
                                    )}
                                  </Upload>
                                </div>
                              </>
                            )}
                          />
                        </div>
                      )}

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
                          dataItem={arrayWhoCanSees}
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
                                  <Checkbox
                                    checked={value}
                                    onChange={onChange}
                                  />
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
                      <div className="mb-2">
                        <TextareaReactQuillInput
                          control={control}
                          name="description"
                          label="Description"
                          placeholder="Description"
                          errors={errors}
                          className='h-36'
                        />
                      </div>
                    </div>
                    <div className="mt-2 text-center space-x-2">
                      <ButtonInput
                        shape="default"
                        type="submit"
                        size="large"
                        loading={loading}
                        color={"indigo"}
                      >
                        Save
                      </ButtonInput>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export { CreateOrUpdateGallery };

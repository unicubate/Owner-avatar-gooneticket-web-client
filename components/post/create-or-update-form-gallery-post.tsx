import { GetAllCategoriesAPI } from '@/api-site/category';
import { CreateOrUpdateOnePostGalleryAPI } from '@/api-site/post';
import { PostFormModel, arrayWhoCanSees } from '@/types/post';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { filterImageAndFile } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Alert, Upload, UploadFile, UploadProps } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { TextareaReactQuillInput } from '../ui-setting';
import { SwitchInput } from '../ui-setting/ant';
import { ButtonInput } from '../ui-setting/button-input';
import { SelectInput, TextInput } from '../ui-setting/shadcn';

const { Dragger } = Upload;

const schema = yup.object({
  title: yup.string().optional(),
  description: yup.string().optional(),
  whoCanSee: yup.string().required('who can see is a required field'),
  allowDownload: yup.string().optional(),
});

type Props = {
  postId?: string;
  albumId?: string;
  uploadImages?: any;
  post?: any;
  refetch?: any;
  organizationId: string;
};

const CreateOrUpdateFormGalleryPost = ({
  uploadImages,
  post,
  refetch,
  organizationId,
  postId,
  albumId,
}: Props) => {
  const { push, back } = useRouter();

  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);
  const {
    watch,
    control,
    setValue,
    handleSubmit,
    errors,
    loading,
    setLoading,
    hasErrors,
    setHasErrors,
  } = useReactHookForm({ schema });

  const { data: categories } = GetAllCategoriesAPI({
    isPaginate: 'false',
    organizationId,
    sort: 'DESC',
    take: 100,
  });

  useEffect(() => {
    if (post) {
      const fields = [
        'title',
        'description',
        'whoCanSee',
        'type',
        'categoryId',
        'allowDownload',
      ];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, postId, setValue]);

  // Create or Update data
  const { mutateAsync } = CreateOrUpdateOnePostGalleryAPI({
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
    data: PostFormModel,
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

      await mutateAsync({
        ...payload,
        albumId,
        postId: post?.id,
        type: 'GALLERY',
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: 'Post save successfully',
      });
      if (post?.id) {
        refetch();
      } else {
        push(`/gallery`);
      }
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  const handleImageChange: UploadProps['onChange'] = ({ fileList }) =>
    setImageList(fileList);

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div
              className={`overflow-hidden rounded-lg border  border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]`}
            >
              <div className="px-4 py-5">
                <h2 className="font-bold dark:text-white">
                  {post?.id ? 'Update' : 'Create a new'} gallery
                </h2>

                <div className="flex-auto justify-center p-2">
                  {hasErrors ? (
                    <div className="mb-4">
                      <Alert message={hasErrors} type="error" showIcon />
                    </div>
                  ) : null}

                  {post?.id && uploadImages?.length > 0 ? (
                    <div className="mt-2 space-x-2 text-center">
                      <ListCarouselUpload
                        uploads={post?.uploadsImage}
                        folder="posts"
                        preview={false}
                        height="300px"
                        width="100%"
                      />
                    </div>
                  ) : null}

                  {!postId ? (
                    <div className="mb-4">
                      <Controller
                        name="attachmentImages"
                        control={control}
                        render={({}) => (
                          <>
                            <div className="mx-auto justify-center text-center">
                              <Upload
                                multiple
                                name="attachmentImages"
                                listType="picture-card"
                                fileList={imageList}
                                onChange={handleImageChange}
                                accept=".png,.jpg,.jpeg,.gif"
                                maxCount={10}
                              >
                                {imageList.length >= 10 ? null : (
                                  <div className="text-center dark:text-white">
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>
                                      Upload image
                                    </div>
                                  </div>
                                )}
                              </Upload>
                            </div>
                          </>
                        )}
                      />
                    </div>
                  ) : null}

                  <div className="mt-4">
                    <TextInput
                      control={control}
                      label="Title"
                      type="text"
                      name="title"
                      placeholder="Title"
                      errors={errors}
                    />
                  </div>
                  <div className="mt-4">
                    <SelectInput
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

                  <div className="mt-4">
                    <SelectInput
                      firstOptionName="Choose category post"
                      label="Category post"
                      control={control}
                      errors={errors}
                      placeholder="Select category post"
                      valueType="key"
                      name="categoryId"
                      allowClear={true}
                      dataItem={categories}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-400">
                        {`Categories makes it easy to browse your posts.`}
                      </span>
                      <label className="mb-2 block text-sm dark:text-white"></label>
                      <Link
                        className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                        href="/shop/config"
                      >
                        Setting category
                      </Link>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5">
                    <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold dark:text-white">
                            {' '}
                            Allow download{' '}
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-500">
                            allow everyone to download in original quality file
                          </p>
                        </div>
                      </div>

                      <SwitchInput
                        control={control}
                        name="allowDownload"
                        label=""
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <TextareaReactQuillInput
                      control={control}
                      name="description"
                      label="Description (optional)"
                      placeholder="description"
                      errors={errors}
                      className="h-36"
                    />
                  </div>

                  <div className="my-4 flex items-center space-x-4">
                    <ButtonInput
                      type="button"
                      className="w-full"
                      size="lg"
                      variant="outline"
                      onClick={() => back()}
                    >
                      Cancel
                    </ButtonInput>
                    <ButtonInput
                      type="submit"
                      className="w-full"
                      size="lg"
                      variant="info"
                      loading={loading}
                    >
                      Save and Publish
                    </ButtonInput>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormGalleryPost };

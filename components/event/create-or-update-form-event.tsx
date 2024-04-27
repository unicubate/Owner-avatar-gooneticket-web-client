import { CreateOrUpdateOneProductAPI } from '@/api-site/product';
import { GetAllCountiesAPI } from '@/api-site/profile';
import { ProductFormModel, arrayProductTypes } from '@/types/product';
import { formateYYDDMM } from '@/utils';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { filterImageAndFile } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { useInputState, useUploadItem } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, ReactQuillInput } from '../ui-setting';
import { DateInput, SelectSearchInput, SwitchInput, TimePickerInput } from '../ui-setting/ant';
import { SelectInput, TextAreaInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';

const { Dragger } = Upload;

type Props = {
  product?: any;
  uploadImages?: any;
  uploadFiles?: any;
  refetch?: any;
  categories: any
};

const schema = yup.object({
  title: yup.string().required(),
  urlMedia: yup.string().url().nullable(),
  price: yup.number().required(),
  messageAfterPayment: yup.string().nullable(),
  description: yup.string().nullable(),
  productType: yup.string().required(),
  enableVisibility: yup.boolean().required(),
  address: yup.string().required('address is a required field'),
  city: yup.string().required('state is a required field'),
  timeInit: yup.string().required('time start is a required field'),
  timeEnd: yup.string().required('time end is a required field'),
  expiredAt: yup.date().min(new Date()).required('data is a required field'),
  countryId: yup.string().required('country is a required field'),
});

const CreateOrUpdateFormEvent = ({
  product,
  uploadImages,
  uploadFiles,
  refetch,
  categories,
}: Props) => {
  const { locale, userStorage } = useInputState();
  const { push, back } = useRouter();
  const { fileList, imageList, handleImageChange, handleFileChange } =
    useUploadItem({ uploadFiles, uploadImages });

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

  const { data: countries } = GetAllCountiesAPI();

  const watchPrice = watch('price', '');
  const watchEnableVisibility = watch('enableVisibility', true);


  useEffect(() => {
    if (product) {
      const fields = [
        'title',
        'price',
        'urlMedia',
        'whoCanSee',
        'productType',
        'limitSlot',
        'model',
        'enableVisibility',
        'description',
        'moreDescription',
        'enableChooseQuantity',
        'urlRedirect',
        'discountId',
        'categoryId',
        'address',
        'city',
        'timeInit',
        'timeEnd',
        'countryId',
        'expiredAt',
        'messageAfterPayment',
      ];
      fields?.forEach((field: any) => setValue(field, product[field]));
    }
  }, [product, uploadFiles, uploadImages, setValue]);

  const { mutateAsync: saveMutation } = CreateOrUpdateOneProductAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<ProductFormModel> = async (
    data: ProductFormModel,
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { newFileLists, newImageLists } = filterImageAndFile({
        fileList,
        imageList,
      });

      const payload = {
        ...data,
        imageList,
        newFileLists,
        fileList,
        newImageLists,
      };
      await saveMutation({
        ...payload,
        model: 'EVENT',
        productId: product?.id,
      });
      if (product?.id) {
        refetch();
      } else {
        push(`/events/extras`);
      }
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Event save successfully`,
      });
    } catch (error: any) {
      setHasErrors(true);
      setLoading(false);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold dark:text-white">
              Create a New Product
            </h2>

            <div className="mt-2">
              <TextInput
                label="Title"
                control={control}
                type="text"
                name="title"
                placeholder="Title"
                errors={errors}
              />
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-4">
              <div className="mt-2">
                <SelectSearchInput
                  label="Counties"
                  firstOptionName="Country"
                  valueType="key"
                  control={control}
                  errors={errors}
                  placeholder="Country"
                  name="countryId"
                  dataItem={countries}
                />
              </div>
              <div className="mt-2">
                <DateInput
                  label="Date event"
                  control={control}
                  placeholder={formateYYDDMM(new Date(), locale)}
                  name="expiredAt"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TimePickerInput
                  label="Timer init"
                  control={control}
                  name="timeInit"
                  errors={errors}
                />
              </div>
              <div className="mt-2">
                <TimePickerInput
                  label="Timer End"
                  control={control}
                  name="timeEnd"
                  errors={errors}
                />
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
              <div className="mt-2">
                <SelectInput
                  firstOptionName="Choose type selling?"
                  label="Type selling"
                  control={control}
                  errors={errors}
                  placeholder="DIGITAL"
                  valueType="text"
                  name="productType"
                  dataItem={arrayProductTypes}
                />
              </div>
              <div className="mt-2">
                <TextInput
                  label="City"
                  control={control}
                  type="text"
                  name="city"
                  placeholder="City"
                  errors={errors}
                />
              </div>
            </div>
            <div className="mt-4">
              <TextInput
                label="Address"
                control={control}
                type="text"
                name="address"
                placeholder="Address"
                errors={errors}
              />
            </div>

            <div className="mt-4 py-2">
              <div className="mx-auto max-w-max">
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
                      <div style={{ marginTop: 8 }}>Upload cover</div>
                    </div>
                  )}
                </Upload>
              </div>
            </div>

            <div className="mt-2">
              <TextInput
                control={control}
                label="Price*"
                name="price"
                placeholder="Price"
                errors={errors}
                required
                type="number"
                pattern="[0-9]*"
                labelHelp={
                  <Label className="ml-auto block text-start text-lg font-bold dark:text-white">
                    {watchPrice ? watchPrice : null} {userStorage?.profile?.currency?.code}
                  </Label>
                }
              />
            </div>
            <div className="mt-2">
              <ReactQuillInput
                control={control}
                label="Description"
                name="description"
                placeholder="Write description"
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`Provide a full description of the item that you are selling.`}
              </span>
            </div>

            <div className="mt-2">
              <TextInput
                label="Embed Media (optional)"
                control={control}
                type="text"
                name="urlMedia"
                placeholder="e.g. https://youtube.com/watch?v=abc123"
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`Add a preview video, audio or other content to showcase your event to potential buyers`}
              </span>
            </div>

            <div className="mt-2">
              <TextAreaInput
                control={control}
                label="Confirmation message"
                name="messageAfterPayment"
                placeholder="Success page confirmation"
                errors={errors}
              />
              <span className="text-sm font-medium text-gray-400">
                {`Buyers will see this message after payment. Use this to thank them, to give instructions or to give rewards.`}
              </span>
            </div>

            <div className="mt-4">
              <SelectInput
                firstOptionName="Choose category"
                label="Category"
                control={control}
                errors={errors}
                placeholder="Select category"
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
                  href="/settings/categories"
                >
                  Setting category
                </Link>
              </div>
            </div>

            {/* <div className="mt-4">
              <SelectInput
                firstOptionName="Choose who can see or buy this product?"
                label="Who can buy this product?"
                control={control}
                errors={errors}
                placeholder="Select who can see or buy this product?"
                valueType="text"
                name="whoCanSee"
                dataItem={arrayWhoCanSees}
              />
            </div> */}

            <div className="mt-4">
              <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
                Advanced settings
              </label>
            </div>

            <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold dark:text-white">
                      Product {watchEnableVisibility ? 'visible' : 'invisible'}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Make the product{' '}
                      {watchEnableVisibility ? 'visible' : 'invisible'} to the
                      public
                    </p>
                  </div>
                </div>

                <SwitchInput
                  control={control}
                  defaultValue={watchEnableVisibility}
                  name="enableVisibility"
                  label=""
                />
              </div>
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
                Save {watchEnableVisibility && 'and Publish'}
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { CreateOrUpdateFormEvent };

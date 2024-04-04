import { GetAllDiscountsAPI } from '@/api-site/discount';
import { CreateOrUpdateOneProductAPI } from '@/api-site/product';
import { ProductFormModel, arrayProductTypes } from '@/types/product';
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from '@/utils/alert-notification';
import { filterImageAndFile } from '@/utils/utils';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { SelectDiscountSearchInput } from '../discount/select-discount-search-input';
import { useUploadItem } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { ButtonInput, ReactQuillInput } from '../ui-setting';
import { SwitchInput } from '../ui-setting/ant';
import { SelectInput, TextAreaInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';
import { useAuth } from '../util/context-user';

const { Dragger } = Upload;

type Props = {
  product?: any;
  uploadImages?: any;
  uploadFiles?: any;
  refetch?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  urlMedia: yup.string().url().nullable(),
  price: yup.number().required(),
  messageAfterPayment: yup.string().nullable(),
  description: yup.string().nullable(),
  productType: yup.string().required(),
  enableVisibility: yup.boolean().required(),
  // whoCanSee: yup
  //   .mixed()
  //   .oneOf([...arrayStringWhoCanSees] as const)
  //   .defined()
  //   .required('Who can see this post'),
  limitSlot: yup.number().when('enableLimitSlot', (enableLimitSlot, schema) => {
    if (enableLimitSlot[0] === true)
      return schema.min(1).required('limit slots required');
    return schema.nullable();
  }),
  urlRedirect: yup
    .string()
    .url()
    .when('enableUrlRedirect', (enableUrlRedirect, schema) => {
      if (enableUrlRedirect[0] === true)
        return schema.min(1).required('url redirect required');
      return schema.nullable();
    }),
  discountId: yup.string().when('enableDiscount', (enableDiscount, schema) => {
    if (enableDiscount[0] === true) return schema.required('discount required');
    return schema.nullable();
  }),
});

const CreateOrUpdateFormShop = ({
  product,
  uploadImages,
  uploadFiles,
  refetch,
}: Props) => {
  const { profile } = useAuth() as any;
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

  const watchPrice = watch('price', '');
  const watchEnableVisibility = watch('enableVisibility', true);
  const watchProductType = watch('productType', 'PHYSICAL');
  const watchEnableDiscount = watch('enableDiscount', false);
  const watchEnableLimitSlot = watch('enableLimitSlot', false);
  const watchEnableUrlRedirect = watch('enableUrlRedirect', false);

  const { data: discounts } = GetAllDiscountsAPI();

  useEffect(() => {
    if (product) {
      const fields = [
        'title',
        'price',
        'urlMedia',
        'whoCanSee',
        'productType',
        'enableLimitSlot',
        'limitSlot',
        'model',
        'enableVisibility',
        'description',
        'moreDescription',
        'enableChooseQuantity',
        'urlRedirect',
        'enableUrlRedirect',
        'enableDiscount',
        'discountId',
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
        model: 'PRODUCT',
        productId: product?.id,
      });
      if (product?.id) {
        refetch();
      } else {
        push(`/shop/extras`);
      }
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Product save successfully`,
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
                label="Name"
                control={control}
                type="text"
                name="title"
                placeholder="Name product"
                errors={errors}
              />
            </div>

            <div className="mt-4">
              <SelectInput
                firstOptionName="Choose type product selling?"
                label="Type product selling"
                control={control}
                errors={errors}
                placeholder="DIGITAL"
                valueType="text"
                name="productType"
                dataItem={arrayProductTypes}
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
                placeholder="Price commission"
                errors={errors}
                required
                type="number"
                pattern="[0-9]*"
                labelHelp={
                  <Label className="ml-auto block text-lg font-bold dark:text-white text-start">
                    {watchPrice ? watchPrice : null} {profile?.currency?.code}
                  </Label>
                }
              />
            </div>

            <div className="mt-2">
              <ReactQuillInput
                control={control}
                label="Description"
                name="description"
                placeholder="Write description product"
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
                {`Add a preview video, audio or other content to showcase your product to potential buyers`}
              </span>
            </div>

            {watchProductType === 'DIGITAL' ? (
              <div className="mt-2 grid-cols-1 gap-x-6 gap-y-5">
                <label className="mb-2 block text-sm font-bold text-gray-700 dark:text-white">
                  Assets
                </label>
                <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                  <div className="flex min-w-0 flex-1 items-center">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">
                        {watchEnableUrlRedirect
                          ? `Upload File`
                          : ` Redirect buyer to URL`}
                      </p>
                      <p className="mt-1 text-sm font-medium text-gray-500">
                        Choose which action to perform after purchase
                      </p>
                    </div>
                  </div>

                  <SwitchInput
                    control={control}
                    name="enableUrlRedirect"
                    label=""
                  />
                </div>

                {watchEnableUrlRedirect ? (
                  <div className="mt-2">
                    <TextInput
                      label="Redirect URL"
                      control={control}
                      type="text"
                      name="urlRedirect"
                      placeholder="URL to redirect your to buyers after purchase"
                      errors={errors}
                    />
                    <span className="text-sm font-medium text-gray-400">
                      {`Provide a publicly available link to the content you are selling.
                      e.g. a Google Drive url, a YouTube video or a Zoom invite.`}
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="mt-4 mx-auto justify-center text-center">
                      <Dragger
                        multiple
                        name="attachmentFiles"
                        listType="picture"
                        className="upload-list-inline dark:text-white"
                        fileList={fileList}
                        onChange={handleFileChange}
                        accept=".png,.jpg,.jpeg,.pdf,.gif,.doc,.docx,.xml,.csv,.mp3,.flac.,.xlx,.xls,.zip,.gif"
                        maxCount={10}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined />
                        </p>
                        <p className="dark:text-white">
                          Click or drag file to this area to upload
                        </p>
                        <p className="dark:text-gray-600">
                          Support for a single or bulk upload. Strictly
                          prohibited from uploading company data or other banned
                          files.
                        </p>
                      </Dragger>
                    </div>
                  </>
                )}
              </div>
            ) : null}

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

              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {' '}
                      Discount
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Apply a discount
                    </p>
                  </div>
                </div>

                <SwitchInput control={control} name="enableDiscount" label="" />
              </div>
              {watchEnableDiscount ? (
                <>
                  <div className="mb-2">
                    <SelectDiscountSearchInput
                      label="Discounts"
                      firstOptionName="Discount"
                      control={control}
                      errors={errors}
                      placeholder="Discount"
                      name="discountId"
                      dataItem={discounts}
                    />
                    <div className="flex items-center justify-between">
                      <label className="mb-2 block text-sm dark:text-white"></label>
                      <Link
                        className="text-sm font-medium text-blue-600 decoration-2 hover:underline"
                        href="/shop/config"
                      >
                        Create discount
                      </Link>
                    </div>
                  </div>
                </>
              ) : null}

              {/* <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold dark:text-white">
                      {' '}
                      Limit slots (optional){' '}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      A limited number of slots creates a sense of urgency and
                      also saves you from burn-out.
                    </p>
                  </div>
                </div>

                <SwitchInput
                  control={control}
                  name="enableLimitSlot"
                  label=""
                />
              </div>
              {watchEnableLimitSlot ? (
                <div className="mb-1">
                  <TextInput
                    label=""
                    control={control}
                    type="number"
                    name="limitSlot"
                    placeholder="10"
                    errors={errors}
                    required
                  />
                </div>
              ) : null}

              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold dark:text-white">
                      {' '}
                      Special price for members{' '}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Offer a discounted extra price to attract new members and
                      to keep your current members engaged.
                    </p>
                  </div>
                </div>

                <SwitchInput
                  control={control}
                  name="allowChooseInventory"
                  label=""
                />
              </div>
              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold dark:text-white">
                      {' '}
                      Allow buyer to choose a quantity{' '}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Your supporters will be able to select the desired
                      quantity of this item. You will receive payment based on
                      the quantity they choose multiplied by your set price.
                    </p>
                  </div>
                </div>

                <SwitchInput
                  control={control}
                  name="enableChooseQuantity"
                  label=""
                />
              </div> */}
            </div>

            {/* <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-4">
                <Controller
                  name="confirm"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <div className="flex items-center">
                        <Checkbox checked={value} onChange={onChange} />
                        <div className="ml-3">
                          <label
                            htmlFor="remember-me"
                            className="text-sm text-gray-700 font-bold"
                          >
                            {`I created the original designs for this item and it doesn't contain any `}{" "}
                            <button
                              type="button"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              copyrighted, illegal, adult or prohibited
                            </button>
                            {""}
                            content
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                />
                {errors?.confirm && (
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {errors?.confirm?.message}
                  </span>
                )}
              </div>
            </div> */}

            {/* <div className="mt-4">
              <ButtonInput
                type="submit"
                className="w-full"
                size="lg"
                variant="info"
                loading={loading}
              >
                Save and Publish
              </ButtonInput>
            </div> */}
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

export { CreateOrUpdateFormShop };

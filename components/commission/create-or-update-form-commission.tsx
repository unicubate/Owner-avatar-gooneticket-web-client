import { GetAllDiscountsAPI } from '@/api-site/discount';
import { CreateOrUpdateOneProductAPI } from '@/api-site/product';
import { ProductFormModel, arrayProductTypes } from '@/types/product';
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
import { SelectDiscountSearchInput } from '../discount/select-discount-search-input';
import { useInputState, useUploadItem } from '../hooks';
import { useReactHookForm } from '../hooks/use-react-hook-form';
import { TextareaReactQuillInput } from '../ui-setting';
import { SwitchInput } from '../ui-setting/ant/switch-input';
import { ButtonInput } from '../ui-setting/button-input';
import { SelectInput, TextInput } from '../ui-setting/shadcn';
import { Label } from '../ui/label';
import { useAuth } from '../util/context-user';

type Props = {
  product?: any;
  uploadImages?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  urlMedia: yup.string().url().nullable(),
  price: yup.number().required(),
  messageAfterPayment: yup.string().nullable(),
  productType: yup.string().required(),
  enableVisibility: yup.boolean().required(),
  description: yup.string().min(10, 'Minimum 10 symbols').required(),
  limitSlot: yup.number().when('enableLimitSlot', (enableLimitSlot, schema) => {
    if (enableLimitSlot[0] === true)
      return schema.min(1).required('limit slots required');
    return schema.nullable();
  }),
  discountId: yup.string().when('enableDiscount', (enableDiscount, schema) => {
    if (enableDiscount[0] === true) return schema.required('discount required');
    return schema.nullable();
  }),
});

const CreateOrUpdateFormCommission = ({ product, uploadImages }: Props) => {
  const { isOpen, setIsOpen } = useInputState();
  const { profile } = useAuth() as any;
  const { push, back } = useRouter();
  const router = useRouter();
  const { imageList, handleImageChange } = useUploadItem({
    uploadImages,
  });

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
  const watchEnableDiscount = watch('enableDiscount', false);
  const watchEnableLimitSlot = watch('enableLimitSlot', false);

  const { data: discounts } = GetAllDiscountsAPI();

  useEffect(() => {
    if (product) {
      const fields = [
        'title',
        'price',
        'urlMedia',
        'enableVisibility',
        'enableLimitSlot',
        'limitSlot',
        'model',
        'productType',
        'description',
        'enableDiscount',
        'discountId',
        'messageAfterPayment',
      ];
      fields?.forEach((field: any) => setValue(field, product[field]));
    }
  }, [product, setValue]);

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
      const { newImageLists } = filterImageAndFile({ imageList });
      const payload = {
        ...data,
        imageList,
        newImageLists,
      };
      await saveMutation({
        ...payload,
        model: 'COMMISSION',
        whoCanSee: 'PUBLIC',
        productId: product?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Commission save successfully`,
      });
      if (!product?.id) {
        push(`/commissions`);
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

  return (
    <>
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div className="overflow-hidden rounded-lg border  border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
              <div className="px-4 py-5">
                <h2 className="font-bold dark:text-white">
                  {product?.id ? 'Update' : 'Create a new'} commission
                </h2>
                <div className="mt-4">
                  <div className="mb-2">
                    <TextInput
                      label="Name*"
                      control={control}
                      type="text"
                      name="title"
                      placeholder="e.g. black and white sketch"
                      errors={errors}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <TextInput
                    control={control}
                    label="Price*"
                    type="number"
                    name="price"
                    placeholder="Price commission"
                    errors={errors}
                    required
                    pattern="[0-9]*"
                    labelHelp={
                      <Label className="ml-auto block text-lg font-bold dark:text-white text-start">
                        {watchPrice ? watchPrice : null}{' '}
                        {profile?.currency?.code}
                      </Label>
                    }
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
                      accept=".png,.jpg,.jpeg"
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

                <div className="mt-4">
                  <div className="mb-2">
                    <TextareaReactQuillInput
                      control={control}
                      name="description"
                      label="Description"
                      placeholder="Write description"
                      errors={errors}
                      className=""
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {`Describe in detail what buyers will receive when they make a purchase.`}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2">
                    <TextInput
                      label="Embed Media (optional)"
                      control={control}
                      type="text"
                      name="urlMedia"
                      placeholder="e.g. https://youtube.com/watch?v=abc123"
                      errors={errors}
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {`Add a preview video, audio or other content to showcase your product to potential buyers`}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2">
                    <TextareaReactQuillInput
                      control={control}
                      name="messageAfterPayment"
                      label="Thank you message or delivery instructions (optional)"
                      placeholder="Success page confirmation"
                      errors={errors}
                      className=""
                    />
                    <span className="text-sm font-medium text-gray-600">
                      {`Buyers will see this message after payment. Use this to thank them, to give instructions or to give rewards.`}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <SelectInput
                    firstOptionName="Choose call action?"
                    label="Call action"
                    control={control}
                    errors={errors}
                    placeholder="Select call action..."
                    valueType="text"
                    name="callAction"
                    dataItem={[]}
                  />
                </div>

                <div className="mt-4">
                  <SelectInput
                    firstOptionName="Choose type commission selling?"
                    label="Type commission selling"
                    control={control}
                    errors={errors}
                    placeholder="Select type commission selling..."
                    valueType="text"
                    name="productType"
                    dataItem={arrayProductTypes}
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5">
                  <div className="mb-2">
                    <label className="mb-2 block text-sm font-bold dark:text-white">
                      Advanced settings
                    </label>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-5">
                  <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold dark:text-white">
                          Commission{' '}
                          {watchEnableVisibility ? 'visible' : 'invisible'}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Make the Commission{' '}
                          {watchEnableVisibility ? 'visible' : 'invisible'} to
                          the public
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

                    <SwitchInput
                      control={control}
                      name="enableDiscount"
                      label=""
                    />
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
                          <label
                            htmlFor="discountId"
                            className="mb-2 block text-sm dark:dark:text-white"
                          ></label>
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

                  <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                    <div className="flex min-w-0 flex-1 items-center">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold dark:text-white">
                          {' '}
                          Limit slots (optional){' '}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          A limited number of slots creates a sense of urgency
                          and also saves you from burn-out.
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
                          Allow buyer to choose a quantity{' '}
                        </p>
                        <p className="mt-1 text-sm font-medium text-gray-500">
                          Your supporters will be able to select the desired
                          quantity of this item. You will receive payment based
                          on the quantity they choose multiplied by your set
                          price.
                        </p>
                      </div>
                    </div>

                    <SwitchInput
                      control={control}
                      name="enableChooseQuantity"
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
                    Save and Publish
                  </ButtonInput>
                </div>
                <div className="mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    <small>{`(*) These fields are required`}</small>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormCommission };

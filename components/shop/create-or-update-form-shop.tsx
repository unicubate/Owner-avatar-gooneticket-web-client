import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Select,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  NumberInput,
  ReactQuillInput,
  TextAreaInput,
  TextInput,
} from "../util/form";
import { ButtonInput } from "../templates/button-input";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { SwitchInput } from "../util/form/switch-input";
import { ButtonCancelInput } from "../templates/button-cancel-input";
import { ProductFormModel } from "@/types/product";
import { CreateOrUpdateOneProductAPI } from "@/api/product";
import { GetAllDiscountsAPI } from "@/api/discount";
import { SelectDiscountSearchInput } from "../discount/select-discount-search-input";
import Link from "next/link";

const { Option } = Select;

type Props = {
  product?: any;
  uploadImages?: any;
  uploadFiles?: any;
};

const schema = yup.object({
  title: yup.string().required(),
  limitSlot: yup.number().nullable(),
  urlMedia: yup.string().url().nullable(),
  price: yup.number().required(),
  messageAfterPurchase: yup.string().nullable(),
  description: yup.string().nullable(),
  discountId: yup.string().when("isDiscount", (isDiscount, schema) => {
    if (isDiscount[0] === true) return schema.required("discount required");
    return schema.nullable();
  }),
});

const CreateOrUpdateFormShop: React.FC<Props> = ({
  product,
  uploadImages,
  uploadFiles,
}) => {
  const [loading, setLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(
    undefined
  );

  const [fileList, setFileList] = useState<UploadFile[]>(uploadFiles ?? []);
  const [imageList, setImageList] = useState<UploadFile[]>(uploadImages ?? []);

  const {
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const watchIsLimitSlot = watch("isLimitSlot", false);
  const watchEnableDiscount = watch("enableDiscount", false);

  const { data: dataDiscounts } = GetAllDiscountsAPI();
  const discounts: any = dataDiscounts?.data;

  useEffect(() => {
    if (product) {
      const fields = [
        "title",
        "price",
        "urlMedia",
        "isLimitSlot",
        "limitSlot",
        "description",
        "moreDescription",
        "isChooseQuantity",
        "enableDiscount",
        "discountId",
        "messageAfterPurchase",
      ];
      fields?.forEach((field: any) => setValue(field, product[field]));
    }
  }, [product, uploadFiles, uploadImages, setValue]);

  const saveMutation = CreateOrUpdateOneProductAPI({
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
    data: ProductFormModel
  ) => {
    let newFileLists: any = [];
    let newImageLists: any = [];
    setLoading(true);
    setHasErrors(undefined);
    try {
      imageList
        .filter((file: any) => file?.status === "success")
        .forEach((file: any) => {
          newImageLists.push(file);
        });

      fileList
        .filter((file: any) => file?.status === "success")
        .forEach((file: any) => {
          newFileLists.push(file);
        });

      const payload = {
        ...data,
        newImageLists,
        imageList,
        newFileLists,
        fileList,
      };
      await saveMutation.mutateAsync({
        ...payload,
        productId: product?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: `Product save successfully`,
        gravity: "top",
        className: "info",
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

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newImageList,
  }) => setImageList(newImageList);

  const handleFileChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-8 overflow-hidden bg-white border border-gray-200">
          <div className="px-4 py-5">
            <h2 className="text-base font-bold text-gray-900">
              Create a New Product
            </h2>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
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
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mb-2">
                <NumberInput
                  control={control}
                  label="Price"
                  type="number"
                  name="price"
                  placeholder="Price product"
                  errors={errors}
                  required
                  prefix={"€"}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mb-4">
                <Controller
                  name="attachmentImages"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      <div className="text-center justify-center mx-auto">
                        <Upload
                          name="attachmentImages"
                          listType="picture-card"
                          fileList={imageList}
                          onChange={handleImageChange}
                          accept=".png,.jpg,.jpeg"
                          maxCount={10}
                        >
                          {imageList.length >= 10 ? null : (
                            <div>
                              <PlusOutlined />
                              <div style={{ marginTop: 8 }}>Upload</div>
                            </div>
                          )}
                        </Upload>
                      </div>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <ReactQuillInput
                  control={control}
                  label="Description"
                  name="description"
                  placeholder="Write description"
                  errors={errors}
                />
                <span className="text-sm font-medium text-gray-600">
                  {`Provide a full description of the item that you are selling.`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
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

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <Controller
                  name="attachmentFiles"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <>
                      <div className="justify-center mx-auto">
                        <Upload
                          multiple
                          name="attachmentFiles"
                          listType="picture"
                          className="upload-list-inline"
                          fileList={fileList}
                          onChange={handleFileChange}
                          accept=".png,.jpg,.jpeg,.pdf,.gif,.doc,.docx,.xml,.csv,.mp3,.flac"
                        >
                          <Button icon={<UploadOutlined />}>Upload File</Button>
                        </Upload>
                      </div>
                    </>
                  )}
                />
                <span className="text-sm font-medium text-gray-600">
                  {`Upload file for this product`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <TextAreaInput
                  row={3}
                  control={control}
                  label="Confirmation message"
                  name="messageAfterPurchase"
                  placeholder="Success page confirmation"
                  errors={errors}
                />
                <span className="text-sm font-medium text-gray-600">
                  {`Buyers will see this message after payment. Use this to thank them, to give instructions or to give rewards.`}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="mt-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Advanced settings
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900"> Discount</p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Apply a discount
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                  <button
                    type="button"
                    title=""
                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                  >
                    {" "}
                  </button>
                  <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                    <SwitchInput
                      control={control}
                      name="enableDiscount"
                      label=""
                    />
                  </div>
                </div>
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
                    <div className="flex justify-between items-center">
                      <label className="block text-sm mb-2 dark:text-white"></label>
                      <Link
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium"
                        href="/shop/config"
                      >
                        Create discount
                      </Link>
                    </div>
                  </div>
                </>
              ) : null}

              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {" "}
                      Limit slots (optional){" "}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      A limited number of slots creates a sense of urgency and
                      also saves you from burn-out.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                  <button
                    type="button"
                    title=""
                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                  >
                    {" "}
                  </button>
                  <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                    <SwitchInput
                      control={control}
                      name="isLimitSlot"
                      label=""
                    />
                  </div>
                </div>
              </div>
              {watchIsLimitSlot ? (
                <div className="mb-1">
                  <NumberInput
                    control={control}
                    label=""
                    type="number"
                    name="limitSlot"
                    placeholder="10"
                    errors={errors}
                    required
                  />
                </div>
              ) : null}

              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {" "}
                      Special price for members{" "}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Offer a discounted extra price to attract new members and
                      to keep your current members engaged.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                  <button
                    type="button"
                    title=""
                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                  >
                    {" "}
                  </button>
                  <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                    <SwitchInput
                      control={control}
                      name="allowChooseInventory"
                      label=""
                    />
                  </div>
                </div>
              </div>
              <div className="sm:flex sm:items-center sm:justify-between sm:space-x-5">
                <div className="flex items-center flex-1 min-w-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">
                      {" "}
                      Allow buyer to choose a quantity{" "}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Your supporters will be able to select the desired
                      quantity of this item. You will receive payment based on
                      the quantity they choose multiplied by your set price.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 sm:space-x-6 pl-14 sm:pl-0 sm:justify-end sm:mt-0">
                  <button
                    type="button"
                    title=""
                    className="text-sm font-medium text-gray-400 transition-all duration-200 hover:text-gray-900"
                  >
                    {" "}
                  </button>
                  <div className="relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-200 rounded-full cursor-pointer w-11 focus:outline-none">
                    <SwitchInput
                      control={control}
                      name="isChooseQuantity"
                      label=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 mt-2 gap-y-5 gap-x-6">
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
                {/* {errors?.confirm && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.confirm?.message}
              </span>
            )} */}
              </div>
            </div>

            <div className="mt-4">
              <ButtonInput
                shape="default"
                type="submit"
                size="large"
                loading={loading}
                color="indigo"
              >
                Save and Publish
              </ButtonInput>
            </div>
            <div className="flex items-center mt-4 mb-4 space-x-4">
              <ButtonCancelInput shape="default" size="large" loading={loading}>
                Cancel
              </ButtonCancelInput>
              <ButtonInput
                minW="fit"
                shape="default"
                type="submit"
                size="large"
                loading={false}
                color="indigo"
              >
                Save as Draft
              </ButtonInput>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export { CreateOrUpdateFormShop };

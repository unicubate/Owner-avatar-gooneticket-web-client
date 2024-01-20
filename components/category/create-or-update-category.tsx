import { TextAreaInput, TextInput } from "../ui-setting/ant";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { CloseOutlined } from "@ant-design/icons";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { useEffect } from "react";
import { ButtonInput } from "../ui-setting/ant";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { CreateOrUpdateOneCategoryAPI } from "@/api-site/category";
import { CategoryFormModel } from "@/types/category";

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().nullable().optional(),
});

const CreateOrUpdateCategory: React.FC<{
  showModal: boolean;
  setShowModal: any;
  category?: any;
}> = ({ showModal, setShowModal, category }) => {
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

  useEffect(() => {
    if (category) {
      const fields = ["name", "description"];
      fields?.forEach((field: any) => setValue(field, category[field]));
    }
  }, [category, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneCategoryAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<CategoryFormModel> = async (
    payload: CategoryFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      await saveMutation({
        ...payload,
        categoryId: category?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Category save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      setShowModal(false);
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
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-lg rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212]">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setShowModal(false)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <CloseOutlined />
              </span>
            </button>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex-auto justify-center p-2">
                {hasErrors && (
                  <div className="bg-white py-6 dark:bg-[#121212]">
                    <div className="rounded-lg bg-red-100">
                      <div className="p-3">
                        <div className="flex items-center justify-between">
                          <p className="ml-3 text-sm font-medium text-red-500">
                            {hasErrors}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-4">
                  <TextInput
                    control={control}
                    label="Name"
                    type="text"
                    name="name"
                    placeholder="Name donation"
                    errors={errors}
                  />
                </div>
                <div className="mb-2">
                  <TextAreaInput
                    row={3}
                    control={control}
                    label="Description (optional)"
                    name="description"
                    placeholder="description discount"
                    errors={errors}
                  />
                </div>
              </div>
              {/* <div className="mt-2 text-center space-x-2">
                <ButtonInput
                  shape="default"
                  type="submit"
                  size="large"
                  loading={loading}
                  color="indigo"
                >
                  Save
                </ButtonInput>
              </div> */}
              <div className="mt-2 flex items-center space-x-4">
                <ButtonInput
                  status="cancel"
                  type="button"
                  shape="default"
                  size="large"
                  loading={false}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </ButtonInput>
                <ButtonInput
                  minW="fit"
                  shape="default"
                  type="submit"
                  size="large"
                  loading={loading}
                  color="indigo"
                >
                  Save
                </ButtonInput>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreateOrUpdateCategory };

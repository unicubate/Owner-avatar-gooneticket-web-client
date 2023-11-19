import { TextAreaInput, TextInput } from "../ui";
import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { CloseOutlined } from "@ant-design/icons";
import { AlertDangerNotification, AlertSuccessNotification } from "@/utils";
import { useEffect } from "react";
import { ButtonInput } from "../ui";
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
        <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
          <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
          <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white dark:bg-[#121212]">
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setShowModal(false)}
            >
              <span className="text-black dark:text-white opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                <CloseOutlined />
              </span>
            </button>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="p-2 flex-auto justify-center">
                {hasErrors && (
                  <div className="py-6 bg-white dark:bg-[#121212]">
                    <div className="bg-red-100 rounded-lg">
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
              <div className="flex items-center mt-2 space-x-4">
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

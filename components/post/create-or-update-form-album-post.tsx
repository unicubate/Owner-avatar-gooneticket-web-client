import * as yup from "yup";
import { SubmitHandler } from "react-hook-form";
import { ButtonInput } from "../ui/button-input";
import { Alert } from "antd";
import { useEffect } from "react";
import {
  AlertDangerNotification,
  AlertSuccessNotification,
} from "@/utils/alert-notification";
import { useRouter } from "next/router";
import { TextInput, TextareaReactQuillInput } from "../ui";
import { useReactHookForm } from "../hooks/use-react-hook-form";
import { AlbumFormModel } from "@/types/album";
import { CreateOrUpdateOneAlbumAPI } from "@/api-site/album";

const schema = yup.object({
  name: yup.string().required(),
});

type Props = {
  albumId?: string;
  album?: any;
  organizationId: string;
};

const CreateOrUpdateFormAlbumPost: React.FC<Props> = ({
  album,
}) => {
  const { back, push } = useRouter();
  const {
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
    if (album) {
      const fields = ["name", "description"];
      fields?.forEach((field: any) => setValue(field, album[field]));
    }
  }, [album, setValue]);

  // Create or Update data
  const { mutateAsync: saveMutation } = CreateOrUpdateOneAlbumAPI({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false);
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    },
  });

  const onSubmit: SubmitHandler<AlbumFormModel> = async (
    payload: AlbumFormModel
  ) => {
    setLoading(true);
    setHasErrors(undefined);
    try {
      const { data: result } = await saveMutation({
        ...payload,
        albumId: album?.id,
      });
      setHasErrors(false);
      setLoading(false);
      AlertSuccessNotification({
        text: "Album save successfully",
        className: "info",
        gravity: "top",
        position: "center",
      });
      push(`/posts/create?type=gallery&albumId=${result?.id}`);
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
      <div className="mt-4 lg:order-1 lg:col-span-3 xl:col-span-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flow-root">
            <div
              className={`overflow-hidden bg-white dark:bg-[#121212]  border border-gray-200 dark:border-gray-800 rounded-lg`}
            >
              <div className="px-4 py-5">
                <h2 className="text-black dark:text-white font-bold">
                  {album?.id ? "Update" : "Create a new"} album
                </h2>

                <div className="p-2 flex-auto justify-center">
                  {hasErrors ? (
                    <div className="mb-4">
                      <Alert message={hasErrors} type="error" showIcon />
                    </div>
                  ) : null}


                  <div className="mt-4">
                    <TextInput
                      control={control}
                      label="Name"
                      type="text"
                      name="name"
                      placeholder="Name"
                      errors={errors}
                    />
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

                  <div className="flex items-center mt-4 space-x-4">
                    <ButtonInput
                      status="cancel"
                      type="button"
                      shape="default"
                      size="large"
                      loading={loading}
                      onClick={() => back()}
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export { CreateOrUpdateFormAlbumPost };

import { CloseOutlined } from "@ant-design/icons";
import { CreateOrUpdateFormGallery } from "./create-or-update-form-gallery";

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
                  <CreateOrUpdateFormGallery
                    uploadImages={uploadImages}
                    post={post}
                  />
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

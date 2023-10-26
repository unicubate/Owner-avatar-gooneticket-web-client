import { CloseOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { CreateFormPublicDonation } from "./create-form-public-donation";

const CreateModalPublicDonation: React.FC<{
  user?: any;
  openModal: boolean;
  setOpenModal: any;
}> = ({ openModal, setOpenModal, user }) => {
  return (
    <>
      {openModal ? (
        <div className="z-40 fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto">
          <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover">
            <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
            <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white">
              <button
                className="bg-transparent border-0 text-black float-right"
                onClick={() => setOpenModal(false)}
              >
                <span className="text-black opacity-7 h-6 w-6 text-xl block  py-0 rounded-full">
                  <CloseOutlined />
                </span>
              </button>

              <CreateFormPublicDonation user={user} />
              
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { CreateModalPublicDonation };

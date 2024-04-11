import { X } from 'lucide-react';
import { CreateFormPublicDonation } from './create-form-public-donation';

const CreateModalPublicDonation: React.FC<{
  user?: any;
  openModal: boolean;
  setOpenModal: any;
}> = ({ openModal, setOpenModal, user }) => {
  return (
    <>
      {openModal ? (
        <div className="fixed left-0 top-0 z-50 size-full overflow-y-auto overflow-x-hidden outline-none">
          <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
            <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
            <div className="relative  m-auto w-full max-w-lg rounded-xl bg-white p-5 shadow-lg dark:bg-[#121212]">
              <button
                className="float-right border-0 bg-transparent text-black"
                onClick={() => setOpenModal(false)}
              >
                <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                  <X />
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

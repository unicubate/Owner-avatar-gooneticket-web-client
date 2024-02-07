import { PrivateComponent } from '@/components/util/private-component';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { LayoutDashboard } from '@/components/layout-dashboard';

const Messages = () => {
  const onSubmit: SubmitHandler<any> = (payload: any) => {
    // let data = new FormData();
    // data.append("confirm", `${payload.confirm}`);
    // payload?.attachment?.fileList?.length > 0 &&
    //   payload?.attachment?.fileList.forEach((file: any) => {
    //     data.append("attachment", file as RcFile);
    //   });

    console.log('payload =======>', payload);
  };

  return (
    <>
      <LayoutDashboard title={'Message'}>
        <div className="flex-1">
          <main>
            <div className="py-6">
              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <div className="max-w-md">
                  <h1 className="text-lg font-bold text-gray-900">Messages</h1>
                  <p className="mt-2 text-sm font-medium leading-6 text-gray-500">
                    Recevez vos message de vos utilisateur
                  </p>
                </div>
              </div>

              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <nav className="flex flex-wrap gap-4">
                    <a
                      href="#"
                      className="group inline-flex items-center whitespace-nowrap rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                    >
                      {' '}
                      Write a message{' '}
                    </a>

                    {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"> Team </a>

                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 rounded-lg group whitespace-nowrap bg-transparent hover:text-gray-900 hover:bg-gray-100"> Notification </a>

                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg group whitespace-nowrap bg-gray-100"> Billing Details </a>

                                    <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-200 bg-transparent rounded-lg hover:text-gray-900 hover:bg-gray-100 group whitespace-nowrap"> Integrations </a> */}
                  </nav>
                </div>
              </div>

              <div className="mx-auto mt-8 px-4 sm:px-6 md:px-8">
                <div className="w-full overflow-x-auto pb-1">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-10">
                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-indigo-600 py-4 text-sm font-medium text-indigo-500 transition-all duration-200"
                      >
                        {' '}
                        Publisher{' '}
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-gray-300"
                      >
                        {' '}
                        Drafted{' '}
                      </a>

                      <a
                        href="#"
                        className="whitespace-nowrap border-b-2 border-transparent py-4 text-sm font-medium text-gray-600 transition-all duration-200 hover:border-gray-300"
                      >
                        {' '}
                        Scheduled{' '}
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(Messages);

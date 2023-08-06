import { Drawer } from "antd";
import { VerticalNavDashboard } from "./vertical-nav-dashboard";
import { useState } from "react";

interface Props {
  user?: any;
}

const HeaderHorizontalNavDashboard: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => { setOpen((item) => !item) };
  const onClose = () => { setOpen((item) => !item)};


  console.log('user =====>', user)
  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center -m-2 xl:hidden">
              <button
                onClick={showDrawer}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="flex ml-6 xl:ml-0">
              <div className="flex items-center flex-shrink-0">
                <img
                  className="block w-auto h-8 lg:hidden"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                  alt=""
                />
                <img
                  className="hidden w-auto h-8 lg:block"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo.svg"
                  alt=""
                />
              </div>
            </div>

            <div className="flex items-center justify-end ml-auto space-x-6">
              <div className="relative">
                <button
                  type="button"
                  className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                </button>
                <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                  {" "}
                  2{" "}
                </span>
              </div>

              <div className="relative">
                <button
                  type="button"
                  className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
                >
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    ></path>
                  </svg>
                </button>
                <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                  {" "}
                  6{" "}
                </span>
              </div>

              <button
                type="button"
                className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
              >
                <img
                  className="object-cover w-8 h-8 bg-gray-300 rounded-full"
                  src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/1/avatar-male.png"
                  alt=""
                />
                <span className="hidden ml-2 text-sm font-medium text-gray-900 md:block">
                  {" "}
                  Jacob Jones{" "}
                </span>
                <svg
                  className="w-4 h-4 ml-3 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fix Drawer */}

      <Drawer title="" placement="right" onClose={onClose} open={open}>

        <VerticalNavDashboard />

      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavDashboard };

import { Drawer } from "antd";
import { VerticalNavDashboard } from "./vertical-nav-dashboard";
import { useState } from "react";

interface Props {
  user?: any;
}

const HeaderHorizontalNavDashboard: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => { setOpen((item) => !item) };
  const onClose = () => { setOpen((item) => !item) };


  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 mx-auto fixed">
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
          </div>
        </div>
      </header>

      {/* Fix Drawer */}

      <Drawer title="" placement="right" closable={true} onClose={onClose} open={open}>
        <div className="flex flex-col pt-5 overflow-y-auto">
          <VerticalNavDashboard user={user} />
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavDashboard };

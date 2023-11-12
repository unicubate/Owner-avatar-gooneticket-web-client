import { Drawer } from "antd";
import { VerticalNavDashboard } from "./vertical-nav-dashboard";
import { useState } from "react";
import { HorizontalNavDashboard } from "./horizontal-nav-dashboard";

interface Props {
  user?: any;
}

const HeaderHorizontalNavDashboard: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen((item) => !item);
  };
  const onClose = () => {
    setOpen((item) => !item);
  };

  return (
    <>
      <HorizontalNavDashboard showDrawer={showDrawer} user={user} />

      {/* Fix Drawer */}

      <Drawer
        title=""
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        className="bg-white dark:bg-[#121212]"
      >
        <div className="flex flex-col pt-5 overflow-y-auto">
          <VerticalNavDashboard user={user} />
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavDashboard };

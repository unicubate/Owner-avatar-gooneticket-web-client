import { useState } from "react";
import { Drawer } from "antd";
import { HorizontalNavSite } from "./horizontal-nav-site";

interface Props {
  user?: any;
}

const HeaderHorizontalNavSite: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen((item) => !item);
  };
  const onClose = () => {
    setOpen((item) => !item);
  };

  return (
    <>
      <HorizontalNavSite showDrawer={showDrawer} user={user} />

      <Drawer
        title=""
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
      >
        <div className="flex flex-col overflow-y-auto pt-5">
          {/* <VerticalNavDashboard user={user} /> */}
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavSite };

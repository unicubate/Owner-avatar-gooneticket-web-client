import { useState } from "react";
import { Drawer } from "antd";
import { HorizontalNavUserPublicSite } from "./horizontal-nav-user-public-site";
import { VerticalNavUserPublicSite } from "./vertical-nav-user-public-site";

interface Props {
  user?: any;
}

const HeaderHorizontalNavUserPublicSite: React.FC<Props> = ({ user }) => {
  const [open, setOpen] = useState<boolean>(false);
  const showDrawer = () => {
    setOpen((item) => !item);
  };
  const onClose = () => {
    setOpen((item) => !item);
  };

  return (
    <>
      {user?.id ? <HorizontalNavUserPublicSite showDrawer={showDrawer} user={user} /> : null}

      <Drawer
        title=""
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        className="bg-white dark:bg-[#121212]"
      >
        <div className="flex flex-col pt-5 overflow-y-auto">
          <VerticalNavUserPublicSite user={user} />
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavUserPublicSite };

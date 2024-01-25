import { Drawer } from 'antd';
import { useState } from 'react';
import { HorizontalNavDashboard } from './horizontal-nav-dashboard';
import { VerticalNavDashboard } from './vertical-nav-dashboard';

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
        className="bg-white dark:bg-black"
      >
        <div className="flex flex-col overflow-y-auto pt-5">
          <VerticalNavDashboard user={user} />
        </div>
      </Drawer>
    </>
  );
};

export { HeaderHorizontalNavDashboard };

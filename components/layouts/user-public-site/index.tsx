import { UserModel } from '@/types/user';
import { HorizontalNavUserPublicSite } from './horizontal-nav-user-public-site';

import { HeaderSite } from '@/components/ui-setting';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useInputState } from '../../hooks';
import { VerticalNavUserPublicSite } from './vertical-nav-user-public-site';
interface IProps {
  user: UserModel;
  title: string;
  children: React.ReactNode;
}

const LayoutUserPublicSite = ({ children, title, user }: IProps) => {
  const { isOpen, setIsOpen } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };

  return (
    <>
      <HeaderSite title={title} />

      {/* <div className="flex flex-col"> */}
      {user?.id ? (
        <HorizontalNavUserPublicSite showDrawer={showDrawer} user={user} />
      ) : null}

      {/* Fix Drawer */}
      <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <SheetTrigger asChild>
          {/* <Button variant="outline">Open</Button> */}
        </SheetTrigger>
        <SheetContent className="dark:border-gray-800 dark:bg-background">
          <div className="flex flex-col overflow-y-auto pt-5">
            <VerticalNavUserPublicSite user={user} />
          </div>
        </SheetContent>
      </Sheet>
      {/*End Fix Drawer */}

      <div className="flex flex-1 dark:bg-black/15">
        <div
          className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-background`}
        >
          <main>{children}</main>
        </div>
      </div>

      {/* <main>{children}</main> */}

      {/* </div> */}
      {/* </div> */}
    </>
  );
};

export { LayoutUserPublicSite };

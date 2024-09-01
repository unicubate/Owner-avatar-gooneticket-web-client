import { MediumFooter } from '@/components/footer/medium-footer';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserModel } from '@/types/user';
import { useInputState } from '../../hooks';
import { HeaderSite } from '../../ui-setting/header-site';
import { useAuth } from '../../util/context-user';
import { HorizontalNavDashboard } from './horizontal-nav-dashboard';
import { VerticalNavDashboard } from './vertical-nav-dashboard';

interface IProps {
  title: string;
  children: React.ReactNode;
}

export type NavbarProps = {
  title: string;
  href: string;
  count?: number;
  icon?: any;
};

const LayoutDashboard = ({ children, title }: IProps) => {
  const { profile, username, email, status, theme } = useAuth() as any;
  const user = { profile, username, email, status };
  const { isOpen, setIsOpen } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };

  return (
    <>
      <HeaderSite title={title} />

      <div className="flex flex-col">
        <HorizontalNavDashboard
          showDrawer={showDrawer}
          user={user as UserModel}
        />

        <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
          <SheetTrigger asChild></SheetTrigger>
          <SheetContent
            side="left"
            className="dark:border-gray-900 dark:bg-background"
          >
            <div className="flex flex-col overflow-y-auto pt-5">
              <VerticalNavDashboard user={user} />
            </div>
          </SheetContent>
        </Sheet>

        <div
          className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-[#121212]`}
        >
          <main>
            {children}

            <MediumFooter />
          </main>
        </div>
      </div>
    </>
  );
};

export { LayoutDashboard };

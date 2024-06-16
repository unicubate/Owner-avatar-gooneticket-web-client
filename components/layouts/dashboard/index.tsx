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
  const { profile, username, email, theme } = useAuth() as any;
  const user = { profile, username, email };
  const { isOpen, setIsOpen } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };

  return (
    <>
      <HeaderSite
        title={title}
        metas={
          <meta
            name="description"
            content={`Setting your tickets for concerts, musicals, shows, sports and culture on ${process.env.NEXT_PUBLIC_NAME_SITE}`}
          />
        }
      />

      <div className="flex flex-col">
        <HorizontalNavDashboard
          showDrawer={showDrawer}
          user={user as UserModel}
        />

        <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
          <SheetTrigger asChild></SheetTrigger>
          <SheetContent className="dark:border-gray-800 dark:bg-black/15">
            <div className="flex flex-col overflow-y-auto pt-5">
              <VerticalNavDashboard user={user} />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 dark:bg-black/15">
          {/* {profile?.id ? (
            <div className="hidden md:flex md:w-56 md:flex-col">
              <div className="fixed flex max-h-screen flex-col pt-5">
                <VerticalNavDashboard user={user} />
              </div>
            </div>
          ) : null} */}

          <div
            className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-[#1c1b22]`}
          >
            <main>
              {children}

              <MediumFooter />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export { LayoutDashboard };

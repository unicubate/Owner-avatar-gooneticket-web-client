import { useCanonicalUrl } from '@/components/hooks';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Head from 'next/head';
import { useInputState } from '../../hooks';
import { HorizontalNavSite } from './horizontal-nav-site';
import { VerticalNavSite } from './vertical-nav-site';

interface IProps {
  title: string;
  metas?: React.ReactNode;
  children: React.ReactNode;
}

export type NavbarSiteProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

const LayoutSite = ({ children, title, metas }: IProps) => {
  const canonicalUrl = useCanonicalUrl();
  const { isOpen, setIsOpen, userStorage } = useInputState();
  const showDrawer = () => {
    setIsOpen((i) => !i);
  };
  return (
    <>
      <Head>
        <title>
          {title} | {process.env.NEXT_PUBLIC_NAME_SITE}
        </title>
        <meta
          property="og:title"
          content={process.env.NEXT_PUBLIC_NAME_SITE}
          key="title"
        />
        {metas}
        {process.env.NEXT_ENV === 'prod' && (
          <link rel="canonical" href={canonicalUrl} />
        )}
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {/* <div className="min-h-screen space-y-5"> */}
      <HorizontalNavSite showDrawer={showDrawer} user={userStorage} />

      {/* Fix Drawer */}
      <Sheet onOpenChange={setIsOpen} open={isOpen} defaultOpen={isOpen}>
        <SheetTrigger asChild>
          {/* <Button variant="outline">Open</Button> */}
        </SheetTrigger>
        <SheetContent className="dark:border-gray-800 dark:bg-[#04080b]">
          <div className="flex flex-col overflow-y-auto pt-5">
            <VerticalNavSite />
          </div>
        </SheetContent>
      </Sheet>
      {/*End Fix Drawer */}
      <main>{children}</main>

      {/* </div> */}
    </>
  );
};

export { LayoutSite };

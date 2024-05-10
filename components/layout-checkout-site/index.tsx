import Link from 'next/link';
import { HeaderSite } from '../layout-site/header-site';
import { useAuth } from '../util/context-user';

interface IProps {
  title: string;
  children: React.ReactNode;
}

const LayoutCheckoutSite: React.FC<IProps> = ({ children, title }) => {
  const { theme } = useAuth() as any;
  // const user = useAuth() as any;

  return (
    <>
      <HeaderSite title={title} />

      {/* <div className="bg-gray-50 py-8 dark:bg-[#1c1b22] sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
         
        </div>
      </div> */}

      <header className="sticky top-0 z-20 border-b border-gray-100 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex h-16 items-center justify-between">
            <div className="flex xl:ml-0">
              <div className="flex shrink-0 items-center">
                <div className="block h-8 w-auto lg:hidden">
                  <div className="flex items-center">
                    <div className="relative shrink-0 cursor-pointer">
                      <img
                        src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                        alt={process.env.NEXT_PUBLIC_NAME_SITE}
                      />
                    </div>

                    <div className="ml-2 cursor-pointer">
                      <p className="text-lg font-bold">
                        {process.env.NEXT_PUBLIC_NAME_SITE}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 hidden h-8 w-auto lg:block">
                  <Link href="/">
                    <div className="flex items-center">
                      <div
                        className="relative shrink-0 cursor-pointer"
                      >
                        <img
                          src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/logo-symbol.svg"
                          alt={process.env.NEXT_PUBLIC_NAME_SITE}
                        />
                      </div>
                    </div>
                  </Link>

                </div>
              </div>
            </div>


          </div>
        </div>
      </header>
      <div className="flex flex-1 dark:bg-black/15">
        <div
          className={`flex min-h-screen flex-1 flex-col bg-gray-100 dark:bg-[#1c1b22]`}
        >
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export { LayoutCheckoutSite };

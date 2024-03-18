import Link from 'next/link';
import { useState } from 'react';
import { IoLogoInstagram, IoLogoTiktok, IoLogoYoutube } from 'react-icons/io5';

type NavbarSiteProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

const MediumFooter = () => {
  const [navigation] = useState<NavbarSiteProps[]>([
    {
      title: 'About',
      description: 'About',
      href: '/about',
    },
    {
      title: 'Features',
      description: 'About',
      href: '/features',
    },
    {
      title: 'Privacy',
      description: 'Privacy',
      href: '/privacy-policy',
    },
    {
      title: 'Terms',
      description: 'Terms',
      href: '/terms-condition',
    },
  ]);
  return (
    <>
      <footer className="mt-4 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col items-center space-y-10 lg:justify-between lg:space-y-0 lg:flex-row">
            <div className="shrink-0">
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

            <nav className="flex items-center justify-center space-x-6 sm:space-x-10 xl:space-x-16">
              {navigation.map((item: any, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className="text-base font-medium transition-all duration-200 hover:-translate-y-1"
                  >
                    {item?.icon}

                    {item?.title}
                  </Link>
                );
              })}
            </nav>

            <ul className="flex items-center justify-end space-x-3">
              <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-8 h-8 text-white transition-all duration-200 bg-gray-800 rounded-full hover:bg-red-600"
                  target="_blank"
                  rel="noopener"
                >
                  <IoLogoYoutube />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-8 h-8 text-white transition-all duration-200 bg-gray-800 rounded-full hover:bg-red-400"
                  target="_blank"
                  rel="noopener"
                >
                  <IoLogoTiktok />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-8 h-8 text-white transition-all duration-200 bg-gray-800 rounded-full hover:bg-blue-600"
                  target="_blank"
                  rel="noopener"
                >
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center w-8 h-8 text-white transition-all duration-200 bg-gray-800 rounded-full hover:bg-blue-600"
                  target="_blank"
                  rel="noopener"
                >
                  <IoLogoInstagram />
                </a>
              </li>
            </ul>
          </div>

          <div className="pt-4 mt-4 text-center border-t dark:border-gray-600 sm:mt-8 lg:mt-8">
            <p className="text-sm font-normal dark:text-gray-600">
              © Copyright {new Date().getFullYear()}, All Rights Reserved by{' '}
              {process.env.NEXT_PUBLIC_NAME_SITE}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
export { MediumFooter };

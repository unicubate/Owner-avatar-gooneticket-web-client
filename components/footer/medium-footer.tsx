import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ImageLogo } from '../ui-setting';

type NavbarSiteProps = {
  title: string;
  href: string;
  description?: string;
  icon?: any;
};

const MediumFooter = () => {
  const { t } = useInputState();
  const [navigation] = useState<NavbarSiteProps[]>([
    // {
    //   title: 'FOOTER.ABOUT',
    //   description: 'About',
    //   href: '/about',
    // },
    // {
    //   title: 'Features',
    //   description: 'About',
    //   href: '/features',
    // },
    {
      title: 'FOOTER.PRIVACY_POLICY',
      description: 'Privacy',
      href: '/privacy-policy',
    },
    {
      title: 'FOOTER.TERMS_OF_USE',
      description: 'Terms',
      href: '/terms-condition',
    },
  ]);
  return (
    <div className="dark:bg-background border  border-input">
      <footer className="max-w-8xl mx-auto mt-4 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-4 lg:flex-row lg:justify-between lg:space-y-0">
            <div className="shrink-0">
              <div className="flex items-center">
                <div className="relative shrink-0 cursor-pointer">
                  <ImageLogo />
                </div>

                <div className="ml-2 cursor-pointer">
                  <p className="text-lg font-bold">
                    {process.env.NEXT_PUBLIC_NAME_SITE}
                  </p>
                </div>
              </div>
            </div>

            <nav className="flex items-center justify-center space-x-2 sm:space-x-10 xl:space-x-16">
              {navigation.map((item: any, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`${item.href}`}
                    title={item?.title}
                    className="text-base font-medium transition-all duration-200 hover:-translate-y-1"
                  >
                    {item?.icon}
                    {t.formatMessage({ id: item?.title })}
                  </Link>
                );
              })}
            </nav>

            <ul className="flex items-center justify-end space-x-3">
              {/* <li>
                <a
                  href="#"
                  title=""
                  className="inline-flex size-8 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-red-600"
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
                  className="inline-flex size-8 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-red-400"
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
                  className="inline-flex size-8 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600"
                  target="_blank"
                  rel="noopener"
                >
                  <svg
                    className="size-4"
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
                  className="inline-flex size-8 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600"
                  target="_blank"
                  rel="noopener"
                >
                  <IoLogoInstagram />
                </a>
              </li> */}

              <li>
                <Image
                  className="mt-2"
                  src={'/assets/payment-cards.png'}
                  height={180}
                  width={180}
                  alt="Payment cards"
                  quality={90}
                  priority={true}
                />
              </li>
            </ul>
          </div>

          <div className="mt-4 border-t border-input pt-4 text-center sm:mt-8 lg:mt-8">
            <p className="text-sm font-normal dark:text-gray-600">
              © Copyright {new Date().getFullYear()},{' '}
              {t.formatMessage({ id: 'FOOTER.COPYRIGHT' })}{' '}
              {process.env.NEXT_PUBLIC_NAME_SITE}
            </p>
            <p className="text-sm font-normal dark:text-gray-600">
              Partita IVA: 04024941207
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
export { MediumFooter };

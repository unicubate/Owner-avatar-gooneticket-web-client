/* eslint-disable @next/next/no-img-element */
import { MediumFooter } from '@/components/footer/medium-footer';
import { useInputState } from '@/components/hooks';
import {
  comparedLandingPage,
  featuresLandingPage,
} from '@/components/landing-page/data-map';
import { LayoutSite } from '@/components/layouts/site';
import { ButtonInput } from '@/components/ui-setting';
import { useState } from 'react';
import { useIntl } from 'react-intl';

// Third-party library imports

// UI component imports

import { PublicComponent } from '@/components/util/public-component';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

// Custom components

type FAQItem = {
  question: string;

  answer: string;

  link?: string;
};

const content: FAQItem[] = [
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: 'https://google.com',
  },

  {
    question: 'Ut enim ad minim veniam?',
    answer:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },

  {
    question: 'Duis aute irure dolor in reprehenderit?',
    answer:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },

  {
    question: 'Excepteur sint occaecat cupidatat non proident?',
    answer:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

const Home = () => {
  const { search, handleSetSearch, isOpen, setIsOpen } = useInputState();
  const [features] = useState(featuresLandingPage);
  const [compared] = useState(comparedLandingPage);
  const t = useIntl();

  return (
    <LayoutSite title="Tickets, Concerts, Entertainment, Sport & Culture">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 py-6 text-center">
            <h1 className="text-2xl font-bold sm:text-4xl lg:text-5xl">
              {t.formatMessage({ id: 'HOME.TITLE' })}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base font-normal leading-7 text-gray-500">
              {t.formatMessage({ id: 'HOME.SUBTITLE' })}
            </p>
            <div className="mt-4 flex justify-center space-x-2">
              <Link href={`/login`}>
                <ButtonInput
                  type="button"
                  className="text-lg"
                  size="lg"
                  variant="outline"
                >
                  Login
                </ButtonInput>
              </Link>
              <Link
                href={`${process.env.NEXT_PUBLIC_SITE_CREATOR}/events/create`}
              >
                <ButtonInput
                  type="button"
                  className="text-lg"
                  size="lg"
                  variant="primary"
                  icon={<PlusIcon />}
                >
                  Create event
                </ButtonInput>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-tight sm:text-4xl lg:text-4xl">
            Make 20% or more,
          </h2>
          <p className="mt-2 text-lg  font-bold leading-tight text-gray-600 sm:text-lg lg:text-lg">
            compared to other platforms.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-4 lg:grid-cols-3 xl:gap-10">
          {compared.map((feature, index) => (
            <div
              key={index}
              className="overflow-hidden rounded dark:bg-black/15"
            >
              <div className="p-4">
                <div className="flex items-center">
                  {feature?.icon}
                  <div className="ml-5 mr-auto">
                    <p className="text-xl font-semibold">{feature?.title}</p>
                  </div>
                </div>

                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto my-20 max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-none">
            Sell ​​your <span className="text-blue-600"> tickets </span>{' '}
            creating your page
          </h2>
          <p className="mt-2 text-sm font-bold leading-tight text-gray-600">
            It only takes a minute to create your page and start receiving
            donations and support
          </p>
        </div>

        <div className="mt-4 flex flex-wrap justify-center">
          <Link href={`${process.env.NEXT_PUBLIC_SITE_CREATOR}/register`}>
            <ButtonInput
              type="button"
              className="px-10 text-lg"
              size="xlg"
              variant="primary"
            >
              Start free with email
            </ButtonInput>
          </Link>
        </div>
      </div>

      <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-none">
            All the features you need
          </h2>
          <p className="mt-2 text-sm font-bold leading-tight text-gray-600">
            Everything you need to make an income from your work.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-4 lg:grid-cols-3 xl:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="overflow-hidden rounded dark:bg-black/15"
            >
              <div className="p-4">
                <div className="flex items-center">
                  {feature?.icon}
                  <div className="ml-5 mr-auto">
                    <p className="text-xl font-semibold">{feature?.title}</p>
                  </div>
                </div>

                <p className="mt-2 text-base leading-relaxed text-gray-600">
                  {feature?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MediumFooter />
    </LayoutSite>
  );
};

export default PublicComponent(Home);

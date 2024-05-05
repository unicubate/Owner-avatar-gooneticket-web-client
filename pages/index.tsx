/* eslint-disable @next/next/no-img-element */
import { MediumFooter } from '@/components/footer/medium-footer';
import { useInputState } from '@/components/hooks';
import {
  comparedLandingPage,
  featuresLandingPage,
} from '@/components/landing-page/data-map';
import { LayoutSite } from '@/components/layout-site';
import { ButtonInput } from '@/components/ui-setting';
import { useState } from 'react';
import { useIntl } from 'react-intl';

export default function Home() {
  const { search, handleSetSearch, isOpen, setIsOpen } = useInputState();
  const [features] = useState(featuresLandingPage);
  const [compared] = useState(comparedLandingPage);
  const t = useIntl();

  return (
    <LayoutSite title="Get Donations, Memberships and Shop Sales. No Fees">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:py-10">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-5xl py-6 text-center">
            <h1 className="text-2xl font-bold sm:text-4xl lg:text-5xl">
              {t.formatMessage({ id: 'HOME.TITLE' })}
            </h1>
            <p className="mx-auto mt-6 max-w-md text-base font-normal leading-7 text-gray-500">
              {t.formatMessage({ id: 'HOME.SUBTITLE' })}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto my-8 mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Designed for creators,
          </h2>
          <p className="mt-2 text-lg font-bold leading-tight text-gray-600 sm:text-lg lg:text-lg">
            not for businesses.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-4 lg:grid-cols-3 xl:gap-10">
          <div className="overflow-hidden rounded dark:bg-black/15">
            <div className="p-4">
              <p className="text-base leading-relaxed text-gray-600">
                You have 100% ownership of your supporters. We never email them,
                and you can export the list any time you like.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded dark:bg-black/15">
            <div className="p-4">
              <p className="text-base leading-relaxed text-gray-600">
                You get to talk to a human for help, or if you just like some
                advice to hit the ground running.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded dark:bg-black/15">
            <div className="p-4">
              <p className="text-base leading-relaxed text-gray-600">
                {`We don't call them "customers" or transactions. They are your
                supporters.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-tight sm:text-4xl lg:text-5xl">
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
          <h2 className="text-4xl font-bold leading-none sm:text-4xl lg:text-5xl">
            Fund your creative work by
            <span className="text-indigo-600"> creating your page </span>
          </h2>
          <p className="mt-2 text-lg font-bold leading-tight text-gray-600 sm:text-lg lg:text-lg">
            It only takes a minute to create your page and start receiving
            donations and support
          </p>
        </div>

        <div className="mt-4 flex flex-wrap justify-center">
          <ButtonInput
            type="button"
            className="px-10 text-lg"
            size="xlg"
            variant="info"
          >
            Start free with email
          </ButtonInput>
        </div>
      </div>

      <div className="mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold leading-none sm:text-4xl lg:text-5xl">
            All the features you need
          </h2>
          <p className="mt-2 text-lg  font-bold leading-tight text-gray-600 sm:text-lg lg:text-lg">
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
}

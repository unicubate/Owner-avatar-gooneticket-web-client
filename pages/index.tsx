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

import { ArrowUpRight } from 'lucide-react';

// UI component imports

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export default function Home() {
  const { search, handleSetSearch, isOpen, setIsOpen } = useInputState();
  const [features] = useState(featuresLandingPage);
  const [compared] = useState(comparedLandingPage);
  const t = useIntl();

  return (
    <LayoutSite
      metas={
        <meta
          name="description"
          key="description"
          content={`Tickets for concerts, musicals, shows, sports and culture on ${process.env.NEXT_PUBLIC_NAME_SITE}`}
        />
      }
      title="Tickets, Concerts, Entertainment, Sport & Culture"
    >
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
            variant="primary"
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

      {/* <Container> */}
      {/* <h3 className="!mt-0">Frequently Asked Questions</h3>

      <h4 className="text-muted-foreground">
        Can&apos;t find the answer you&apos;re looking for? Reach out to our
        customer support team.
      </h4> */}

      <div className="not-prose mx-auto mt-4 flex max-w-6xl flex-col gap-4 md:mt-8">
        {content.map((item, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem
              value={item.question}
              className="rounded-md border bg-muted/20 px-4  transition-all hover:bg-muted/50 dark:border-gray-800 dark:bg-black/15"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>

              <AccordionContent className="text-base md:w-3/4">
                {item.answer}

                {item.link && (
                  <a
                    href={item.link}
                    className="mt-2 flex w-full items-center opacity-60 transition-all hover:opacity-100"
                  >
                    Learn more <ArrowUpRight className="ml-1" size="16" />
                  </a>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
      {/* </Container> */}

      <MediumFooter />
    </LayoutSite>
  );
}

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

BigInt.prototype.toJSON = function () {
  return this.toString();
};

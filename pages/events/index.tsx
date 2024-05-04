import { GetInfiniteProductsAPI } from '@/api-site/product';
import { ListPublicProductsEvent } from '@/components/event/list-public-products-event';
import { useInputState } from '@/components/hooks';
import { LayoutSite } from '@/components/layout-site';
import { LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { ProductModel } from '@/types/product';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const EventsIndex = () => {
  const { t, userStorage: user } = useInputState();
  const { search, handleSetSearch } = useInputState();
  const router = useRouter();
  const { ref, inView } = useInView();

  const {
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    data: dataProduct,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteProductsAPI({
    search,
    take: 10,
    sort: 'DESC',
    modelIds: ['EVENT'],
  });

  useEffect(() => {
    let fetching = false;
    if (inView) {
      fetchNextPage();
    }
    const onScroll = async (event: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        event.target.scrollingElement;

      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', onScroll);
    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, [fetchNextPage, hasNextPage, inView]);

  const dataTableProducts = isLoadingProduct ? (
    <LoadingFile />
  ) : isErrorProduct ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataProduct?.pages[0]?.data?.total) <= 0 ? (
    ''
  ) : (
    dataProduct?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item: ProductModel, index: number) => (
        <ListPublicProductsEvent item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutSite title="Get Ticket event and pay your product">
        <div className="mx-auto max-w-max px-4 sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto space-y-8 p-6">
            <div className="relative bg-gray-900 py-6 sm:py-16 lg:py-20 xl:py-32">
              <div className="absolute inset-0">
                <img
                  className="size-full object-cover"
                  src="https://source.unsplash.com/900x900/?fashion?8"
                  alt=""
                />
              </div>

              {/* <div className="absolute inset-0 bg-gray-900/50"></div> */}

              <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-max text-center">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    Esplora e scopri Eventi online
                  </h2>
                  <p className="mt-2 text-sm font-normal leading-7 text-white sm:mt-6">
                    Gli eventi online raggruppano persone di tutto il mondo che
                    vogliono apprendere, divertirsi o appartenere a una
                    community. Trova il corso di formazione perfetto per
                    acquisire nuove competenze e ottenere certificazioni. Rimani
                    connesso grazie al live streaming della musica, dei giochi,
                    degli eventi sportivi o delle novità che preferisci.
                    Registrati a un webinar tenuto da persone del tuo settore o
                    della tua.
                  </p>

                  <div className="mt-8 sm:mt-10">
                    {/* Base */}

                    {/* <a
                      href="#"
                      title=""
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-white px-8 py-3 text-base font-bold leading-7 text-gray-900 transition-all duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      role="button"
                    >
                      Explore Now
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold">Eventi online più gettonati</h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 lg:grid-cols-3">
              {dataTableProducts}
              {/* <Card className="w-full dark:border-gray-800 dark:bg-black/15 sm:w-[450px]">
                <a href="#" aria-label="Te nulla oportere reprimique his dolorum">
                  <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src="https://source.unsplash.com/200x200/?fashion?4" />
                </a>
                <div className="flex flex-1 flex-col p-2">
                  <a href="#" className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600">Via della costa 13 - Vigevanoo</a>
                  <h3 className="mt-2 flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                  <p className="line-clamp-3 py-2 text-sm font-normal leading-6 text-gray-500">Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sit quis auctor odio arcu et dolor.</p>

                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-sm">
                    <span>June 1, 2020 - 10,00 EUR</span>
                    <span>20:00 - 05:00</span>
                  </div>
                </div>
              </Card>
              <Card className="w-full dark:border-gray-800 dark:bg-black/15 sm:w-[450px]">
                <a href="#" aria-label="Te nulla oportere reprimique his dolorum">
                  <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src="https://source.unsplash.com/200x200/?fashion?4" />
                </a>
                <div className="flex flex-1 flex-col p-2">
                  <a href="#" className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600">Via della costa 13 - Vigevanoo</a>
                  <h3 className="mt-2 flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                  <p className="line-clamp-3 py-2 text-sm font-normal leading-6 text-gray-500">Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sit quis auctor odio arcu et dolor.</p>

                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-sm">
                    <span>June 1, 2020 - 10,00 EUR</span>
                    <span>20:00 - 05:00</span>
                  </div>
                </div>
              </Card>
              <Card className="w-full dark:border-gray-800 dark:bg-black/15 sm:w-[450px]">
                <a href="#" aria-label="Te nulla oportere reprimique his dolorum">
                  <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src="https://source.unsplash.com/200x200/?fashion?4" />
                </a>
                <div className="flex flex-1 flex-col p-2">
                  <a href="#" className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600">Via della costa 13 - Vigevanoo</a>
                  <h3 className="mt-2 flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                  <p className="line-clamp-3 py-2 text-sm font-normal leading-6 text-gray-500">Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sit quis auctor odio arcu et dolor.</p>

                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-sm">
                    <span>June 1, 2020 - 10,00 EUR</span>
                    <span>20:00 - 05:00</span>
                  </div>
                </div>
              </Card>
              <Card className="w-full dark:border-gray-800 dark:bg-black/15 sm:w-[450px]">
                <a href="#" aria-label="Te nulla oportere reprimique his dolorum">
                  <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src="https://source.unsplash.com/200x200/?fashion?4" />
                </a>
                <div className="flex flex-1 flex-col p-2">
                  <a href="#" className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600">Via della costa 13 - Vigevanoo</a>
                  <h3 className="mt-2 flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                  <p className="line-clamp-3 py-2 text-sm font-normal leading-6 text-gray-500">Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sit quis auctor odio arcu et dolor.</p>

                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-sm">
                    <span>June 1, 2020 - 10,00 EUR</span>
                    <span>20:00 - 05:00</span>
                  </div>
                </div>
              </Card> */}

              {/* <article className="flex flex-col dark:bg-gray-50">
                <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                  <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src="https://source.unsplash.com/200x200/?fashion?2" />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
                  <a rel="noopener noreferrer" href="#" className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600">Convenire</a>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
                    <span>June 2, 2020</span>
                    <span>2.2K views</span>
                  </div>
                </div>
              </article>
              <article className="flex flex-col dark:bg-gray-50">
                <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                  <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src="https://source.unsplash.com/200x200/?fashion?3" />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
                  <a rel="noopener noreferrer" href="#" className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600">Convenire</a>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
                    <span>June 3, 2020</span>
                    <span>2.3K views</span>
                  </div>
                </div>
              </article>
              <article className="flex flex-col dark:bg-gray-50">
                <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum">
                  <img alt="" className="h-52 w-full object-cover dark:bg-gray-500" src="https://source.unsplash.com/200x200/?fashion?4" />
                </a>
                <div className="flex flex-1 flex-col p-6">
                  <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
                  <a rel="noopener noreferrer" href="#" className="text-xs uppercase tracking-wider hover:underline dark:text-violet-600">Convenire</a>
                  <h3 className="flex-1 py-2 text-lg font-semibold leading-snug">Te nulla oportere reprimique his dolorum</h3>
                  <div className="flex flex-wrap justify-between space-x-2 pt-3 text-xs dark:text-gray-600">
                    <span>June 4, 2020</span>
                    <span>2.4K views</span>
                  </div>
                </div>
              </article> */}
            </div>
          </div>
        </div>

        {/* <section className="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-black/15 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
        <h2 className="font-semibold text-gray-800 dark:text-white">
          🍪 Cookie Notice
        </h2>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
          We use cookies to ensure that we give you the best experience on our
          website.{' '}
          <a href="#" className="text-blue-500 hover:underline">
            Read cookies policies
          </a>
          .{' '}
        </p>

        <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
          <button className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
            Manage your preferences
          </button>

          <button className=" text-xs bg-indigo-500 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Accept
          </button>
        </div>
      </section> */}

        {/* <section className="fixed max-w-2xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 left-12 bottom-16 dark:bg-gray-900 md:flex md:items-center dark:border-gray-700 rounded-2xl">
        <div className="flex items-center gap-x-4">
          <span className="inline-flex p-2 text-blue-500 rounded-lg shrink-0 dark:bg-gray-800 bg-blue-100/80">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9803 8.5468C17.5123 8.69458 17.0197 8.7931 16.5271 8.7931C14.2118 8.76847 12.3399 6.89655 12.3153 4.58128C12.3153 4.13793 12.3892 3.69458 12.537 3.27586C11.9951 2.68473 11.6995 1.92118 11.6995 1.13301C11.6995 0.812808 11.7488 0.492611 11.8473 0.172414C11.2315 0.0738918 10.6158 0 10 0C4.48276 0 0 4.48276 0 10C0 15.5172 4.48276 20 10 20C15.5172 20 20 15.5172 20 10C20 9.77833 20 9.55665 19.9754 9.33498C19.2611 9.26108 18.5468 8.99015 17.9803 8.5468ZM4.58128 7.31527C6.30542 7.31527 6.30542 10.0246 4.58128 10.0246C2.85714 10.0246 2.61084 7.31527 4.58128 7.31527ZM6.05912 15.7635C4.08867 15.7635 4.08867 12.8079 6.05912 12.8079C8.02956 12.8079 8.02956 15.7635 6.05912 15.7635ZM9.01478 1.33005C10.7389 1.33005 10.7389 4.28571 9.01478 4.28571C7.29064 4.28571 7.04434 1.33005 9.01478 1.33005ZM10.2463 8.84237C11.7241 8.84237 11.7241 10.8128 10.2463 10.8128C8.76848 10.8128 9.01478 8.84237 10.2463 8.84237ZM11.9704 16.9458C10.4926 16.9458 10.4926 14.9754 11.9704 14.9754C13.4483 14.9754 13.202 16.9458 11.9704 16.9458ZM16.6503 13.1034C15.4187 13.1034 15.4187 11.133 16.6503 11.133C17.8818 11.133 17.8818 13.1034 16.6503 13.1034Z"
                fill="currentColor"
              />
            </svg>
          </span>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use cookies to ensure that we give you the best experience on our
            website.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Read cookies policies
            </a>
            .{" "}
          </p>
        </div>

        <div className="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
          <button className="w-1/2 text-xs text-gray-800 underline transition-colors duration-300 md:w-auto dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
            Cookie Setting
          </button>

          <button className=" text-xs w-1/2 md:w-auto font-medium bg-gray-800 rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
            Accept All Cookies
          </button>
        </div>
      </section> */}
      </LayoutSite>
    </>
  );
};

export default EventsIndex;

import { GetInfiniteMembershipsAPI } from '@/api-site/membership';
import { useInputState } from '@/components/hooks/use-input-state';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { HorizontalNavMembership } from '@/components/membership/horizontal-nav-membership';
import { ListMemberships } from '@/components/membership/list-memberships';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { useAuth } from '@/components/util/context-user';
import { PrivateComponent } from '@/components/util/private-component';
import { LockKeyholeIcon, PlusIcon } from 'lucide-react';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const MembershipsLevels = () => {
  const { userStorage: user } = useAuth() as any;
  const router = useRouter();
  const { ref, inView } = useInView();
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingMembership,
    isError: isErrorMembership,
    data: dataGallery,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteMembershipsAPI({
    organizationId: user?.organizationId,
    take: 10,
    sort: 'DESC',
    search,
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

  const dataTableMemberships = isLoadingMembership ? (
    <LoadingFile />
  ) : isErrorMembership ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : dataGallery?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<LockKeyholeIcon className="size-10" />}
      title="Add your first listing to get started"
      description={`Your listing will appear on your page and be available for supporters to book. You can edit them anytime.`}
    />
  ) : (
    dataGallery?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListMemberships item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={'Memberships'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <HorizontalNavMembership />

            <div className="flow-root">
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
                <div className="px-4 py-8">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="mt-4 sm:mt-0">
                      <ButtonInput
                        type="button"
                        className="w-full"
                        size="sm"
                        variant="info"
                        onClick={() => router.push(`${`/memberships/create`}`)}
                        icon={<PlusIcon className="mr-2 size-4" />}
                      >
                        Create level
                      </ButtonInput>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <SearchInput
                        placeholder="Search by email, name"
                        onChange={handleSetSearch}
                      />
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {dataTableMemberships}
                  </div>
                </div>
              </div>

              {hasNextPage && (
                <div className="mx-auto mt-4 justify-center text-center">
                  <ButtonLoadMore
                    ref={ref}
                    isFetchingNextPage={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </LayoutDashboard>
    </>
  );
};

export default PrivateComponent(MembershipsLevels);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}

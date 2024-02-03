import { GetInfiniteContributorsAPI } from '@/api-site/contributor';
import { CreateContributorModal } from '@/components/contributor/create-contributor-modal';
import { ListContributors } from '@/components/contributor/list-contributors';
import { useInputState } from '@/components/hooks/use-input-state';
import { LayoutDashboard } from '@/components/layout-dashboard';
import {
  ButtonInput,
  ButtonLoadMore,
  SearchInput,
} from '@/components/ui-setting';
import { EmptyData, LoadingFile } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { PlusIcon } from 'lucide-react';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { BiTransfer } from 'react-icons/bi';

const ContributorsIndex = () => {
  const { push } = useRouter();
  const { search, isOpen, setIsOpen, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingTransaction,
    isError: isErrorTransaction,
    data: dataTransaction,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteContributorsAPI({
    search,
    take: 10,
    sort: 'DESC',
  });

  const dataTableContributors = isLoadingTransaction ? (
    <LoadingFile />
  ) : isErrorTransaction ? (
    <ErrorFile
      status="error"
      title="404"
      description="Error find data please try again..."
    />
  ) : dataTransaction?.pages[0]?.data?.total <= 0 ? (
    <EmptyData
      image={<BiTransfer className="size-10" />}
      title="You don't have any contributor"
      description={`Share your page with your audience to get started.`}
    />
  ) : (
    dataTransaction?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListContributors item={item} key={index} index={index} />
      ))
  );

  return (
    <>
      <LayoutDashboard title={'Contributors'}>
        <div className="mx-auto max-w-6xl py-6">
          <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
            <div className="flow-root">
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-[#121212]">
                <div className="sm:flex sm:items-center sm:justify-between">
                  <div className="mt-4 sm:mt-0">
                    <CreateContributorModal
                      buttonDialog={
                        <ButtonInput
                          type="button"
                          className="w-full"
                          size="sm"
                          variant="info"
                          icon={<PlusIcon className="mr-2 size-4" />}
                        >
                          Add contributor
                        </ButtonInput>
                      }
                      showModal={isOpen}
                      setShowModal={setIsOpen}
                    />
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <SearchInput
                      placeholder="Search by first name, last name, email"
                      onChange={handleSetSearch}
                    />
                  </div>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {dataTableContributors}
                </div>
              </div>

              {hasNextPage && (
                <div className="mx-auto mt-2 justify-center text-center">
                  <ButtonLoadMore
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

export default PrivateComponent(ContributorsIndex);

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: {
        ...(await import(`/lang/${locale}/index.json`)).default,
      },
    },
  };
}

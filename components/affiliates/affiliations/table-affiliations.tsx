/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteAffiliationsUserAPI } from '@/api-site/affiliation';
import { ListEventsAffiliations } from '@/components/affiliates/affiliations/list-events-affiliations';
import {
  ButtonLoadMore,
  EmptyData,
  ErrorFile,
  LoadingFile,
  SearchInput,
} from '@/components/ui-setting';
import { AffiliationModel } from '@/types/affiliation';
import { UserPlusIcon } from 'lucide-react';
import { Fragment } from 'react';
import { useInputState } from '../../hooks/use-input-state';

export const TableAffiliations = () => {
  const { t, search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingAffiliations,
    isError: isErrorAffiliations,
    data: dataAffiliations,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteAffiliationsUserAPI({
    search,
    take: 20,
    sort: 'DESC',
  });

  return (
    <>
      <div className="dark:border-input dark:bg-background mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="mt-4 sm:mt-0">
            <p className="text-lg font-bold">
              {t.formatMessage({ id: 'MENU.AFFILIATION' })}
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <SearchInput
              placeholder="Search by order title"
              onChange={handleSetSearch}
            />
          </div>
        </div>

        <div className="mt-4 min-w-full lg:divide-y">
          <div className="divide-y divide-input">
            {isLoadingAffiliations ? (
              <LoadingFile />
            ) : isErrorAffiliations ? (
              <ErrorFile
                title="404"
                description="Error find data please try again..."
              />
            ) : Number(dataAffiliations?.pages[0]?.data?.total) <= 0 ? (
              <EmptyData
                image={<UserPlusIcon className="size-10" />}
                title={t.formatMessage({
                  id: 'UTIL.ANY_AFFILIATION',
                })}
                description={t.formatMessage({
                  id: 'UTIL.ANY_SUB_AFFILIATION',
                })}
              />
            ) : (
              dataAffiliations?.pages.map((page, i) => (
                <Fragment key={i}>
                  {page?.data?.value.map(
                    (item: AffiliationModel, index: number) => (
                      <ListEventsAffiliations
                        item={item}
                        key={index}
                        index={index}
                      />
                    ),
                  )}
                </Fragment>
              ))
            )}
          </div>
        </div>
      </div>

      {hasNextPage && (
        <div className="mx-auto mt-2 justify-center text-center">
          <ButtonLoadMore
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};

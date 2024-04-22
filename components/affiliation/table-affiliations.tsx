/* eslint-disable jsx-a11y/anchor-is-valid */
import { GetInfiniteAffiliatesAPI } from '@/api-site/affiliation';
import { ButtonInput, ButtonLoadMore } from '@/components/ui-setting';
import { EmptyData } from '@/components/ui-setting/ant/empty-data';
import { LoadingFile } from '@/components/ui-setting/ant/loading-file';
import { ProductModel } from '@/types/product';
import { PlusIcon, UserPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInputState } from '../hooks/use-input-state';
import { SearchInput } from '../ui-setting';
import { ErrorFile } from '../ui-setting/ant/error-file';
import { CreateOrUpdateAffiliation } from './create-or-update-affiliation';
import { ListAffiliations } from './list-affiliations';

type Props = {
  organizationId: string;
  product?: ProductModel;
};

export const TableAffiliations = ({ organizationId, product }: Props) => {
  const { ref, inView } = useInView();
  const [showModal, setShowModal] = useState(false);
  const { search, handleSetSearch } = useInputState();

  const {
    isLoading: isLoadingAffiliate,
    isError: isErrorAffiliate,
    data: dataAffiliate,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = GetInfiniteAffiliatesAPI({
    search,
    take: 10,
    sort: 'DESC',
    productId: product?.id,
    organizationSellerId: organizationId,
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

  const dataTableGallery = isLoadingAffiliate ? (
    <LoadingFile />
  ) : isErrorAffiliate ? (
    <ErrorFile title="404" description="Error find data please try again..." />
  ) : Number(dataAffiliate?.pages[0]?.data?.total) <= 0 ? (
    <EmptyData
      image={<UserPlusIcon className="size-10" />}
      title="Add your first affiliate"
      description={`Affiliations is a simple and effective way to offer something to your audience. It could be anything. See some examples here`}
    />
  ) : (
    dataAffiliate?.pages
      .flatMap((page: any) => page?.data?.value)
      .map((item, index) => (
        <ListAffiliations item={item} key={index} index={index} />
      ))
  );
  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-[#121212]">
        <div className="px-4 py-8">
          <div className="mb-4 sm:mt-0">
            <p className="text-lg font-bold">{product?.title ?? ''}</p>
          </div>
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-4 sm:mt-0">
              <ButtonInput
                type="button"
                className="w-full"
                size="sm"
                variant="info"
                onClick={() => setShowModal(true)}
                icon={<PlusIcon className="size-4" />}
              >
                Add affiliate
              </ButtonInput>
            </div>
            <div className="mt-4 sm:mt-0">
              <SearchInput
                placeholder="Search by title"
                onChange={handleSetSearch}
              />
            </div>
          </div>

          <table className="mt-4 min-w-full lg:divide-y">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {dataTableGallery}
            </tbody>
          </table>
        </div>
      </div>

      {showModal ? (
        <CreateOrUpdateAffiliation
          showModal={showModal}
          setShowModal={setShowModal}
          productId={String(product?.id)}
        />
      ) : null}
      {hasNextPage && (
        <div className="mx-auto mt-4 justify-center text-center">
          <ButtonLoadMore
            ref={ref}
            isFetchingNextPage={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          />
        </div>
      )}
    </>
  );
};

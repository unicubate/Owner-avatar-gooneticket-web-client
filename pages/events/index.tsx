import { GetInfiniteFollowsProductsAPI } from '@/api-site/product';
import { ListPublicProductsEvent } from '@/components/event/list-public-products-event';
import { useInputState } from '@/components/hooks';
import { LayoutDashboard } from '@/components/layout-dashboard';
import { ProductEventSkeleton } from '@/components/skeleton/product-event-skeleton';
import { ButtonLoadMore, SearchInput } from '@/components/ui-setting';
import { EmptyData } from '@/components/ui-setting/ant';
import { ErrorFile } from '@/components/ui-setting/ant/error-file';
import { PrivateComponent } from '@/components/util/private-component';
import { itemsNumberArray } from '@/utils/utils';
import { TicketIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const EventsIndex = () => {
    const { inView } = useInView();
    const { search, handleSetSearch } = useInputState();

    const {
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
        data: dataProducts,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = GetInfiniteFollowsProductsAPI({
        search,
        modelIds: ['EVENT'],
        take: 10,
        sort: 'DESC',
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

    const dataTableProducts = isLoadingProducts ? (
        itemsNumberArray(2).map((i, index) => <ProductEventSkeleton key={i} index={index} />)
    ) : isErrorProducts ? (
        <ErrorFile title="404" description="Error find data please try again..." />
    ) : Number(dataProducts?.pages[0]?.data?.total) <= 0 ? (
        ''
    ) : (
        dataProducts?.pages
            .flatMap((page: any) => page?.data?.value)
            .map((item, index) => (
                <ListPublicProductsEvent item={item} key={index} index={index} />
            ))
    );

    return (
        <>
            <LayoutDashboard title={'Orders'}>
                <div className="mx-auto max-w-6xl py-6">
                    <div className="mx-auto mt-6 px-4 sm:px-6 md:px-8">
                        <div className="flow-root">


                            <div className="py-4 sm:flex sm:items-center sm:justify-between">
                                <div className="mt-4 sm:mt-0">
                                    <p className="text-lg font-bold">Recent Events</p>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <SearchInput
                                        placeholder="Search by title"
                                        onChange={handleSetSearch}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-2">

                                {dataTableProducts}

                            </div>



                            {Number(dataProducts?.pages[0]?.data?.total) <= 0 ?
                                <EmptyData
                                    image={<TicketIcon className="size-10" />}
                                    title="This page hasn't published anything!"
                                    description={`When he does, his publications will appear here first.`}
                                />
                                : null}

                            {hasNextPage && (
                                <div className="mx-auto justify-center text-center">
                                    <ButtonLoadMore
                                        className="w-[240px]"
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

export default PrivateComponent(EventsIndex);

import { CardFooter } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect } from 'react';
import { KeyAsString } from './utils';

export type SortModel = 'ASC' | 'DESC';

export type IsPaginate = 'TRUE' | 'FALSE';

export type PaymentType =
  | 'PAYPAL'
  | 'STRIPE'
  | 'FREE'
  | 'CARD'
  | 'OFFICE'
  | 'PHONE'
  | 'IBAN';

export type ModelType =
  | 'MESSAGE'
  | 'TICKET'
  | 'ORGANIZATION'
  | 'EVENT'
  | 'FREE'
  | 'PRODUCT'
  | 'POST'
  | 'COMMENT';

export const foldersType: KeyAsString = {
  PRODUCT: 'products',
  EVENT: 'products',
  POST: 'posts',
};

export type PaginationRequest = {
  organizationId?: string;
  isPaginate?: IsPaginate;
  search?: string;
  sort: SortModel;
  page?: number;
  take?: number;
};

export type PaginationResponse = {
  total: number;
  per_page: number;
  current_page: number;
  next_page: number;
  last_page: number;
  skip: number;
  sort: SortModel;
  total_page: number;
  total_value: number;
};

interface Props {
  data: { total_page: number };
  setPageItem: (page: number) => void;
  pageItem: number;
  isPlaceholderData: boolean;
}

export const PaginationPage: React.FC<Props> = ({
  data,
  setPageItem,
  pageItem: currentPage,
  isPlaceholderData,
}) => {
  const router = useRouter();
  const totalPageCount = data?.total_page || 0;

  useEffect(() => {
    const pageFromQuery = parseInt(router.query.page as string, 10) || 1;
    setPageItem(pageFromQuery);
  }, [router.query.page, setPageItem]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPageItem(newPage);
      window.scrollTo(0, 0);

      const query = { ...router.query };
      if (newPage > 1) {
        query.page = String(newPage);
      } else {
        delete query.page;
      }

      router.push({
        pathname: router.pathname,
        query,
      });
    },
    [router, setPageItem],
  );

  // Rendre les numéros de page
  const renderPageNumbers = (): ReactNode[] => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 8;

    if (totalPageCount <= maxVisiblePages) {
      for (let i = 1; i <= totalPageCount; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              className="cursor-pointer"
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            className="cursor-pointer"
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>,
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPageCount - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              className="cursor-pointer"
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>,
        );
      }

      if (currentPage < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>,
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            className="cursor-pointer"
            isActive={currentPage === totalPageCount}
            onClick={() => handlePageChange(totalPageCount)}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <>
      {totalPageCount > 1 && (
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : undefined}
                  onClick={() =>
                    currentPage > 1 && handlePageChange(currentPage - 1)
                  }
                  className={cn('cursor-pointer', {
                    'pointer-events-none opacity-50': currentPage === 1,
                  })}
                />
              </PaginationItem>
              {renderPageNumbers()}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    !isPlaceholderData &&
                    currentPage < totalPageCount &&
                    handlePageChange(currentPage + 1)
                  }
                  aria-disabled={currentPage === totalPageCount}
                  tabIndex={currentPage === totalPageCount ? -1 : undefined}
                  className={cn('cursor-pointer', {
                    'pointer-events-none opacity-50':
                      isPlaceholderData || currentPage === totalPageCount,
                  })}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      )}
    </>
  );
};

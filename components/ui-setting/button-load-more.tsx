import { ButtonInput } from './index';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  ref?: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
}

export function ButtonLoadMore(props: Props) {
  const { children = 'Load More', onClick, ref, isFetchingNextPage } = props;
  return (
    <>
      <div className="my-2 mt-2 sm:mt-0">
        <ButtonInput
          type="button"
          size="lg"
          variant="outline"
          className="w-full"
          ref={ref}
          loading={isFetchingNextPage ? true : false}
          onClick={onClick}
        >
          {children}
        </ButtonInput>
      </div>
    </>
  );
}

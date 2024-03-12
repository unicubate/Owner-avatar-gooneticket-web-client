import { ButtonInput } from './index';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  ref?: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
}

export const ButtonLoadMore = ({
  children = 'Load More',
  onClick,
  ref,
  isFetchingNextPage,
}: Props) => {
  return (
    <>
      <div className="my-2 mt-2 sm:mt-0">
        <ButtonInput
          type="button"
          size="lg"
          variant="default"
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
};

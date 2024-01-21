import { ButtonInput } from './index';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  ref?: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
}

const ButtonLoadMore: React.FC<Props> = ({
  children = 'Load More',
  onClick,
  ref,
  isFetchingNextPage,
}) => {
  return (
    <>
      <div className="mt-2 sm:mt-0">
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
};

export { ButtonLoadMore };

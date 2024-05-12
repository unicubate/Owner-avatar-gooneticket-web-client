import { SizeButton, VariantButton } from '../ui/button';
import { ButtonInput } from './index';

interface Props {
  title?: React.ReactNode;
  onClick?: () => void;
  ref?: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
  size?: SizeButton;
  className?: string;
  hasNextPage?: boolean;
  variant?: VariantButton;
}

export const ButtonLoadMore = ({
  title = 'Load More',
  variant = 'outline',
  onClick,
  ref,
  size = 'lg',
  className = "w-full",
  isFetchingNextPage,
  hasNextPage,
}: Props) => {
  return (
    <>
      <div className="my-2 sm:mt-0">
        <ButtonInput
          type="button"
          size={size}
          variant={variant}
          className={className}
          ref={ref}
          disabled={!hasNextPage || isFetchingNextPage}
          loading={isFetchingNextPage ? true : false}
          onClick={onClick}
        >
          {title}
        </ButtonInput>
      </div>
    </>
  );
};

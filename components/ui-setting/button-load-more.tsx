import { SizeButton, VariantButton } from '../ui/button';
import { ButtonInput } from './index';

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  ref?: (node?: Element | null) => void;
  isFetchingNextPage: boolean;
  size?: SizeButton;
  className?: string;
  variant?: VariantButton;
}

export const ButtonLoadMore = ({
  children = 'Load More',
  variant = 'outline',
  onClick,
  ref,
  size = 'lg',
  className = "w-full",
  isFetchingNextPage,
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
          loading={isFetchingNextPage ? true : false}
          onClick={onClick}
        >
          {children}
        </ButtonInput>
      </div>
    </>
  );
};

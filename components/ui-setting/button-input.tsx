import { LoaderCircleIcon } from 'lucide-react';
import { useInputState } from '../hooks';
import { Button, SizeButton, VariantButton } from '../ui/button';

interface Props {
  asChild?: boolean;
  className?: string;
  title?: string;
  disabled?: boolean;
  size?: SizeButton;
  variant: VariantButton;
  loading?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  type: 'button' | 'submit';
  onClick?: () => void;
  onMouseLeave?: () => void;
  ref?: (node?: Element | null) => void;
}

export const ButtonInput = ({
  asChild,
  type,
  size,
  icon,
  children,
  className,
  onClick,
  loading,
  variant,
  title,
  disabled,
  onMouseLeave,
  ref,
}: Props) => {
  const { t } = useInputState();

  return (
    <>
      <Button
        ref={ref}
        type={type}
        className={className}
        size={size}
        title={title}
        asChild={asChild}
        variant={variant}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
        disabled={disabled ? disabled : loading}
      >
        {loading ? (
          <>
            <LoaderCircleIcon
              style={{ fontSize: 20, color: '##1E90FF' }}
              className="size-4 animate-spin"
            />
            <span className="ml-2">{t.formatMessage({ id: 'UTIL.WAIT' })}</span>
          </>
        ) : (
          <>
            {icon}
            {children ? <span className="ml-2">{children}</span> : null}
          </>
        )}
      </Button>
    </>
  );
};

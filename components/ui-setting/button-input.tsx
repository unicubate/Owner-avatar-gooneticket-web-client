import { LoadingOutlined } from '@ant-design/icons';
import { Button, SizeButton, VariantButton } from '../ui/button';

interface Props {
  className?: string;
  disabled?: boolean;
  size?: SizeButton;
  variant: VariantButton;
  loading?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  type: 'button' | 'submit';
  onClick?: () => void;
  ref?: (node?: Element | null) => void;
}

const ButtonInput: React.FC<Props> = ({
  type,
  size,
  icon,
  children,
  className,
  onClick,
  loading,
  variant,
  disabled,
  ref,
}) => {
  return (
    <>
      <Button
        ref={ref}
        type={type}
        className={className}
        size={size}
        variant={variant}
        onClick={onClick}
        disabled={disabled ? disabled : loading}
      >
        {loading ? (
          <>
            <LoadingOutlined
              style={{ fontSize: 20, color: '#ffff' }}
              spin
              className="mr-2 size-4 animate-spin"
            />
            Please wait
          </>
        ) : (
          <>
            {icon} {children}
          </>
        )}
      </Button>
    </>
  );
};

export { ButtonInput };

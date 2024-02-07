import { cn } from '@/lib/utils';
import { BiCoffeeTogo } from 'react-icons/bi';

interface Props {
  color: any;
  size?: number;
  className?: string;
}

const AvatarCoffeeComponent: React.FC<Props> = ({
  color,
  size,
  className = 'h-10 w-10',
}) => {
  return (
    <>
      <BiCoffeeTogo className={cn('text-blue-400', className)} />
    </>
  );
};

export { AvatarCoffeeComponent };

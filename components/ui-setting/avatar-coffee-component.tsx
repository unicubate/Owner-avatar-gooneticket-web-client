import { cn } from '@/lib/utils';
import { CupSodaIcon } from 'lucide-react';

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
      <CupSodaIcon className={cn('text-blue-400', className)} />
    </>
  );
};

export { AvatarCoffeeComponent };

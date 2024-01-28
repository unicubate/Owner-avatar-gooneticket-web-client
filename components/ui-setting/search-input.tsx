import { Input } from '@/components/ui/input';

interface Props {
  onChange: any;
  className?: string;
  placeholder: string;
}

export const SearchInput: React.FC<Props> = ({
  onChange,
  className,
  placeholder,
}) => {
  return (
    <>
      <Input
        type="text"
        className={className}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

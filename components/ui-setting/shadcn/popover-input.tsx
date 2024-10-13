import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Props {
  description: string;
  children: React.ReactNode;
}

const PopoverInput = ({ description, children }: Props) => {
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          {/* <Button variant="outline">Open popover</Button> */}
        </PopoverTrigger>
        <PopoverContent className="w-full">{children}</PopoverContent>
      </Popover>
    </>
  );
};

export { PopoverInput };

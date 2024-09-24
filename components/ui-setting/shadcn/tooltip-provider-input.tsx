import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Props {
  description: string;
  children: React.ReactNode;
}

const TooltipProviderInput = ({ description, children }: Props) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent className="border-input">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export { TooltipProviderInput };

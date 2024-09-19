import { cn } from '@/lib/utils';
import { useState } from 'react';

interface HtmlParserProps {
  html: string;
  value: number;
  className?: string;
}

const ReadMore: React.FC<HtmlParserProps> = ({ html, value, className }) => {
  const lengthValue = html.length;
  const [isReadMore, setIsReadMore] = useState(true);

  return (
    <>
      {isReadMore ? html.slice(0, value) : html}
      {lengthValue > value && (
        <span
          onClick={() => setIsReadMore((lk) => !lk)}
          className={cn('cursor-pointer text-sm text-blue-600', className)}
        >
          {isReadMore ? '...read more' : ''}
        </span>
      )}
    </>
  );
};

export { ReadMore };

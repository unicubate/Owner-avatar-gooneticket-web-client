import { useState } from "react";

interface HtmlParserProps {
  html: string;
  value: number;
}

const ReadMore: React.FC<HtmlParserProps> = ({ html, value }) => {
  const lengthValue = html.length;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore((lk) => !lk);
  };
  return (
    <>
      {isReadMore ? html.slice(0, value) : html}
      {lengthValue > value && (
        <span
          onClick={toggleReadMore}
          className="text-sm text-blue-600 cursor-pointer"
        >
          {isReadMore ? "...read more" : " show less"}
        </span>
      )}
    </>
  );
};

export { ReadMore };

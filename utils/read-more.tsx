import { useState } from "react";

interface HtmlParserProps {
  html: string;
  value: number;
}

const ReadMore: React.FC<HtmlParserProps> = ({ html, value }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <>
      {isReadMore ? html.slice(0, value) : html}
      <span onClick={toggleReadMore} className="text-sm text-blue-600">
        {isReadMore ? "...read more" : " show less"}
      </span>
    </>
  );
};

export { ReadMore };

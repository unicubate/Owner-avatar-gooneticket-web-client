import parse, { HTMLReactParserOptions, domToReact } from 'html-react-parser';
import linkifyHtml from 'linkify-html';

interface HtmlParserProps {
  html: string;
  value?: number;
}

export const HtmlParser = ({ html, value }: HtmlParserProps) => {
  const options: HTMLReactParserOptions = {
    replace: (node: any) => {
      if (node.name === 'a') {
        return (
          <a
            href={node.attribs.href}
            style={{ color: 'blue' }} // Appliquez ici vos styles souhaités
          >
            {domToReact(node.children)}
          </a>
        );
      }
    },
  };

  const cleanHtmlString = linkifyHtml(value ? html.slice(0, value) : html, {
    className: {
      url: 'text-blue-500 hover:underline',
    },
  });
  // return <span className="ql-editor">{parse(cleanHtmlString, options)}</span>;
  return parse(cleanHtmlString, options);
};

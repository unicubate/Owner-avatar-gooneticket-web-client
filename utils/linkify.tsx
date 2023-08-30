import linkifyHtml from "linkify-html";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import DOMPurify from "dompurify";

export const Linkify = ({ children }: { children: string }) => {
    const options: HTMLReactParserOptions = {
        replace: (node: any) => {
          if (node.name === "a") {
            return (
              <a
                href={node.attribs.href}
                style={{ color: "blue" }} // Appliquez ici vos styles souhaités
              >
                {domToReact(node.children)}
              </a>
            );
          }
        },
      };
    
      const cleanHtmlString = linkifyHtml(children, {
        className: {
          url: "text-blue-500 hover:underline",
        },
      });
    
      const html = parse(cleanHtmlString, options);
      return html;
};
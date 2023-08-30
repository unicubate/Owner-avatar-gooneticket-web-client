import linkifyHtml from "linkify-html";
import parse, { HTMLReactParserOptions, domToReact } from "html-react-parser";
import DOMPurify from "dompurify";

interface HtmlParserProps {
  html: string;
}

const HtmlParser: React.FC<HtmlParserProps> = ({ html }) => {
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

  const cleanHtmlString = linkifyHtml(html, {
    className: {
      url: "text-blue-500 hover:underline",
    },
  });

  return parse(cleanHtmlString, options);
};

export { HtmlParser };
// export const Linkify = ({ children }: { children: string }) => {
//   const options: HTMLReactParserOptions = {
//     replace: (node: any) => {
//       if (node.name === "a") {
//         return (
//           <a
//             href={node.attribs.href}
//             style={{ color: "blue" }} // Appliquez ici vos styles souhaités
//           >
//             {domToReact(node.children)}
//           </a>
//         );
//       }
//     },
//   };

//   const cleanHtmlString = linkifyHtml(children, {
//     className: {
//       url: "text-blue-500 hover:underline",
//     },
//   });

//   const html = parse(cleanHtmlString, options);
//   return html;
// };

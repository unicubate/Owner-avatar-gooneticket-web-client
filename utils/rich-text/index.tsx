// import { parseRichText } from "./parser"
// import { fullParseOptions } from "./options"
import Markdown from "markdown-to-jsx";
import { MDOptions } from "./options";

export default function RichText({ string }: { string: string }) {
  // return <>{parseRichText(string, fullParseOptions)}</>
  return <Markdown options={MDOptions}>{string}</Markdown>;
}

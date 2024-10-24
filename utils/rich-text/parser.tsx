import IntlMessageFormat from "intl-messageformat";

export const parseRichText = (text: string, tags: any) => {
  return new IntlMessageFormat(String(text), "it").format(tags);
};

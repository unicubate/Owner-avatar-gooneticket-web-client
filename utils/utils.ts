export interface KeyAsString {
  [key: string]: string;
}

export interface KeyAsStringNumber {
  [key: string]: number;
}

export const capitalizeName = (s: string) => {
  if (typeof s !== 'string') return '';
  const v = s.toLowerCase();
  return v.charAt(0).toUpperCase() + v.slice(1);
};

export const getURLWithoutProtocol = (url: string): string =>
  url.replace(/^https?:\/\//, '');

export const capitalizeFirstLetter = (value: string): string => {
  const valueLower = String(value).toLowerCase();
  return valueLower.charAt(0).toUpperCase() + valueLower.slice(1);
};

export const convertToPluralMonth = (value: number): string =>
  Number(value) > 1 ? `${value} months` : `month`;

/** Fix date */
export const capitalizeOneFirstLetter = (a: string, b?: string) => {
  const fistLetter = capitalizeName(a).substring(0, 1).toUpperCase();
  const secondLetter = capitalizeName(b || '')
    .substring(0, 1)
    .toUpperCase();
  return `${fistLetter}${secondLetter}`;
};

export const capitalizeTruncateOneFirstLetter = (input: string) => {
  const words = input.split(' ');
  const initials = words.map((word) => word.charAt(0)).join('');
  return initials.toUpperCase();
};

/** Fix truncate */
export const truncateInput = (input: string, value: number) => {
  return input?.length > value ? `${input.substring(0, value)}...` : input;
};

export const truncateSubstring = (input: string, value: number) => {
  return input?.length > value ? input.substring(value) : input;
};

export const obfuscateEmail = (email: string): string => {
  const [localPart, domainPart] = email.split('@');
  const maskedLocalPart = `${localPart[0]}****${localPart.slice(-2)}`;
  return `${maskedLocalPart}@${domainPart}`;
};

export const filterImageAndFile = (options: {
  imageList?: any[];
  fileList?: any[];
}) => {
  let newFileLists: any = [];
  let newImageLists: any = [];
  const { imageList, fileList } = options;

  imageList
    ?.filter((file: any) => file?.status === 'success')
    .forEach((file: any) => {
      newImageLists.push(file);
    });

  fileList
    ?.filter((file: any) => file?.status === 'success')
    .forEach((file: any) => {
      newFileLists.push(file);
    });

  return { newFileLists, newImageLists };
};

export const itemsNumberArray = (value: number) =>
  Array.from({ length: value }, (_, index) => index);

export const maskIBAN = (iban: string): string => {
  const firstPart = iban.slice(0, 6);
  const lastPart = iban.slice(-4);

  const maskedPart = '***********';
  return iban.length < 10 ? iban : `${maskedPart}${lastPart}`;
};

export const isWebview = (ua: string): boolean => {
  const rules = [
    // if it says it's a webview, let's go with that
    'WebView',
    // iOS webview will be the same as safari but missing "Safari"
    '(iPhone|iPod|iPad)(?!.*Safari)',
    // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
    // Android KitKat to Lollipop webview will put Version/X.X Chrome/{version}.0.0.0
    'Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})',
    // old chrome android webview agent
    'Linux; U; Android',
  ];
  const webviewRegExp = new RegExp('(' + rules.join('|') + ')', 'ig');
  return !!ua.match(webviewRegExp);
};

import { DateTime } from 'luxon';

export const formateDate = (date: Date, locale: string) => {
  const todaysDate = new Date();
  const dateInit = DateTime.fromISO(String(date));
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.toFormat('yyyy'));
  return currentYear === dateYear
    ? dateInit.setLocale(locale).toFormat('dd LLL yyyy')
    : dateInit.setLocale(locale).toFormat('D');
};

export const formateDMYHH = (date: Date, locale: string) =>
  DateTime.fromJSDate(date).setLocale(locale).toFormat('dd LLL yyyy');

export const formateFromNow = (date: string, locale: string) =>
  DateTime.fromISO(date).setLocale(locale).toRelative();

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

export const formateFromNow = (date: Date, locale: string) => {
  const todaysDate = new Date();
  const dateInit = DateTime.fromISO(String(date));
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.toFormat('yyyy'));
  return currentYear === dateYear
    ? dateInit.setLocale(locale).toRelative()
    : dateInit.setLocale(locale).toFormat('D');
};

export const formateYYDDMM = (date: Date, locale: string) => {
  const dateInit = DateTime.fromISO(String(date));
  return dateInit.setLocale(locale).toFormat('cccc dd LLLL yyyy HH:mm');
};

export const formateToT = (date: Date) =>
  DateTime.fromJSDate(date).toFormat('T');

export const formateToRFC2822 = (date: Date, locale: string) =>
  DateTime.fromISO(String(date)).setLocale(locale).toFormat('DDDD');

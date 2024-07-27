import { DateTime } from 'luxon';

export const formateDate = (date: Date, locale: string) => {
  const todaysDate = new Date();
  const dateInit = DateTime.fromISO(String(date));
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.toFormat('yyyy'));
  return currentYear <= dateYear
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

export const formateToCccc = (date: Date, locale: string) =>
  DateTime.fromISO(String(date)).setLocale(locale).toFormat('cccc');

export const formateTodd = (date: Date, locale: string) =>
  DateTime.fromISO(String(date)).setLocale(locale).toFormat('dd');

export const formateToLLLL = (date: Date, locale: string) =>
  DateTime.fromISO(String(date)).setLocale(locale).toFormat('LLLL');

export const formateYYDDMM = (date: Date, locale: string) => {
  const dateInit = DateTime.fromISO(String(date));
  return dateInit.setLocale(locale).toFormat('cccc dd LLLL yyyy HH:mm');
};

export const formatDateDDMMYYToUtc = (date: Date, locale: string) => {
  const dateInit = DateTime.fromISO(String(date));
  return dateInit.setLocale(locale).toFormat('dd/LL/yyyy');
};

export const formateToRFC2822 = (date: Date, locale: string) =>
  DateTime.fromISO(String(date)).setLocale(locale).toFormat('DDDD');

export const viewYyformateToYyyy = (date: Date) => {
  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(DateTime.fromISO(String(date)).toFormat('yyyy'));
  return currentYear === dateYear ? null : `- ${dateYear}`;
};

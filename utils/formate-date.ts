import dayjs from 'dayjs';
import { DateTime } from 'luxon';

export const formateDate = (date: Date, locale: string) => {
  const todaysDate = new Date();
  const dateInit = DateTime.fromISO(String(date));
  const currentYear = todaysDate.getFullYear();
  const dateYear = Number(dateInit.toFormat('yyyy'));
  return currentYear === dateYear
    ? dateInit.setLocale(locale).toFormat('dd LLLL')
    : dateInit.setLocale(locale).toFormat('dd LLL yyyy');
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

export const formateddLLLyyyyHHmm = (date: Date, locale: string) => {
  const todaysDate = new Date();
  const currentYear = todaysDate.getFullYear();
  const dateInit = DateTime.fromISO(String(date));
  const dateYear = Number(dateInit.toFormat('yyyy'));
  return currentYear === dateYear
    ? dateInit.setLocale(locale).toFormat('dd LLL HH:mm')
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
  const dateYear = DateTime.fromISO(String(date)).toFormat('yyyy');
  return currentYear === Number(dateYear) ? null : `- ${dateYear}`;
};

export const dateTimeNowUtc = () => DateTime.utc().toJSDate();

export const monthTimeNowUtc = (date: Date) =>
  dayjs(date).format('MM') as unknown as Date;

export const dayTimeNowUtc = (date: Date) =>
  dayjs(date).format('DD') as unknown as Date;

export const formatYYMMDDDateDaysJS = (date: Date) =>
  dayjs(date).format('YYYY-MM-DD') as unknown as Date;

export const addDaysToTimeNowUtcDate = (dayNumber: number) =>
  DateTime.utc().plus({ days: dayNumber }).toJSDate();

export const formateMMLongDate = (date: Date, locale: string) => {
  return DateTime.fromJSDate(date)
    .setLocale(locale)
    .toLocaleString({ month: 'long' });
};

export const formateDDDate = (date: Date, lang: string) => {
  return DateTime.fromJSDate(date).setLocale(lang).toFormat('DD');
};

export const formateddLLDate = (date: Date, lang: string) => {
  return DateTime.fromJSDate(date).setLocale(lang).toFormat('dd LLL');
};

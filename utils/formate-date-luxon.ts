import { DateTime, DurationLike } from 'luxon';

export const subtractYears = (numOfYears: number, date: Date) => {
    const dateSub = new Date(date.getTime());
    dateSub.setFullYear(dateSub.getFullYear() - numOfYears);
    return dateSub;
};

export const formateYYMMDDDate = (date: Date) => {
    return DateTime.fromJSDate(date).toFormat('yyyy/LL/dd');
};

// export const formatetoUnixIntegerToYYMMDDDate = (date: string) => {
//     return DateTime.fromFormat(date, 'yyyy-mm-dd').toISO() as unknown as Date;
// };

export const formateNowDateYYMMDD = (date: Date) =>
    DateTime.fromJSDate(date).toFormat('yyyyLLdd');

export const dateTimeNowUtc = () => DateTime.utc().toJSDate();

export const dateTimeNowUtcEndDay = () =>
    DateTime.utc().endOf('day').toJSDate();

export const addMinutesToDateTimeNowUtc = (minutes: number) =>
    DateTime.utc().plus({ minutes: minutes }).toJSDate();

export const addMonthsToDateTimeNowUtc = (months: number) =>
    DateTime.utc().plus({ month: months }).endOf('day').toJSDate();

export const stringDateFormateYYMMDDUtc = (date: string) => {
    return DateTime.fromFormat(date, 'dd/MM/yyyy').toISO() as unknown as Date;
};

export const addDaysToTimeNowUtcDate = (dayNumber: number) => {
    return DateTime.utc().plus({ days: dayNumber }).toJSDate();
};

export const addDaysToTimeNowUtcUnixInteger = (dayNumber: number) => {
    return DateTime.utc().plus({ days: dayNumber }).toUnixInteger();
};

export const addToDateUtc = ({
    date,
    plus,
}: {
    date: Date;
    plus: DurationLike;
}) => {
    return DateTime.fromISO(DateTime.fromJSDate(date).toString())
        .plus(plus)
        .toUTC()
        .toJSDate();
};

export const addDaysToDateUtcUnixInteger = (options: {
    date: Date;
    dayNumber: number;
}) => {
    const { date, dayNumber } = options;
    const dateFormate = String(DateTime.fromJSDate(date));
    return DateTime.fromISO(dateFormate)
        .plus({ days: dayNumber })
        .toUnixInteger();
};

export const substrateDaysToTimeNowUtcDate = (dayNumber: number) => {
    return DateTime.utc().minus({ days: dayNumber }).toJSDate();
};

export const substrateDaysToTimeNowUtcUnixInteger = (dayNumber: number) => {
    return DateTime.utc().minus({ days: dayNumber }).toUnixInteger();
};

export const formateNowDateUnixInteger = (date: Date) => {
    return DateTime.fromJSDate(date).toUnixInteger() as unknown as number;
};
export const fromIsoToYYYYMMDD = (date: Date) => {
    return DateTime.fromISO(date as unknown as string).toFormat('yyyy/LL/dd');
};

export const dateTimeNowUtcUnixInteger = () =>
    DateTime.fromISO(DateTime.utc().toISO() as string).toUnixInteger();

export const formatDateToUtc = (date: string) => {
    return DateTime.fromFormat(date, 'yyyy-mm-dd').toISO() as unknown as Date;
};

export const formatUnixIntegerToUtc = (date: number) => {
    return DateTime.fromSeconds(date).toISO() as unknown as Date;
};

/* eslint-disable jsx-a11y/anchor-is-valid */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts';

// import { GetStatisticOrdersAPI } from '@/api-site/statistic';
import { GetStatisticsAffiliationsActivitiesAPI } from '@/api-site/statistic';
import { useInputState } from '@/components/hooks';
import { Button } from '@/components/ui/button';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { dateTimeNowUtc, formateMMLongDate, monthTimeNowUtc } from '@/utils';
import { capitalizeFirstLetter } from '@/utils/utils';
import { isPositive } from 'class-validator';
import { CalendarCheckIcon } from 'lucide-react';
import { Fragment, useState } from 'react';

const chartConfig = {
  desktop: {
    color: '#2563eb',
  },
  mobile: {
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export function StatisticAffiliationsActivities() {
  const { locale, t, userStorage: user } = useInputState();
  const [years, seYears] = useState<string>(
    `${dateTimeNowUtc().getFullYear()}`,
  );
  const [months, setMonths] = useState<string>(
    `${monthTimeNowUtc(new Date())}`,
  );

  const { data: statistics } = GetStatisticsAffiliationsActivitiesAPI({
    year: years,
    lang: locale,
    month: months,
    isGraphic: 'true',
    byCreatedAt: 'true',
  });

  const { data: statisticsMo } = GetStatisticsAffiliationsActivitiesAPI({
    year: years,
    lang: locale,
    isGraphic: 'true',
    byCreatedAt: 'true',
  });

  return (
    <>
      {statisticsMo?.length > 0 ? (
        <Card className="dark:border-input dark:bg-background mt-6">
          <CardHeader className="px-6 py-2">
            <div className="flex items-center">
              <CardHeader className="p-2">
                {/* <CardTitle className="text-lg">
             {t.formatMessage(
               {
                 id: 'UTIL.STATISTIC.GRAPHIC.COLLECTION',
               },
               { currency: user?.profile?.currency?.code },
             )}
           </CardTitle> */}
                <CardDescription>
                  {isPositive(Number(months))
                    ? capitalizeFirstLetter(
                        formateMMLongDate(
                          new Date(`${years}-${months}-01`),
                          locale,
                        ),
                      )
                    : null}
                </CardDescription>
              </CardHeader>

              <div className="ml-auto items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <CalendarCheckIcon className="size-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        {isPositive(Number(months))
                          ? formateMMLongDate(
                              new Date(`${years}-${months}-01`),
                              locale,
                            )
                          : months}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-auto dark:border-gray-800">
                    {statisticsMo?.map((item: any, index: number) => (
                      <Fragment key={index}>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              setMonths(item?.dateNumeric);
                            }}
                          >
                            <span className="cursor-pointer">{item?.date}</span>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                      </Fragment>
                    ))}

                    <DropdownMenuItem
                      onClick={() => {
                        setMonths(
                          t.formatMessage({ id: 'TRANSACTION.ALL_TIME' }),
                        );
                      }}
                    >
                      <span className="cursor-pointer">
                        {t.formatMessage({ id: 'TRANSACTION.ALL_TIME' })}
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <ChartContainer
              className="lg:h-[250px] lg:w-full"
              config={chartConfig}
            >
              <LineChart
                accessibilityLayer
                data={statistics}
                margin={{
                  top: 20,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={true} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <YAxis tickLine={false} tickMargin={10} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                  // labelFormatter={(value) => {
                  //   return isPositive(Number(day))
                  //     ? formateHHmm(value, locale)
                  //     : value;
                  // }}
                />
                <Line
                  dataKey="amount"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: 'var(--color-desktop)',
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ) : null}
    </>
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
import { viewOneFileUploadAPI } from '@/api-site/upload';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AffiliationModel } from '@/types/affiliation';
import { ReadMore } from '@/utils/read-more';
import { capitalizeFirstLetter } from '@/utils/utils';
import { MoreHorizontalIcon, ShareIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  formateToCccc,
  formateToLLLL,
  formateTodd,
  viewYyformateToYyyy,
} from '../../../utils/formate-date';
import { useInputState } from '../../hooks';
import { CopyShareLink, SwiperImage } from '../../ui-setting';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

type Props = {
  item?: AffiliationModel;
  index: number;
};

const ListEventsAffiliations = ({ item, index }: Props) => {
  const { push } = useRouter();
  const [copied, setCopied] = useState(false);
  const { t, isOpen, setIsOpen, locale, userStorage: user } = useInputState();

  return (
    <>
      <div key={index} className="py-3">
        <div className="flex items-center">
          <div className="relative shrink-0 cursor-pointer">
            {item?.oneUploadImagesEvent ? (
              <SwiperImage
                height="64px"
                width="80px"
                src={`${viewOneFileUploadAPI({
                  folder: String(item?.event?.model.toLocaleLowerCase()),
                  fileName: String(item?.oneUploadImagesEvent?.path),
                })}`}
                alt={String(item?.event?.title)}
              />
            ) : null}
          </div>

          {item?.oneEventDate ? (
            <div className="ml-2 min-w-0 flex-1 cursor-pointer">
              <div className="sm:flex sm:items-center sm:justify-between">
                <div className="sm:mt-0">
                  <div className="flex items-center">
                    <p className="text-5xl font-semibold text-blue-700">
                      {formateTodd(
                        item?.oneEventDate?.startedAt as Date,
                        locale,
                      )}
                    </p>
                    <div className="ml-2 cursor-pointer text-sm font-medium text-gray-600">
                      <div>
                        {capitalizeFirstLetter(
                          formateToLLLL(
                            item?.oneEventDate?.startedAt as Date,
                            locale,
                          ),
                        )}
                        <span className="ml-1.5">
                          {viewYyformateToYyyy(
                            item?.oneEventDate?.startedAt as Date,
                          )}
                        </span>
                      </div>
                      <div className="mt-1">
                        <span>
                          {capitalizeFirstLetter(
                            formateToCccc(
                              item?.oneEventDate?.startedAt as Date,
                              locale,
                            ),
                          )}
                        </span>
                        ,
                        <span className="ml-1">
                          {item?.oneEventDate?.timeInit}
                        </span>
                        {item?.oneEventDate?.timeEnd ? (
                          <>
                            <span className="ml-1">-</span>
                            <span className="ml-1">
                              {' '}
                              {item?.oneEventDate?.timeEnd}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="mt-1.5 text-sm font-medium text-gray-600">
                    <span>
                      {capitalizeFirstLetter(
                        String(item?.oneEventDate?.address),
                      )}
                    </span>
                    <span className="ml-1">-</span>
                    <span className="ml-1">
                      {capitalizeFirstLetter(String(item?.oneEventDate?.city))}
                    </span>
                    <span className="ml-1">-</span>
                    <span className="ml-1">
                      {capitalizeFirstLetter(
                        String(item?.oneEventDate?.country),
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Badge className="h-6 rounded-sm" variant="destructive">
              <span className="text-sm">No date available</span>
            </Badge>
          )}

          <div className="ml-auto py-4 text-right text-sm font-normal text-gray-600">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button type="button" size="icon" variant="ghost">
                  <MoreHorizontalIcon className="size-5 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-background w-16 dark:border-gray-800">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setCopied(true)}>
                    <ShareIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                    <span className="ml-2 cursor-pointer hover:text-indigo-600">
                      {t.formatMessage({ id: 'UTIL.SHARE' })}
                    </span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                //onClick={() => push(`/affiliations/${item?.id}/event`)}
                >
                  <EyeIcon className="size-4 text-gray-600 hover:text-indigo-600" />
                  <span className="ml-2 cursor-pointer hover:text-indigo-600">
                    View
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator /> */}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-1 flex items-center">
          {item?.event?.title ? (
            <p className="text-lg font-bold">
              <ReadMore html={String(item?.event?.title ?? '')} value={100} />
            </p>
          ) : null}
        </div>
      </div>
      {/**** Copy and delete *****/}
      <CopyShareLink
        isOpen={copied}
        setIsOpen={setCopied}
        link={`${process.env.NEXT_PUBLIC_SITE}/events/${item?.event?.slug}?partner=${item?.code}`}
      />
    </>
  );
};

export { ListEventsAffiliations };

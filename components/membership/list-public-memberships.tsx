/* eslint-disable jsx-a11y/anchor-is-valid */
import { MembershipModel } from '@/types/membership';
import { HtmlParser } from '@/utils/html-parser';
import { convertToPluralMonth } from '@/utils/utils';
import { useRouter } from 'next/router';
import { useInputState } from '../hooks';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput } from '../ui-setting';

type Props = {
  item: MembershipModel;
};

const ListPublicMemberships = ({ item }: Props) => {
  const { userStorage } = useInputState();
  const { push, pathname } = useRouter();

  const linkHref = `${process.env.NEXT_PUBLIC_SITE}/checkouts/${item?.id}/membership?username=${item?.profile?.username}`;
  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden bg-white shadow-xl  dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          <div className="flex items-center justify-center">
            {item?.id ? (
              <p className="cursor-pointer text-xl font-bold">
                {item?.title ?? ''}
              </p>
            ) : null}
          </div>

          {item?.uploadsImages?.length > 0 ? (
            <div className="mx-auto mt-4 justify-center text-center">
              <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder="memberships"
                preview={false}
                height={250}
              />
            </div>
          ) : null}

          <div className="mt-2 flex items-end justify-center space-x-1">
            <div className="flex items-start">
              <p className="text-5xl font-medium tracking-tight">
                {item?.price}
              </p>
              <span className="text-xl font-medium text-black dark:text-white">
                {item?.currency?.symbol}
              </span>
            </div>
            <span className="ml-0.5 text-lg text-black dark:text-white">
              {' '}
              per {convertToPluralMonth(Number(item?.month))}{' '}
            </span>
          </div>

          <div className="mx-auto mt-4 justify-center text-center">
            <div className="sm:mt-0">
              <ButtonInput
                onClick={() => {
                  userStorage?.id
                    ? push(
                        `/checkouts/${item?.id}/membership?username=${item?.profile?.username}`,
                      )
                    : push(`/login${pathname ? `?redirect=${linkHref}` : ''}`);
                }}
                type="button"
                className="w-full"
                size="lg"
                variant="info"
              >
                Join
              </ButtonInput>
            </div>
          </div>

          <div className="mt-4 text-sm font-normal text-gray-600 dark:text-gray-300">
            <HtmlParser html={String(item?.description)} />
          </div>
        </div>
      </div>
    </>
  );
};
export { ListPublicMemberships };

import { HtmlParser } from '@/utils/html-parser';
import 'react-h5-audio-player/lib/styles.css';
import { CopyShareLink } from '../ui-setting';
import { ListCarouselUpload } from '../ui-setting/list-carousel-upload';

import { EventModel } from '@/types/event';
import { ShareIcon } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ListEventDatesForEventDate } from '../event-date/list-event-dates-for-event-date';
import { useInputState } from '../hooks';

type Props = {
  item: EventModel;
};

const ViewOneEvent = ({ item }: Props) => {
  const { isOpen, setIsOpen, locale, userStorage } = useInputState();

  return (
    <>
      <div
        key={item?.id}
        className="my-8 overflow-hidden rounded-lg border border-gray-100 bg-white dark:border-input dark:bg-background"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          {item?.uploadsImages?.length > 0 ? (
            <div className="group relative mx-auto mt-2 justify-center text-center">
              <ListCarouselUpload
                uploads={item?.uploadsImages}
                folder={String(item?.model.toLocaleLowerCase())}
                height="400px"
              />
            </div>
          ) : null}

          {item?.title ? (
            <div className="mt-2 text-2xl font-bold">{item?.title ?? ''}</div>
          ) : null}

          <div className="mt-4 space-y-4">
            <ListEventDatesForEventDate
              event={{
                organizationId: item?.organizationId,
                id: item?.id,
                slug: item?.slug,
              }}
            />
          </div>

          {item?.description ? (
            <div
              className={`group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
            >
              <span className={`ql-editor`}>
                <HtmlParser html={String(item?.description ?? '')} />
              </span>
            </div>
          ) : null}

          {item?.urlMedia ? (
            <div className={`mx-auto mt-1`}>
              <ReactPlayer
                className={`mr-auto`}
                url={item?.urlMedia}
                height="350px"
                width="100%"
                controls
              />
            </div>
          ) : null}

          <div className="mt-2 flex items-center font-medium text-gray-600">
            <ShareIcon
              onClick={() => setIsOpen(true)}
              className="size-6 cursor-pointer hover:text-gray-400 focus:ring-gray-900"
            />
            {/* <span className="ml-2 text-sm">
              {item?.totalComment > 0 ? item?.totalComment : ''}
            </span> */}

            <CopyShareLink
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              link={window.location.href}
              // buttonDialog={
              //   <ButtonInput
              //     className="text-gray-600 hover:text-gray-400 focus:ring-gray-900"
              //     variant="link"
              //     type="button"
              //     size="icon"
              //   >
              //     <ShareIcon className="size-6" />
              //   </ButtonInput>
              // }
            />
          </div>

          {/* <ListComments
            model="EVENT"
            modelIds={['EVENT']}
            take={6}
            userVisitorId={userStorage?.id}
            organizationId={item?.organizationId}
            eventId={item?.id}
          /> */}
        </div>
      </div>
    </>
  );
};

export { ViewOneEvent };

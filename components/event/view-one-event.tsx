import 'react-h5-audio-player/lib/styles.css';
import { CopyShareLink } from '../ui-setting';

import { EventModel } from '@/types/event';
import RichText from '@/utils/rich-text';
import { ShareIcon } from 'lucide-react';
import ReactPlayer from 'react-player';
import { ListEventDatesForEventDate } from '../event-date/list-event-dates-for-event-date';
import { useInputState } from '../hooks';
import { ListCarouselUploadMini } from '../ui-setting/list-carousel-upload-mini';

type Props = {
  item: EventModel;
};

const ViewOneEvent = ({ item }: Props) => {
  const { isOpen, setIsOpen, locale, userStorage } = useInputState();

  return (
    <>
      <div className="p-8 sm:px-8 sm:py-7">
        {item?.uploadsImages?.length > 0 ? (
          <div className="group relative mx-auto mt-2 justify-center text-center">
            <ListCarouselUploadMini
              uploads={item?.uploadsImages}
              folder={String(item?.model.toLocaleLowerCase())}
              height="300px"
            />
          </div>
        ) : null}

        <div className="mt-2 text-xl font-bold">{item.title}</div>

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
            className={`mt-2 group relative text-sm font-normal text-gray-600 dark:text-gray-300`}
          >
            <RichText string={item?.description} />
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
    </>
  );
};

export { ViewOneEvent };

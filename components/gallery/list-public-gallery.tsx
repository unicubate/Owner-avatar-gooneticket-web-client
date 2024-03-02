/* eslint-disable jsx-a11y/anchor-is-valid */
import { PostModel } from '@/types/post';
import { UserVisitorModel } from '@/types/user.type';
import { useState } from 'react';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ShowModalGallery } from './show-modal-gallery';

type Props = {
  item?: PostModel;
  userVisitor: UserVisitorModel;
};

export function ListPublicGallery(props: Props) {
  const { item, userVisitor } = props;
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="group relative" key={item?.id}>
        <a
          href={void 0}
          title={item?.title}
          onClick={() => setOpenModal(true)}
          className="aspect-w-16 aspect-h-9 block overflow-hidden"
        >
          {item?.uploadsImages && item?.uploadsImages.length > 0 ? (
            <ListCarouselUpload
              post={item}
              uploads={item?.uploadsImages}
              folder="posts"
              preview={false}
              height={250}
              className={`object-cover ${
                item?.whoCanSee === 'MEMBERSHIP' && item?.isValidSubscribe !== 1
                  ? 'blur-xl'
                  : ''
              }`}
            />
          ) : null}
        </a>
      </div>

      {openModal && item?.id ? (
        <ShowModalGallery
          openModal={openModal}
          setOpenModal={setOpenModal}
          post={item}
          userVisitorId={userVisitor?.id ?? ''}
        />
      ) : null}
    </>
  );
}

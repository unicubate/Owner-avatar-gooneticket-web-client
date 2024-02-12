/* eslint-disable jsx-a11y/anchor-is-valid */
import { CommissionModel } from '@/types/commission';
import { HtmlParser } from '@/utils/html-parser';
import { MailPlusIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { LoginModal } from '../auth-modal/login-modal';
import { CreateCommentCommissionModal } from '../comment/create-comment-commission-modal';
import { useInputState } from '../hooks';
import { ListCarouselUpload } from '../shop/list-carousel-upload';
import { ButtonInput } from '../ui-setting';

type Props = {
  item: CommissionModel;
};

const ListPublicCommissions: React.FC<Props> = ({ item }) => {
  const { push } = useRouter();
  const { isOpen, setIsOpen, userStorage } = useInputState();
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);

  return (
    <>
      <div
        key={item?.id}
        className="mt-8 overflow-hidden rounded-lg bg-white dark:bg-[#121212]"
      >
        <div className="p-8 sm:px-8 sm:py-7">
          <div className="flex items-center">
            {item?.id ? (
              <span className="cursor-pointer text-lg font-bold dark:text-white">
                {item?.title ?? ''}
              </span>
            ) : null}

            <div className="ml-auto">
              <ButtonInput
                onClick={() => setIsOpenComment(true)}
                type="button"
                variant="info"
              >
                <MailPlusIcon />
              </ButtonInput>
            </div>
            <div className="ml-2">
              <ButtonInput type="button" variant="danger">
                {Number(item?.price ?? 0)} {item?.currency?.symbol ?? ''}
              </ButtonInput>
            </div>
          </div>

          <div className="text-sm font-normal text-gray-600 dark:text-gray-300">
            <span className={`ql-editor`}>
              <HtmlParser html={String(item?.description)} />
            </span>
          </div>
          <div className="mx-auto mt-4 justify-center text-center">
            <ListCarouselUpload
              uploads={item?.uploadsImages}
              folder="commissions"
              height={400}
            />
          </div>

          <div className="mx-auto mt-6 justify-center text-center">
            <div className="sm:mt-0">
              <ButtonInput
                type="button"
                size="lg"
                className="w-full"
                variant="info"
                onClick={() => {
                  userStorage?.id
                    ? push(
                        `/checkouts/${item?.id}/commission?username=${item?.profile?.username}`,
                      )
                    : setIsOpen(true);
                }}
              >
                Request this
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>

      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <CreateCommentCommissionModal
        isOpen={isOpenComment}
        commission={item as any}
        setIsOpen={setIsOpenComment}
      />
    </>
  );
};

export default ListPublicCommissions;

'use client';

import { DeleteOneAffiliationAPI } from '@/api-site/affiliation';
import { AffiliationModel } from '@/types/affiliation';
import { AlertDangerNotification, AlertSuccessNotification } from '@/utils';
import { ReadMore } from '@/utils/read-more';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { formateFromNow } from '../../utils/formate-date';
import { useInputState } from '../hooks';
import { ButtonInput } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';
import { ButtonCopy } from '../ui-setting/button-copy';
import { ActionModalDialog } from '../ui-setting/shadcn';
import { CreateOrUpdateAffiliation } from './create-or-update-affiliation';

type Props = {
  item: AffiliationModel;
  index: number;
};

export const ListAffiliations = ({ item, index }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { isOpen, setIsOpen, loading, setLoading, locale } = useInputState();
  const router = useRouter();

  const { mutateAsync: saveMutation } = DeleteOneAffiliationAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const deleteItem = async (item: any) => {
    setLoading(true);
    setIsOpen(true);
    try {
      await saveMutation({ affiliationId: item?.id });
      AlertSuccessNotification({
        text: 'Image deleted successfully',
      });
      setLoading(false);
      setIsOpen(false);
    } catch (error: any) {
      setLoading(false);
      setIsOpen(true);
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      {/* <div key={index} className="divide-gray-200 py-4">
        <div className="flex items-center">
          <div className="ml-3 min-w-0 flex-1 cursor-pointer">
            <div className="flex items-center text-gray-600">
              <button className="tex-sm">
                <AiOutlineCalendar />
              </button>
              <span className="ml-1.5 text-sm font-normal">
                {formateDate(item?.createdAt as Date, locale)}
              </span>
            </div>

            <div className="flex items-center">
              {item?.product?.title ? (
                <p className="mt-2 text-lg font-bold">
                  <ReadMore
                    html={String(item?.product?.title ?? '')}
                    value={100}
                  />
                </p>
              ) : null}
            </div>

            <div className="mt-2 flex items-center text-gray-600">
              <span className="font-bold">
                <MailIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm">{item?.profile?.email}</span>

              <span className="ml-1.5 font-bold">
                <PercentIcon className="size-4" />
              </span>
              <span className="ml-1.5 text-sm">{item?.percent}</span>
            </div>
          </div>

          <div className="py-4 text-right text-sm font-medium">
            <ButtonCopy
              size="icon"
              variant="ghost"
              title="Copy link"
              link={`${process.env.NEXT_PUBLIC_SITE}/shop/${item?.product?.slug}?affiliate=${item?.code}/`}
              iconClassName="size-4 text-gray-600 hover:text-green-600"
            />

            <ButtonInput
              variant="ghost"
              type="button"
              size="icon"
              icon={
                <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
              }
              onClick={() => setShowModal(true)}
            />

            <ActionModalDialog
              title="Delete?"
              loading={loading}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClick={() => deleteItem(item)}
              description="Are you sure you want to delete this?"
              buttonDialog={
                <ButtonInput
                  variant="ghost"
                  type="button"
                  size="icon"
                  icon={
                    <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                  }
                />
              }
            />
          </div>
        </div>
      </div> */}

      <tr key={index}>
        <td className="py-4 text-sm font-bold">
          <div className="flex min-w-0 flex-1 items-center">
            <AvatarComponent size={45} profile={item?.profile} />

            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {`${item?.profile?.firstName} ${item?.profile?.lastName}`}
              </p>
              <p className="mt-1 hidden text-sm font-medium  text-gray-600 sm:table-cell">
                {item?.profile?.email}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600 sm:hidden">
                <ReadMore html={`${item?.profile?.email}`} value={18} />
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 lg:hidden">
                {formateFromNow(item?.createdAt as Date, locale)}
              </p>
            </div>
          </div>
        </td>

        <td className="hidden text-left text-sm font-medium dark:text-white lg:table-cell">
          {item?.percent} %
        </td>

        <td className="hidden text-right text-sm font-bold dark:text-white lg:table-cell">
          {/* <SerialPrice
            className="text-sm"
            value={Number(item?.amount)}
            currency={{ code: String(item?.currency) }}
          /> */}
        </td>

        <td className="hidden text-right text-sm font-medium lg:table-cell">
          12
        </td>
        <td className="hidden text-right text-sm font-medium lg:table-cell">
          200 EUR
        </td>
        <td className="hidden text-right text-sm font-medium text-gray-600 lg:table-cell">
          {formateFromNow(item?.createdAt as Date, locale)}
        </td>

        <td className="py-4 text-right text-sm font-medium">
          <ButtonCopy
            size="icon"
            variant="ghost"
            title="Copy link"
            link={`${process.env.NEXT_PUBLIC_SITE}/shop/${item?.product?.slug}?affiliate=${item?.code}/`}
            iconClassName="size-4 text-gray-600 hover:text-green-600"
          />

          <ButtonInput
            variant="ghost"
            type="button"
            size="icon"
            icon={
              <PencilIcon className="size-4 text-gray-600 hover:text-indigo-600" />
            }
            onClick={() => setShowModal(true)}
          />

          <ActionModalDialog
            title="Delete?"
            loading={loading}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClick={() => deleteItem(item)}
            description="Are you sure you want to delete this?"
            buttonDialog={
              <ButtonInput
                variant="ghost"
                type="button"
                size="icon"
                icon={
                  <TrashIcon className="size-4 text-gray-600 hover:text-red-600" />
                }
              />
            }
          />

          <div className="mt-1 pt-1 lg:hidden">
            <p className="inline-flex">12</p>
            <p className="ml-2 inline-flex text-gray-600">|</p>
            <p className="ml-2 inline-flex text-sm font-bold">
              {/* <SerialPrice
                className="text-sm"
                value={Number(item?.amount)}
                currency={{ code: String(item?.currency) }}
              /> */}
              2003982 EUR
            </p>
          </div>
        </td>
      </tr>

      {showModal ? (
        <CreateOrUpdateAffiliation
          showModal={showModal}
          setShowModal={setShowModal}
          affiliation={item}
          productId={item.productId}
        />
      ) : null}
    </>
  );
};

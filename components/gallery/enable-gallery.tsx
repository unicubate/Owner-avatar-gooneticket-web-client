/* eslint-disable jsx-a11y/anchor-is-valid */
import { UpdateEnableProfileAPI } from '@/api-site/user';
import { AlertDangerNotification } from '@/utils';
import { useState } from 'react';
import { ButtonInput } from '../ui-setting';

type Props = {
  profile?: any;
};

export const EnableGallery = ({ profile }: Props) => {
  const [isOpen, setIsOpen] = useState(profile?.enableGallery);

  // Create or Update data
  const { mutateAsync: saveMutation } = UpdateEnableProfileAPI({
    onSuccess: () => {},
    onError: (error?: any) => {},
  });

  const enableItem = async () => {
    try {
      await saveMutation({
        enableGallery: true,
        profileId: profile?.id,
      });
    } catch (error: any) {
      AlertDangerNotification({
        text: `${error.response.data.message}`,
      });
    }
  };

  return (
    <>
      <div
        className={`mt-8 rounded-lg border ${isOpen ? 'bg-indigo-50 dark:bg-indigo-100' : 'bg-red-100'} border-${isOpen ? 'indigo-300' : 'red-500'} `}
      >
        <div className="px-4 py-5 sm:p-3">
          <div className="md:flex md:items-center md:justify-between">
            <div className="max-w-xs flex-1 md:mt-0">
              <p className="text-base font-bold text-gray-600">
                Shop {isOpen ? 'Open' : 'Close'}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                {isOpen
                  ? 'Gallery are currently active. Your fans can request them from your page.'
                  : 'Your gallery are currently private and are not available for public.'}
              </p>
            </div>
            <div className="mt-4 flex items-center justify-start space-x-6 md:ml-auto md:mt-0 md:justify-end md:space-x-reverse">
              <ButtonInput
                type="button"
                className="w-full"
                size="sm"
                variant={isOpen ? 'info' : 'danger'}
                onClick={() => {
                  enableItem();
                  setIsOpen((lk: boolean) => !lk);
                }}
              >
                {isOpen ? 'Click to close' : 'Click to open'}
              </ButtonInput>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

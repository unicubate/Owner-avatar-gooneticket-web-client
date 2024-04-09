import {
  downloadOneFileUploadAPI,
  viewOneFileUploadAPI,
} from '@/api-site/upload';
import { OrderItemModel } from '@/types/order-item';
import { formateDate } from '@/utils';
import { HtmlParser } from '@/utils/html-parser';
import { ReadMore } from '@/utils/read-more';
import { Image } from 'antd';
import {
  CalendarIcon,
  CheckIcon,
  CopyIcon,
  DownloadIcon,
  HashIcon,
  LinkIcon,
  PaperclipIcon,
  XIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import prettyBytes from 'pretty-bytes';
import { useState } from 'react';
import { useInputState } from '../hooks';
import { ButtonInput, SerialPrice } from '../ui-setting';
import { AvatarComponent } from '../ui-setting/ant';

const OrderItemUserModal = (props: {
  isOpen: boolean;
  setIsOpen: any;
  item: OrderItemModel;
}) => {
  const { locale } = useInputState();
  const { isOpen, setIsOpen, item } = props;
  const { push } = useRouter();
  const linkCopy = item?.product?.urlRedirect;
  const [copied, setCopied] = useState(false);
  const copyToClipBoard = async (link: string) => {
    await navigator.clipboard.writeText(link);
  };

  return (
    <>
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative  m-auto w-full max-w-3xl rounded-xl bg-white p-5 shadow-lg  dark:bg-[#121212] overflow-y-scroll max-h-screen">
            <button
              className="float-right border-0 bg-transparent text-black"
              onClick={() => setIsOpen((lk: boolean) => !lk)}
            >
              <span className="opacity-7 block size-6 rounded-full py-0 text-xl  dark:text-white">
                <XIcon />
              </span>
            </button>
            <div className="py-6">
              <div className="flex items-center">
                <div className="relative shrink-0 cursor-pointer">
                  {item?.uploadsImages?.length > 0 ? (
                    <div className="flex-shrink-0">
                      <Image
                        width={100}
                        height={70}
                        preview={false}
                        className="rounded-md"
                        src={`${viewOneFileUploadAPI({
                          folder: 'products',
                          fileName: item?.uploadsImages[0]?.path,
                        })}`}
                        alt=""
                      />
                    </div>
                  ) : null}
                </div>
                <div className="ml-2 cursor-pointer">
                  <div className="flex items-center text-gray-600">
                    <button className="tex-sm">
                      <CalendarIcon className="size-4" />
                    </button>
                    <span className="ml-1.5 text-sm font-normal">
                      {formateDate(item?.createdAt as Date, locale)}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center">
                    {item?.product?.title ? (
                      <p className="text-lg font-bold text-gray-600 dark:text-white">
                        <ReadMore
                          html={`${item?.product?.title}`}
                          value={100}
                        />
                      </p>
                    ) : null}
                  </div>
                  <div className="mt-2 flex items-center text-gray-600">
                    <button className="tex-sm">
                      <HashIcon className="size-4" />
                    </button>
                    <span className="ml-1.5 text-sm font-normal">
                      {item?.orderNumber}
                    </span>
                  </div>
                </div>

                <div className="ml-auto">
                  <p className="mt-1 flex min-w-0 flex-1 items-center text-sm font-bold text-gray-600">
                    {item?.profileSeller ? (
                      <AvatarComponent
                        size={50}
                        profile={item?.profileSeller}
                      />
                    ) : null}
                    <div className="ml-2 min-w-0 flex-1">
                      <p className="text-sm font-bold dark:text-white">
                        {item?.profileSeller?.firstName}{' '}
                        {item?.profileSeller?.lastName}
                      </p>
                    </div>
                  </p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <div className="flex items-center">
                <h2 className="font-bold text-base">Price</h2>

                <div className="ml-auto">
                  <SerialPrice
                    className="font-bold text-lg"
                    value={Number(item?.priceDiscount)}
                    currency={{ code: String(item?.currency) }}
                  />
                </div>
              </div>
            </div>

            <div className="py-2">
              <h2 className="font-bold text-base">Message from creator</h2>
              <div className="mt-4 flex items-center">
                <HtmlParser
                  html={String(item?.product?.messageAfterPayment ?? '')}
                />
              </div>
            </div>

            {item?.product?.productType === 'DIGITAL' ? (
              <>
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {item?.uploadsFiles?.length > 0 &&
                    item?.uploadsFiles.map((upl, index: number) => (
                      <div className="py-4" key={index}>
                        <div className="flex items-center">
                          <div className="relative shrink-0 cursor-pointer">
                            <button className="tex-sm text-gray-600">
                              <PaperclipIcon className="size-7" />
                            </button>
                          </div>
                          <div className="ml-2 cursor-pointer">
                            <div className="mt-2 flex items-center">
                              <p className="text-sm font-bold text-gray-600 dark:text-white">
                                {upl?.name}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-gray-600">
                              <span className="ml-1.5 text-sm font-normal">
                                {prettyBytes(upl?.size)}
                              </span>
                            </div>
                          </div>

                          <div className="ml-auto">
                            <ButtonInput
                              type="button"
                              icon={<DownloadIcon className="size-4" />}
                              variant="outline"
                              title="Download"
                              onClick={() => {
                                push(
                                  `${downloadOneFileUploadAPI({
                                    folder: 'products',
                                    fileName: upl?.path,
                                  })}`,
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  {linkCopy ? (
                    <div className="py-4">
                      <div className="flex items-center">
                        <div className="relative shrink-0 cursor-pointer">
                          <button className="tex-sm text-gray-600">
                            <LinkIcon className="size-7" />
                          </button>
                        </div>
                        <div className="ml-2 cursor-pointer">
                          <div className="mt-2 flex items-center">
                            <p className="text-sm font-bold text-indigo-600">
                              <Link href={linkCopy} target="_blank">
                                {linkCopy}
                              </Link>
                            </p>
                          </div>
                        </div>

                        <div className="ml-auto">
                          <ButtonInput
                            type="button"
                            variant="outline"
                            onClick={() => {
                              copyToClipBoard(linkCopy), setCopied(true);
                            }}
                            onMouseLeave={() => setCopied(false)}
                          >
                            {copied ? (
                              <>
                                <CheckIcon className="size-4" />
                                <span className="ml-1">Copied</span>
                              </>
                            ) : (
                              <>
                                <CopyIcon className="size-4" />
                                <span className="ml-1">Copy</span>
                              </>
                            )}
                          </ButtonInput>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export { OrderItemUserModal };

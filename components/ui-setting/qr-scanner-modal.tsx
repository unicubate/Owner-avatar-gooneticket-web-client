import { GetOneOrderItemAPI } from '@/api-site/order-item';
import { useInputState } from '@/components/hooks';
import { useRouter } from 'next/router';
import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import { ButtonInput } from './button-input';

interface Props {
  isOpen?: boolean;
  setIsOpen?: any;
}

const QrScannerModal = ({ isOpen, setIsOpen }: Props) => {
  const { t, hasErrors, setHasErrors } = useInputState();
  const { query, push, back } = useRouter();
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState('');

  useEffect(() => {
    const video: any = videoElementRef.current;
    const qrScanner = new QrScanner(
      video,
      (result) => {
        console.log('decoded qr code:', result);
        setScannedText(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true,
      },
    );
    qrScanner.start();
    console.log('start');

    return () => {
      console.log('qrScanner =>', qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  const {
    data: item,
    isError: isErrorOrderItem,
    isLoading: isLoadingOrderItem,
    error,
  } = GetOneOrderItemAPI({
    orderNumber: scanned,
  });

  useEffect(() => {
    if (isErrorOrderItem) {
      setHasErrors(error?.message);
    } else {
      item?.id ? push(`/events/orders/${item?.orderNumber}/confirm`) : null;
    }
  }, [item, push, error, setHasErrors, isErrorOrderItem]);

  return (
    <>
      {isOpen ? (
        <div className="min-w-screen animated fadeIn faster fixed  inset-0  z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none">
          <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
          <div className="relative m-auto max-h-screen w-full max-w-lg overflow-y-scroll rounded-xl bg-white  p-5 shadow-lg dark:bg-[#121212]">
            <div className="flex-auto justify-center p-2">
              <div className="flex items-center justify-center">
                <video ref={videoElementRef} />
              </div>

              <div className="mt-4 flex items-center space-x-4">
                <ButtonInput
                  type="button"
                  className="w-full"
                  size="lg"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </ButtonInput>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export { QrScannerModal };

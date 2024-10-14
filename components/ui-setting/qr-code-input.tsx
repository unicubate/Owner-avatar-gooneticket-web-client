import { cn } from '@/lib/utils';
import Image from 'next/image';
import QRCode from 'qrcode';
import { useCallback, useEffect, useState } from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  errorLevel?: 'L' | 'M' | 'Q' | 'H';
}

const QRCodeInput: React.FC<QRCodeProps> = ({
  value,
  size = 200,
  className,
  errorLevel,
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const generateQRCode = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await QRCode.toDataURL(value, {
        margin: 2,
        version: 2,
        errorCorrectionLevel: errorLevel,
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error(err);
      setError('Erreur lors de la génération du QR Code');
    } finally {
      setLoading(false);
    }
  }, [value, errorLevel]);

  useEffect(() => {
    generateQRCode();
  }, [generateQRCode]);

  const renderContent = () => {
    if (loading) {
      return <span>Génération du QR Code...</span>;
    }
    if (error) {
      return <span className="text-red-500">{error}</span>;
    }
    if (qrCodeUrl) {
      return (
        <div className="rounded-lg border dark:border-input dark:bg-background">
          <Image
            height={size}
            width={size}
            className={cn('rounded-md object-cover', className)}
            src={qrCodeUrl}
            quality={90}
            priority={true}
            alt={value}
            decoding="auto"
            fetchPriority="high"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex mt-2 items-center justify-center">
      {renderContent()}
    </div>
  );
};

export { QRCodeInput };

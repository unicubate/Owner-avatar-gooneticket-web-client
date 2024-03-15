import { Spin } from 'antd';
import { LoaderCircleIcon } from 'lucide-react';

interface Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const LoadingFile: React.FC<Props> = ({
  title,
  description,
  className = 'relative mx-auto justify-center',
}) => {
  return (
    <>
      <div className={className}>
        <div className="inset-x-0 top-0 mt-10 grid place-items-center py-4">
          <Spin
            tip=""
            indicator={<LoaderCircleIcon style={{ fontSize: 30 }} />}
            size="large"
          >
            <div className="content" />
          </Spin>
        </div>
      </div>
    </>
  );
};

export { LoadingFile };

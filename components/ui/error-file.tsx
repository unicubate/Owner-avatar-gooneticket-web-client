import { ColorType } from "@/types/profile.type";
import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Result, Spin } from "antd";
import { ResultStatusType } from "antd/es/result";

interface Props {
  status: ResultStatusType
  title: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const ErrorFile: React.FC<Props> = ({
  status,
  title,
  description,
  className = "relative mx-auto justify-center",
}) => {
  return (
    <>
      <div className={className}>
        <div className="left-0 right-0 top-0 grid place-items-center">
          <Result
            status={status}
            title={<p className="text-6xl font-bold dark:text-gray-900">{title}</p>}
            subTitle={<span className="text-xl font-bold dark:text-gray-900">{description}</span>}
          />
        </div>
      </div>
    </>
  );
};

export { ErrorFile };

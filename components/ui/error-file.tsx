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
  className = "relative",
}) => {
  return (
    <>
      <div className={className}>
        <Result
          status={status}
          title={title}
          subTitle={description}
        />
      </div>
    </>
  );
};

export { ErrorFile };

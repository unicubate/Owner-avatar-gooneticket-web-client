import { ColorType } from "@/types/profile.type";
import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Spin } from "antd";

interface Props {
  title?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

const LoadingFile: React.FC<Props> = ({
  title,
  description,
  className = "relative",
}) => {
  return (
    <>
      <div className={className}>
        <Spin
          tip="Loading"
          indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          size="large"
        >
          <div className="content" />
        </Spin>
      </div>
    </>
  );
};

export { LoadingFile };

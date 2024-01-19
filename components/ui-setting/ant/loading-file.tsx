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
  className = "relative mx-auto justify-center",
}) => {
  return (
    <>
      <div className={className}>
        <div className="mt-10 py-4 left-0 right-0 top-0 grid place-items-center">
          <Spin
            tip=""
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
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

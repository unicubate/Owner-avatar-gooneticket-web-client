import { ColorType } from "@/types/profile.type";
import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Spin } from "antd";



interface Props {
    title: React.ReactNode;
    description: React.ReactNode;
}

const LoadingFile: React.FC = () => {
    return (
        <>
            <div className="relative">
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

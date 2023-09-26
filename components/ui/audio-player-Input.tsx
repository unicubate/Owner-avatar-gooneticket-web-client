import { viewOneFileUploadAPI } from "@/api/upload";
import { UploadFolderType, UploadModel } from "@/types/upload";
import { RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import ReactH5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface Props {
  uploads: UploadModel[];
  folder: UploadFolderType;
}

const AudioPlayerInput: React.FC<Props> = ({ uploads, folder }) => {
  const player = useRef(null);

  return (
    <>
      {uploads &&
        uploads.map((item: any, index: number) => (
          <div key={index}>
            <ReactH5AudioPlayer
              autoPlay={false}
              autoPlayAfterSrcChange={false}
              src={`${viewOneFileUploadAPI({
                folder: folder,
                fileName: item?.path,
              })}`}
              layout="stacked-reverse"
              timeFormat="auto"
              customIcons={{
                play: (
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.504 12.008a7.5 7.5 0 1 0 15 0 7.5 7.5 0 0 0-15 0zm-1.5 0a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"
                    ></path>
                    <path d="M9.5 8.982c0-.37.383-.601.691-.418l5.076 3.018a.49.49 0 0 1 0 .835l-5.076 3.019c-.308.183-.691-.048-.691-.418V8.982z"></path>
                  </svg>
                ),
                pause: (
                  <svg viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                    <path
                      clip-rule="evenodd"
                      d="M8 4c0 2.21-1.79 4-4 4S0 6.21 0 4s1.79-4 4-4 4 1.79 4 4zM2.63 5.37h.912V2.63H2.63v2.74zm1.828 0h.913V2.63h-.913v2.74z"
                      data-fill="1"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                ),
                rewind: (
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M12.624 1.11a.75.75 0 1 1 1.06 1.06l-1.246 1.246a8.593 8.593 0 1 1-5.322 1.511.75.75 0 1 1 .852 1.235 7.093 7.093 0 1 0 3.858-1.254l1.858 1.858a.75.75 0 0 1-1.06 1.061L9.795 5a.75.75 0 0 1 0-1.061l2.829-2.828zm-2.19 13.928c0 .439-.293.723-.732.723-.44 0-.737-.284-.737-.723v-3.84h-.028l-.725.5a.562.562 0 0 1-.363.124.488.488 0 0 1-.499-.507c0-.212.085-.376.294-.52l1.1-.743c.31-.208.559-.24.849-.24.531 0 .841.316.841.82v4.405zm5.916-1.327c0 1.267-.958 2.101-2.34 2.101-.962 0-1.816-.43-2.114-1.018a.894.894 0 0 1-.1-.404c0-.36.221-.575.596-.575.277 0 .455.092.632.312.225.335.507.555.974.555.552 0 .959-.4.959-.939 0-.527-.39-.899-.947-.899-.318 0-.571.144-.757.308-.225.196-.374.268-.696.268-.488 0-.709-.336-.685-.723v-.02l.153-2.026c.04-.527.33-.747.826-.747h2.613c.35 0 .58.22.58.564 0 .343-.226.563-.58.563h-2.223l-.112 1.45h.028c.225-.38.696-.631 1.304-.631 1.1 0 1.889.767 1.889 1.861z"
                    ></path>
                  </svg>
                ),
                forward: (
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.376 1.11a.75.75 0 0 0-1.06 1.06l1.246 1.246a8.593 8.593 0 1 0 5.322 1.511.75.75 0 0 0-.852 1.235 7.093 7.093 0 1 1-3.858-1.254l-1.858 1.858a.75.75 0 0 0 1.06 1.061L14.205 5a.75.75 0 0 0 0-1.061L11.376 1.11z"></path>
                    <path d="M10.434 15.037c0 .44-.293.724-.732.724-.44 0-.737-.284-.737-.723v-3.84h-.028l-.725.5a.562.562 0 0 1-.363.124.488.488 0 0 1-.499-.507c0-.212.085-.376.294-.52l1.1-.743c.31-.208.559-.24.849-.24.531 0 .841.316.841.82v4.405zm5.916-1.326c0 1.267-.958 2.101-2.34 2.101-.962 0-1.816-.43-2.114-1.018a.894.894 0 0 1-.1-.404c0-.36.221-.575.596-.575.277 0 .455.092.632.312.225.335.507.555.974.555.552 0 .959-.4.959-.939 0-.527-.39-.899-.947-.899-.318 0-.571.144-.757.308-.225.196-.374.268-.696.268-.488 0-.709-.336-.685-.723v-.02l.153-2.026c.04-.527.33-.747.826-.747h2.613c.35 0 .58.22.58.564 0 .343-.226.563-.58.563h-2.223l-.112 1.45h.028c.225-.38.696-.631 1.304-.631 1.1 0 1.889.767 1.889 1.861z"></path>
                  </svg>
                ),
              }}
              customVolumeControls={[]}
              customAdditionalControls={[]}
              className="rounded-lg"
              ref={player}
              style={{ backgroundColor: 'transparent' }}
            />
          </div>
        ))}
    </>
  );
};

export { AudioPlayerInput };

import { viewOneFileUploadAPI } from "@/api/upload";
import { UploadFolderType, UploadModel } from "@/types/upload";
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
              // customIcons={{
              //   next: "",
              //   previous: ""
              // }}
              customVolumeControls={[]}
              customAdditionalControls={[]}
              className="rounded-lg shadow-lg p-4"
              ref={player}
              style={{ color: "blue" }}
            />
          </div>
        ))}
    </>
  );
};

export { AudioPlayerInput };

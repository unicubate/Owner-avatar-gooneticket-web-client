import { useState } from 'react';

type Pops = {
  uploadFiles?: any;
  uploadImages?: any[];
};
const useUploadItem = ({ uploadFiles, uploadImages }: Pops) => {
  const [fileList, setFileList] = useState<any[]>(uploadFiles ?? []);
  const [imageList, setImageList] = useState<any[]>(uploadImages ?? []);

  // const handleImageChange: any = ({
  //   fileList: newImageList,
  // }) => setImageList(newImageList);

  // const handleFileChange: any['onChange'] = ({
  //   fileList: newFileList,
  // }) => setFileList(newFileList);

  return {
    fileList,
    imageList,
    handleImageChange: setFileList(imageList),
    handleFileChange: setFileList(uploadFiles),
  };
};

export { useUploadItem };

import React from 'react';
import { Icon } from 'antd';

const getFileIconType = (fileName, fileUrl) => {
  const imgExp = /[.|_](png|jpg|jpeg|gif|webp)$/i;
  const videoExp = /[.|_](mp4|avi|wmv|rm|rmvb|3gp|mkv|flv)$/i;
  const audioExp = /[.|_](mp3|aac|wma|ogg|m4a|wav|amr|3gpp)$/i;
  const excelExp = /[.|_](xls|xlsx)$/i;
  const pptExp = /[.|_](ppt|pptx)$/i;
  const wordExp = /[.|_](doc|docx)$/i;
  const markdownExp = /[.|_]md$/i;
  const pdfExp = /[.|_]pdf$/i;
  const textExp =  /[.|_]txt$/i;
  const zipExp = /[.|_](rar|zip|arj|z)$/i;
  const typeArr = [
    { exp: imgExp, icon: 'file-image' },
    { exp: videoExp, icon: 'video-camera' },
    { exp: audioExp, icon: 'audio' },
    { exp: excelExp, icon: 'file-excel' },
    { exp: pptExp, icon: 'file-ppt' },
    { exp: wordExp, icon: 'file-word' },
    { exp: markdownExp, icon: 'file-markdown' },
    { exp: pdfExp, icon: 'file-pdf' },
    { exp: textExp, icon: 'file-text' },
    { exp: zipExp, icon: 'file-zip' }
  ];
  for(let i = 0; i < typeArr.length; i++) {
    if (typeArr[i].exp.test(fileName) || typeArr[i].exp.test(fileUrl)) {
      return typeArr[i].icon;
    }
  }
  return 'file-unknown';
}

export const getFileIcon = (fileType, fileName, fileUrl) => {
  if (fileType === 'image') {
    if (fileUrl) return <img src={fileUrl} alt="" />;
    return <Icon type="file-image" />;
  }

  if (fileType === 'video') {
    return <Icon type="video-camera" />;
  }

  if (fileType === 'audio') {
    return <Icon type="audio" />;
  }

  if (fileType === 'file') {
    return <Icon type={getFileIconType(fileName, fileUrl)} />;
  }

  return <Icon type="file-unknown" />;
}

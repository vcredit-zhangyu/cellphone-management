/*
 * @Author: waghao10
 * @Date: 2024-09-26 10:59:07
 * @Description: 上传oss
 */
import { message } from 'antd';
const OSS = require('ali-oss');
import { v4 as uuidv4 } from 'uuid';

const client = new OSS({
  region: '',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: '',
  endpoint: '',
  cname: true,
});

/**
 * 阿里云oss图片上传
 * @param { formdate } file 文件流
 * @return { String } 上传后图片url
 */
async function uploadImg(file: any, uploadPath = '/', suffix?: any, uuid?: any) {
  const fileName = `${uuid || uuidv4()}.${suffix || file.name.substring(
    file.name.lastIndexOf('.') + 1,
  )}`;
  const path =
    process.env.BUILD_ENV === 'prod'
      ? `/${fileName}`
      : `${uploadPath}${fileName}`;
  const res = await client.put(path, file);
  if (res.res.statusCode === 200) return res.url;
  message.error('上传失败');
  return '';
}

export default uploadImg;

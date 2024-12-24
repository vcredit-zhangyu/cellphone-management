/*
 * @Author: waghao10
 * @Date: 2022-11-17 16:42:00
 * @Description: 全局变量
 */
// src/global.d.ts
export { }
declare global {
  interface Window {
    jsMind: any; //全局变量名
    qrcode: any;
  }
}
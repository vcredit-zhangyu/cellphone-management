/*
 * @Author: waghao10
 * @Date: 2023-03-23 17:23:41
 * @Description: 
 */
import zhCN from 'antd/lib/locale/zh_CN';

const ZhLocale: typeof zhCN = zhCN;
ZhLocale.DatePicker!.lang = {
  ...zhCN.DatePicker!.lang,
  monthFormat: 'M月',
  shortWeekDays: ['日', '一', '二', '三', '四', '五', '六']
}
export default ZhLocale;
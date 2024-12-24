/*
 * @Author: waghao10
 * @Date: 2024-09-14 15:20:01
 * @Description: 品牌分布
 */
import * as echarts from 'echarts'
import { useEffect, useRef } from 'react'
import styles from './index.module.less'
import { cloneDeep } from 'lodash'
interface brandProps {
  /**
   * 饼图key
   */
  id: string
  /**
   * 图表标题

   */
  title: string
  dataSource: any[]
}
const Brand = (props: brandProps) => {
  const { id, title, dataSource } = props
  const pieData: any = useRef([])
  let myChart

  /**
   * @description: 初始化饼图
   * @return {*}
   */
  const initEcharts = () => {
    const chartDom = document.getElementById(id)
    myChart = echarts.init(chartDom)
    const option = {
      tooltip: {
        trigger: 'item'
      },
      title: {
        text: title,
        subtext: '（用户量：个数）',
        left: 'center',
        top: '32%',
        textStyle: {
          fontSize: 12,
          color: '#333333',
          align: 'center'
        },
        subtextStyle: {
          fontSize: 12,
          color: '#333333',
        }
      },
      legend: {
        bottom: '2%',
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '60%'],
          center: ['50%', '40%'],
          datasetIndex: 1,
          data: pieData.current,
        },
      ],
    }
    myChart.setOption(option)
  }

  useEffect(() => {
    if (dataSource) {
      const _list = cloneDeep(dataSource)
      pieData.current = _list.map((v: any) => {
        const obj = {
          // name:v.nums,
          // value:v.version
          name:v.version,
          value:v.nums

        }
        return obj
      })
      setTimeout(() => {
        initEcharts()
      }, 0)
    }
  }, [dataSource])

  return (
    <div id={id} className={styles.versionStyle} />
  )
}
export default Brand
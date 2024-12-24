/*
 * @Author: waghao10
 * @Date: 2024-09-14 15:20:01
 * @Description: 品牌分布
 */
import * as echarts from 'echarts'
import { useEffect } from 'react'
import styles from './index.module.less'

interface brandInterface {
  dataSource: any[]
}
const Brand = (props: brandInterface) => {
  const { dataSource } = props
  const brandData: any = { x: [], y: [] }
  let myChart
  const initEcharts = () => {
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '8%',
        left: '0',
        right: '0',
        bottom: '0',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: brandData.x || [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: '20px',
          data: brandData.y || [],
          color: '#00CADB',
          label: {
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        }
      ]
    }
    const chartDom = document.getElementById('mainBrand')
    myChart = echarts.init(chartDom)
    myChart.setOption(option)
  }
  useEffect(() => {
    if (dataSource) {
      dataSource.forEach((item: any) => {
        brandData.x.push(item?.brand)
        brandData.y.push(item?.nums)
      })
      const _i = setTimeout(() => {
        initEcharts()
        clearTimeout(_i)
      }, 0)
    }
  }, [dataSource])

  return (
    <div id='mainBrand' className={styles.brandStyle} />
  )
}
export default Brand
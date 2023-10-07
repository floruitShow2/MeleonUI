import type { EchartsExampleType } from '../interface'
export const lineSettings: EchartsExampleType[] = [
  {
    title: '折线图示例',
    description: '一个基础的折线图示例',
    option: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      //   legend: {
      //     data: ['下载量', '注册数']
      //   },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        top: '4%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E7E7E7'
            }
          },
          data: [
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
            '24:00'
          ]
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E7E7E7'
            }
          }
        }
      ],
      series: [
        {
          color: '#8e9dff',
          name: '下载量',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0.25,
                  color: '#8e9dff'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ]
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: new Array(24).fill(0).map(() => Math.floor(Math.random() * 1000))
        },
        {
          color: '#26deca',
          name: '注册数',
          type: 'line',
          smooth: true,
          stack: 'Total',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0.25,
                  color: '#26deca'
                },
                {
                  offset: 1,
                  color: '#fff'
                }
              ]
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: new Array(24).fill(0).map(() => Math.floor(Math.random() * 1000))
        }
      ]
    },
    optionString: `
{
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  //   legend: {
  //     data: ['下载量', '注册数']
  //   },
  grid: {
    left: '1%',
    right: '1%',
    bottom: '3%',
    top: '4%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E7E7E7'
        }
      },
      data: [
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: '#E7E7E7'
        }
      }
    }
  ],
  series: [
    {
      color: '#8e9dff',
      name: '下载量',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#8e9dff'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: new Array(24).fill(0).map(() => Math.floor(Math.random() * 1000))
    },
    {
      color: '#26deca',
      name: '注册数',
      type: 'line',
      smooth: true,
      stack: 'Total',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0.25,
              color: '#26deca'
            },
            {
              offset: 1,
              color: '#fff'
            }
          ]
        }
      },
      emphasis: {
        focus: 'series'
      },
      data: new Array(24).fill(0).map(() => Math.floor(Math.random() * 1000))
    }
  ]
}`
  }
]

import type { EchartsExampleType } from '../interface'
export const histogramSettings: EchartsExampleType[] = [
  {
    title: '柱状图示例',
    description: '一个基础的柱状图示例',
    option: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        data: ['Evaporation', 'Precipitation', 'Temperature']
      },
      grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        top: '50px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisPointer: {
            type: 'shadow'
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E7E7E7'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E7E7E7'
            }
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          },
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
          name: 'Evaporation',
          type: 'bar',
          color: ['#26deca'],
          tooltip: {
            valueFormatter(value) {
              return `${value as number} ml`
            }
          },
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
          name: 'Precipitation',
          type: 'bar',
          color: ['#8e9dff'],
          tooltip: {
            valueFormatter(value) {
              return `${value as number} ml`
            }
          },
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter(value) {
              return `${value as number} °C`
            }
          },
          data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
      ]
    },
    optionString: `
{
    tooltip: {
        trigger: 'axis',
        axisPointer: {
        type: 'cross',
        crossStyle: {
            color: '#999'
        }
        }
    },
    legend: {
        data: ['Evaporation', 'Precipitation', 'Temperature']
    },
    grid: {
        left: '1%',
        right: '1%',
        bottom: '3%',
        top: '50px',
        containLabel: true
    },
    xAxis: [
        {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisPointer: {
            type: 'shadow'
        },
        splitLine: {
            show: true,
            lineStyle: {
            type: 'dashed',
            color: '#E7E7E7'
            }
        }
        }
    ],
    yAxis: [
        {
        type: 'value',
        name: 'Precipitation',
        min: 0,
        max: 250,
        interval: 50,
        axisLabel: {
            formatter: '{value} ml'
        },
        splitLine: {
            show: true,
            lineStyle: {
            type: 'dashed',
            color: '#E7E7E7'
            }
        }
        },
        {
        type: 'value',
        name: 'Temperature',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
            formatter: '{value} °C'
        },
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
        name: 'Evaporation',
        type: 'bar',
        color: ['#26deca'],
        tooltip: {
            valueFormatter(value) {
            return \`\${value as number} ml\`
            }
        },
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
        name: 'Precipitation',
        type: 'bar',
        color: ['#8e9dff'],
        tooltip: {
            valueFormatter(value) {
            return \`\${value as number} ml\`
            }
        },
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
            valueFormatter(value) {
            return \`\${value as number} °C\`
            }
        },
        data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
}`
  }
]

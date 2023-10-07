import type { EchartsExampleType } from '../interface'
export const pieSettings: EchartsExampleType[] = [
  {
    title: '饼图示例',
    description: '一个基础的饼图示例',
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 0,
        top: 20,
        bottom: 20
      },
      series: [
        {
          name: 'Radius Mode',
          type: 'pie',
          color: ['#8e9dff', '#26deca'],
          radius: [60, 100],
          center: ['50%', '50%'],
          roseType: 'radius',
          itemStyle: {
            borderRadius: 2
          },
          label: {
            show: false
          },
          emphasis: {
            label: {
              show: true
            }
          },
          data: [
            { value: 60, name: 'rose 1' },
            { value: 33, name: 'rose 2' }
          ]
        }
      ]
    },
    optionString: `
{
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        left: 0,
        top: 20,
        bottom: 20
    },
    series: [
        {
        name: 'Radius Mode',
        type: 'pie',
        color: ['#8e9dff', '#26deca'],
        radius: [60, 100],
        center: ['50%', '50%'],
        roseType: 'radius',
        itemStyle: {
            borderRadius: 2
        },
        label: {
            show: false
        },
        emphasis: {
            label: {
            show: true
            }
        },
        data: [
            { value: 60, name: 'rose 1' },
            { value: 33, name: 'rose 2' }
        ]
        }
    ]
}`
  }
]

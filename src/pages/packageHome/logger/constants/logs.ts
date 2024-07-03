import type { LogInstanceType } from '../type'

const Logs: LogInstanceType[] = [
  {
    version: '1.0.0',
    date: '2023-10-15',
    content: {
      feature: [
        {
          label: '添加<code>ml-checkbox</code>和<code>ml-checkbox-group</code>组件',
          link: ''
        }
      ],
      optimize: [],
      bugFix: [],
      style: []
    }
  },
  {
    version: '1.0.1',
    date: '2023-10-25',
    content: {
      feature: [
        {
          label: '添加<code>ml-drawer</code>组件',
          link: ''
        },
        {
          label: '添加<code>发现</code>标签页内容',
          link: ''
        },
        {
          label: '完成<code>ml-table</code>组件基本结构搭建',
          link: ''
        }
      ],
      optimize: [],
      bugFix: [],
      style: []
    }
  },
  {
    version: '1.0.2',
    date: '2023-10-27',
    content: {
      feature: [
        {
          label: '<code>ml-table</code>组件支持自定义单元格内容',
          link: ''
        }
      ],
      optimize: [],
      bugFix: [],
      style: []
    }
  },
  {
    version: '1.0.3',
    date: '2023-10-29',
    content: {
      feature: [],
      optimize: [
        {
          label: '调整<code>ml-table</code>组件代码结构，移除冗余代码 ',
          link: ''
        }
      ],
      bugFix: [],
      style: []
    }
  },
  {
    version: '1.0.4',
    date: '2023-10-29',
    content: {
      feature: [],
      optimize: [
        {
          label: '调整<code>ml-table</code>组件代码结构，移除冗余代码',
          link: ''
        }
      ],
      bugFix: [],
      style: []
    }
  },
  // 1.0.5
  {
    version: '1.0.5',
    date: '2023-11-21',
    content: {
      feature: [],
      optimize: [
        {
          label: '添加<code>ml-message</code>组件，支持设置消息类型、持续时间、可关闭等功能',
          link: ''
        }
      ],
      bugFix: [],
      style: [
        {
          label: '优化小程序首页样式',
          link: ''
        }
      ]
    }
  },
  // 1.0.6
  {
    version: '1.0.6',
    date: '2023-12-3',
    content: {
      feature: [],
      optimize: [
        {
          label: '添加<code>ml-timeline</code>和<code>ml-timeline-item</code>组件',
        }
      ],
      bugFix: [],
      style: []
    }
  },
  // 1.1.7
  {
    version: '1.1.7',
    date: '2024-6-16',
    content: {
      feature: [
        {
          label: 'feat: 新增 ml-config-provider 组件',
        },
        {
          label: 'docs: 调整项目接口，补全TS类型，新增 README 文档',
        }
      ],
      optimize: [],
      bugFix: [],
      style: []
    }
  },
  // 1.1.8
  {
    version: '1.1.8',
    date: '2024-6-20',
    content: {
      feature: [
        {
          label: 'feat: 新增 ml-cell、ml-cell-group 组件'
        },
        {
          label: 'feat: 新增 ml-uploader 组件'
        }
      ],
      optimize: [],
      bugFix: [],
      style: []
    }
  },
  // 1.1.9
  {
    version: '1.1.8',
    date: '2024-6-29',
    content: {
      feature: [
        {
          label: 'feat: 新增 ml-image 组件'
        },
        {
          label: 'feat: ml-tree 组件模块拆分，支持自定义 title 节点'
        },
        {
          label: 'feat: 新增 ml-icon-switcher 小组件'
        },
        {
          label: 'feat: ml-tree 组件基本功能完善，支持文本选中、复选框选择、自定义标题节点等'
        },
        {
          label: 'feat: ml-tree 组件新增对外暴露的 expand、check 及 select 等方法'
        }
      ],
      optimize: [],
      bugFix: [
        {
          label: 'fix: ml-loading 图标缺失，ml-button 组件设置 loading 不生效'
        },
        {
          label: 'fix: ml-button 单图标按钮图标偏移的问题'
        },
        {
          label: 'fix: 去除 checkbox 组件无文本时样式的偏移'
        }
      ],
      style: []
    }
  },
  // 1.1.10
  {
    version: '1.1.10',
    date: '2024-7-3',
    content: {
      feature: [
        {
          label: 'feat: Meleon Uni-ui 小程序上线，支持在线查看组件演示效果'
        }
      ],
      optimize: [],
      bugFix: [
        {
          label: 'fix: ml-checkbox 设置 direction 失效的问题'
        },
        {
          label: 'fix: ml-image 预览层层级过低的问题'
        },
        {
          label: 'fix: ml-select 无激活样式的问题'
        },
        {
          label: 'fix: ml-input-tag 确认后未触发新增标签'
        }
      ],
      style: []
    }
  },
]

export default Logs

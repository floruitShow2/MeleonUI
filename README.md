### 开发指南

#### 一、快速上手

##### 安装

```dash
# npm
npm install @meleon/uni-ui
```

##### 引入

H5 端

```ts
import MeleonUI from '@/ml-ui/lib'

export function createApp() {
  const app = createSSRApp(App)
  app.use(MeleonUI)
    
  return { app }
}
```

微信小程序端

对比分别在项目入口文件 **main.ts** 和组件库的入口文件 **meleon-ui.ts** 里注册的组件，被编译到微信小程序上的结果：

```ts
// main.ts
import { createSSRApp } from 'vue'
import MeleonUI from '@/ml-ui/lib'
import MlButton from '@/ml-ui/lib/ml-button/index.vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(MeleonUI)

  app.component('MlButtonGlobal', ml-button)

  return {
    app
  }
}
```

```ts
// meleon-ui.ts
import type { App, Plugin } from 'vue'
import MlButton from './ml-button'

const components: Record<string, Plugin> = {
    MlButton,
}
const install = (app: App) => {
    for (const key in components) {
        if (Object.prototype.hasOwnProperty.call(components, key)) {
            app.use(components[key])
        }
    }
}

const MeleonUI = { install }

export default MeleonUI

// ml-button/index.ts
import type { App } from 'vue'
import _Button from './index.vue'

const install = async (app: App) => {
    app.component('ml-button', _Button)
}

export default { install }
```

可以看到，虽然本质上都是使用 app.component 实现注册组件，但编译的结果却完全不同

在 main.ts 中注册 MlButtonGroup 组件被编译成函数

而 meleon-ui.ts 里的组件被编译成对象

在使用时也是前者可以被正常渲染成组件展示到页面上

![image-20240618223130651](C:\Users\23200\AppData\Roaming\Typora\typora-user-images\image-20240618223130651.png)

因此，如果希望在微信小程序端实现批量注册组件，需要使用 uniapp 提供的 `easycom` 方法

> 详细内容可跳转：https://uniapp.dcloud.net.cn/collocation/pages.html#easycom

```json
// page.json
{
	"easycom": {
		"custom": {
			"^ml-(.*)": "@meleon/uni-ui/lib/ml-$1/index.vue"
		}
	}
}
```

#### 二、定制主题

MeleonUI 为用户提供了自定义主题的方法，可以通过向 `ml-config-provider` 组件传入 `themes` 属性，同时修改当前页面所有 ml- 组件的主题色

```html
<!-- template -->
<ml-config-provider :themes="themes">
	<!-- 消息提示 -->
	<ml-message ref="messageRef" />
	<!-- 导航栏 -->
	<ml-navigator
		:title="$t('home.navigation.title')"
		title-color="#FFFFFF"
		background-color="#7A98B3"
	></ml-navigator>
	<ml-button
		type="primary"
		@click="onNavigate('/pages/componentList/index')"
	>
		{{ $t('home.actions.start') }}
		<ml-icon icon="ml-arrow-right--line" color="#FFFFFF" />
	</ml-button>
</ml-config-provider>
```

```ts
// script
import type { ConfigProviderProps } from '~/lib/ml-config-provider/index.interface'

const themes: ConfigProviderProps['themes'] = {
    primary: '#D74B4B',
}
```

themes 支持以下属性，可根据项目的设计风格批量修改，当然，直接通过 CSS 修改样式也是可以的。

```ts
export type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'danger'
```

#### 三、更新日志

- 2024/6/19 	新增 ml-config-provider 组件
- 2024/6/21     调整项目接口，补全TS类型，新增 README 文档
- 2024/6/23     新增 ml-cell、ml-cell-group 组件

### 组件

#### 头像 Avatar

###### 基本使用

如果头像内容是文字的话，会自动调节字体大小，来适应头像框

```html
<!-- 基础使用 -->
<ml-avatar>Meleon</ml-avatar>
<!-- 设置尺寸 -->
<ml-avatar :size="36">Meleon</ml-avatar>
<!-- 设置形状 -->
<ml-avatar :size="28" shape="circle">Meleon</ml-avatar>
<!-- 插入图片 -->
<ml-avatar shape="circle">
	<image src="@/assets/home/avatar.png" mode="widthFix" />
</ml-avatar>
```

###### APIs

| prop  | type             | default |
| ----- | ---------------- | ------- |
| size  | number           | 32      |
| shape | square \| circle | square  |

###### Slots

| name    | desc                     |
| ------- | ------------------------ |
| default | 默认插槽，传递文本或图片 |

#### 头像组 AvatarGroup

###### 基本使用

除了 maxCount 等属性，还可以传入 Avatar 的 size、shape 等属性实现批量设置

```html
<ml-avatar-group :size="36" :offset="10" shape="circle">
    <ml-avatar>Meleon</ml-avatar>
    <ml-avatar>Aliee</ml-avatar>
    <ml-avatar>Bob</ml-avatar>
</ml-avatar-group>
```

###### APIs

| prop     | type             | default | desc                         |
| -------- | ---------------- | ------- | ---------------------------- |
| maxCount | number           | 3       | 多出的部分会显示剩余的 count |
| offset   | number           | 0       | 头像组件之前的偏移量         |
| size     | number           | 32      | 头像组件的尺寸               |
| shape    | square \| circle | square  | 头像组件的形状               |

#### 按钮 Button

###### 基本使用

```html
<ml-button
	type="primary"
	size="mini"
	status="success"
>
    Primary
</ml-button>

<ml-button
	type="secondary"
	size="mini"
	shape="round"
	status="success"
>
    Secondary
</ml-button>

<ml-button
	type="outline"
	size="mini"
	status="success"
>
    Outline
</ml-button>

<ml-button
	type="text"
	size="mini"
	status="success"
	@click="handleClick"
>
    Text
</ml-button>
```

###### APIs

| prop     | type                                    | desc       |
| -------- | --------------------------------------- | ---------- |
| type     | primary \| secondary \| outline \| text | 按钮类型   |
| size     | mini \| small \| medium \| large        | 按钮尺寸   |
| shape    | square \| round \| circle               | 按钮形状   |
| status   | normal \| success \| warning \| danger  | 按钮状态   |
| loading  | boolean                                 | 是否加载中 |
| disabled | boolean                                 | 是否禁用   |

###### Slots

| name    | desc                         |
| ------- | ---------------------------- |
| default | 默认插槽                     |
| icon    | 图标插槽【位于默认插槽左侧】 |

###### Emits

| event | dessc    |
| ----- | -------- |
| click | 点击事件 |

#### 单元格 Cell

###### 基本使用

```html
<ml-cell-group title="测试分组" style="width: 100%">
    <ml-cell
        :type="CellTypeEnum.TEXT"
        label="测试标题"
        value="测试内容"
        description="测试描述"
        disabled
        allow-edit
        style="width: 100%"
        @change="handleCellChange"
    ></ml-cell>
    <ml-cell
        :type="CellTypeEnum.BUTTON"
        label="测试按钮"
        btn-status="danger"
        disabled
        style="width: 100%"
        @btn-click="handleClick"
    ></ml-cell>
    <ml-cell
        :type="CellTypeEnum.NAV"
        label="测试回到首页"
        value="回首页"
        url="/pages/home/index"
        :disabled="false"
        style="width: 100%"
    >
        <template #rightIcon>
        	<ml-icon name="ml-arrow-right--line" color="var(--info-color-7)"></ml-icon>
        </template>
        <template #value>
        	<text style="font-size: 14px; color: var(--info-color-7)">通过插槽展示内容</text>
        </template>
    </ml-cell>
</ml-cell-group>
```

###### APIs

| prop        | type                                   | default | desc                                                        |
| ----------- | -------------------------------------- | ------- | ----------------------------------------------------------- |
| label       | string                                 | ''      | 左侧标题                                                    |
| description | string                                 | ''      | 左侧描述                                                    |
| value       | string                                 | ''      | 右侧 值                                                     |
| type        | text \| button \| navigator            | text    | 单元格类型【推荐使用 `CellTypeEnum` 枚举变量赋值】          |
| disabled    | boolean                                | false   | 是否禁用                                                    |
| allowEdit   | boolean                                | false   | 文本单元格是否允许修改                                      |
| btnStatus   | normal \| success \| warning \| danger | normal  | 按钮单元格的按钮类型                                        |
| url         | string                                 | ''      | 导航单元格的跳转地址【小程序页面地址需要保留前面的 / 字符】 |

###### Slots

| name      | desc                                                   |
| --------- | ------------------------------------------------------ |
| label     | 左侧标题插槽【会覆盖默认的 label 和 description 区域】 |
| value     | 右侧内容插槽                                           |
| rightIcon | 导航单元格生效【覆盖右侧图标】                         |

###### Emits

| name     | desc                                                       |
| -------- | ---------------------------------------------------------- |
| change   | 文本单元格修改内容后触发                                   |
| btnClick | 按钮单元格点击触发                                         |
| navigate | 导航单元格点击跳转后触发【暂不暴露，考虑有没有必要放出来】 |

###### CellGroup APIs

| prop  | type   | default | desc     |
| ----- | ------ | ------- | -------- |
| title | string | ''      | 分组名称 |

###### CellGroup Slots

| name  | desc                     |
| ----- | ------------------------ |
| title | 标题插槽【覆盖标题内容】 |

#### 选择框 Checkbox

###### 基本使用

```html
<ml-checkbox v-model:checked="checked1">Radio</ml-checkbox>
<ml-checkbox indeterminate>Radio</ml-checkbox>
<ml-checkbox v-model:checked="checked1" disabled>Radio</ml-checkbox>
```

###### APIs

| props         | type             | default | desc                          |
| ------------- | ---------------- | ------- | ----------------------------- |
| checked       | boolean          | false   | 是否选中                      |
| indeterminate | boolean          | false   | 是否为半选状态                |
| disabled      | boolean          | false   | 是否禁用                      |
| value         | string \| number | ''      | CheckboxGroup 下的 value 标识 |

###### Slots

| name    | desc           |
| ------- | -------------- |
| default | 选择框右侧内容 |

###### Emits

| event          | desc     |
| -------------- | -------- |
| update:checked | 切换事件 |

#### 选择框分组 CheckboxGroup

###### 基本使用

```html
<ml-checkbox-group
	v-model:checked-list="checked3"
	mode="multi"
	:max="3"
	:min="1"
>
    <ml-checkbox value="A">RadioA</ml-checkbox>
    <ml-checkbox value="B">RadioB</ml-checkbox>
    <ml-checkbox value="C">RadioC</ml-checkbox>
    <ml-checkbox value="D">RadioD</ml-checkbox>
    <ml-checkbox value="E">RadioE</ml-checkbox>
</ml-checkbox-group>
```

###### APIs

| prop        | type                    | default    | desc           |
| ----------- | ----------------------- | ---------- | -------------- |
| checkedList | Array<string \| number> | 必填       | 选中的选项列表 |
| min         | number                  | 0          | 至少选中数量   |
| max         | max                     | Infinity   | 至多选中数量   |
| direction   | vertical \| horizontal  | horizontal | 纵向或横向排列 |
| mode        | single \| multi         | single     | 切换单选或多选 |

###### Emits

| event              | desc           |
| ------------------ | -------------- |
| update:checkedList | 更新选中的列表 |

#### 全局配置 ConfigProvider

###### 基本使用

设置全局主题色

```html
<ml-config-provider :themes="themes">
	<ml-button type="primary"></ml-button>
    <ml-button type="success"></ml-button>
    <ml-button type="warning"></ml-button>
    <ml-button type="danger"></ml-button>
</ml-config-provider>
```

```ts
import type { ConfigProviderProps } from '~/lib/ml-config-provider/index.interface'

const themes: ConfigProviderProps['themes'] = {
	primary: '#D74B4B'
}
```

###### APIs

| prop   | type                          | example                |
| ------ | ----------------------------- | ---------------------- |
| themes | ConfigProviderProps['themes'] | { primary: '#D74B4B' } |

#### 数值显示 CountTo

###### 基本使用

```html
<ml-count-to
    :from="0"
    :to="1250.44"
    animation
    :animation-duration="5000"
    :value-style="{ color: '#0fbf60' }"
>
    <template #suffix>
    	<text>%</text>
    </template>
</ml-count-to>
```

###### APIs

| prop              | type                | default  | desc                   |
| ----------------- | ------------------- | -------- | ---------------------- |
| from              | number              | 0        | 起始值                 |
| to                | number              | required | 结束时展示的数据，必填 |
| animation         | boolean             | false    | 是否开启动画           |
| animationDuration | number              | 1000     | 动画持续时间           |
| showSeperator     | boolean             | false    | 是否显示千分位分隔符   |
| valueStyle        | Record<string, any> | {}       | 数据的样式             |

###### Slots

| name   | desc           |
| ------ | -------------- |
| prefix | 数值左侧的内容 |
| suffix | 数值右侧的内容 |

###### Expose

| name    | desc     |
| ------- | -------- |
| start   | 开启动画 |
| pause   | 暂停动画 |
| restart | 继续动画 |

#### 抽屉 Drawer

###### 基本使用

```html
<ml-drawer
	v-model:visible="modelVisible"
	:placement="placement"
	:has-nav="hasNav"
>
    <template #title>自定义标题</template>
    <text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, dolor libero
        blanditiis distinctio commodi totam recusandae aliquam fugit officiis sequi
        perspiciatis non animi, eaque facilis sed reiciendis in aut vel.
    </text>
    <template #footer>
        <ml-button>自定义页脚</ml-button>
    </template>
</ml-drawer>
```

###### APIs

| prop       | type                           | default  | desc                                      |
| ---------- | ------------------------------ | -------- | ----------------------------------------- |
| hasNav     | boolean                        | true     | 当前页面有无导航栏，以控制 drawer 高度    |
| visible    | boolean                        | required | 是否显示                                  |
| placement  | left \| right \| top \| bottom | right    | 展开的方向                                |
| width      | number                         | 250      | placement 为 left \| right 时，抽屉的宽度 |
| height     | number                         | 250      | placement 为 top \| bottom 时，抽屉的高度 |
| radius     | number                         | 0        | 抽屉圆角                                  |
| okText     | string                         | 确定     | 底部确认按钮的文本                        |
| cancelText | string                         | 取消     | 底部取消按钮的文本                        |

###### Slots

| name    | desc     |
| ------- | -------- |
| default | 主体内容 |
| title   | 标题内容 |
| footer  | 底部内容 |

###### Emits

| name           | desc             |
| -------------- | ---------------- |
| update:visible | 显示状态变化触发 |
| close          | 点击取消按钮     |
| ok             | 点击确认按钮     |

#### 图标 Icon

###### 基本使用

```html
<ml-icon :name="icon" :size="24" color="#808080" />
```

```ts
export default {
  id: '4118979',
  name: 'MeleonUI',
  font_family: 'ml-icon',
  css_prefix_text: 'ml-',
  description: '',
  glyphs: [
    {
      icon_id: '8106223',
      name: 'cancel',
      font_class: 'close--circle',
      unicode: 'e698',
      unicode_decimal: 59032
    },
    {
      icon_id: '8106241',
      name: 'information',
      font_class: 'info--circle',
      unicode: 'e6a5',
      unicode_decimal: 59045
    },
    {
      icon_id: '8106248',
      name: 'selection',
      font_class: 'selection--circle',
      unicode: 'e6a6',
      unicode_decimal: 59046
    },
    {
      icon_id: '11992738',
      name: 'github',
      font_class: 'github',
      unicode: 'e6a9',
      unicode_decimal: 59049
    },
    {
      icon_id: '18531280',
      name: 'right arrow',
      font_class: 'arrow-right--line',
      unicode: 'e701',
      unicode_decimal: 59137
    },
    {
      icon_id: '38175316',
      name: 'right arrow',
      font_class: 'arrow-left--line',
      unicode: 'e87f',
      unicode_decimal: 59519
    },
    {
      icon_id: '12865674',
      name: 'night',
      font_class: 'night',
      unicode: 'e6ef',
      unicode_decimal: 59119
    },
    {
      icon_id: '12865690',
      name: 'day',
      font_class: 'day',
      unicode: 'e6f1',
      unicode_decimal: 59121
    },
    {
      icon_id: '702307',
      name: 'drag',
      font_class: 'drag',
      unicode: 'e7d0',
      unicode_decimal: 59344
    },
    {
      icon_id: '11488125',
      name: 'seleted',
      font_class: 'selected',
      unicode: 'e763',
      unicode_decimal: 59235
    },
    {
      icon_id: '10678428',
      name: 'mirror light ctrl',
      font_class: 'filter',
      unicode: 'e6e0',
      unicode_decimal: 59104
    },
    {
      icon_id: '5772874',
      name: '复制',
      font_class: 'copy',
      unicode: 'e617',
      unicode_decimal: 58903
    },
    {
      icon_id: '4936963',
      name: 'CodeSandbox',
      font_class: 'code-sandbox',
      unicode: 'e87e',
      unicode_decimal: 59518
    },
    {
      icon_id: '8106210',
      name: 'bluetoothon',
      font_class: 'bluetoothon',
      unicode: 'e697',
      unicode_decimal: 59031
    },
    {
      icon_id: '8106293',
      name: 'wifi',
      font_class: 'wifi',
      unicode: 'e6a4',
      unicode_decimal: 59044
    },
    {
      icon_id: '10678426',
      name: 'message',
      font_class: 'message',
      unicode: 'e6df',
      unicode_decimal: 59103
    },
    {
      icon_id: '10678434',
      name: 'search',
      font_class: 'search',
      unicode: 'e6e1',
      unicode_decimal: 59105
    },
    {
      icon_id: '10678439',
      name: 'scan QR',
      font_class: 'scan',
      unicode: 'e6e2',
      unicode_decimal: 59106
    },
    {
      icon_id: '10678401',
      name: 'back',
      font_class: 'arrow-left',
      unicode: 'e6db',
      unicode_decimal: 59099
    },
    {
      icon_id: '8106272',
      name: 'next',
      font_class: 'arrow-right',
      unicode: 'e6a3',
      unicode_decimal: 59043
    },
    {
      icon_id: '8106251',
      name: 'increase',
      font_class: 'plus',
      unicode: 'e69f',
      unicode_decimal: 59039
    },
    {
      icon_id: '8106217',
      name: 'delete',
      font_class: 'delete',
      unicode: 'e699',
      unicode_decimal: 59033
    },
    {
      icon_id: '8106245',
      name: 'close',
      font_class: 'close',
      unicode: 'e69e',
      unicode_decimal: 59038
    },
    {
      icon_id: '10670577',
      name: 'address',
      font_class: 'address',
      unicode: 'e6a7',
      unicode_decimal: 59047
    },
    {
      icon_id: '12865660',
      name: 'connect device',
      font_class: 'connect',
      unicode: 'e6e7',
      unicode_decimal: 59111
    },
    {
      icon_id: '12865665',
      name: 'done work',
      font_class: 'donework',
      unicode: 'e6e9',
      unicode_decimal: 59113
    },
    {
      icon_id: '12865672',
      name: 'like',
      font_class: 'like',
      unicode: 'e6eb',
      unicode_decimal: 59115
    },
    {
      icon_id: '12865673',
      name: 'mark',
      font_class: 'mark',
      unicode: 'e6ec',
      unicode_decimal: 59116
    },
    {
      icon_id: '12865685',
      name: 'share',
      font_class: 'share',
      unicode: 'e6ee',
      unicode_decimal: 59118
    },
    {
      icon_id: '12865693',
      name: 'setting',
      font_class: 'setting',
      unicode: 'e6f0',
      unicode_decimal: 59120
    },
    {
      icon_id: '8106224',
      name: 'down',
      font_class: 'arrow-down',
      unicode: 'e69b',
      unicode_decimal: 59035
    },
    {
      icon_id: '8106260',
      name: 'upward',
      font_class: 'arrow-up',
      unicode: 'e6a1',
      unicode_decimal: 59041
    },
    {
      icon_id: '8106276',
      name: 'visible',
      font_class: 'eye-close',
      unicode: 'e6a2',
      unicode_decimal: 59042
    },
    {
      icon_id: '8106285',
      name: 'eye_protection',
      font_class: 'eye',
      unicode: 'e6a0',
      unicode_decimal: 59040
    }
  ]
}
```

#### 输入框 Input

###### 基本使用

```html
<ml-input v-model:model-value="modelValue" placeholder="提示文字可自定义" />

<ml-input v-model:model-value="modelValue" :size="inputSize" />

<ml-input v-model:model-value="modelValue" type="password" />

<ml-input v-model:model-value="modelValue" disabled :size="inputSize" />
```

#### 选择器 Select

###### 基本使用

```html
<ml-select v-model:modelValue="modelValue" multiple :max-tag-count="1">
    <ml-option value="1" label="选项1" />
    <ml-option value="2" label="选项2" />
    <ml-option value="3" label="选项3" />
</ml-select>
```



#### 表格 Table

###### 基本使用

```html
<ml-table
	:data="tableData"
	size="mini"
	stripe
	border
	:height="200"
	:loading="false"
	:refresher-enabled="true"
	:refresher-interval="2000"
	style="width: 100%"
	@row-click="onRowClick"
	@cell-click="onCellClick"
>
    <template #cell="{ column, row }">
        <block v-if="column.property === 'gender'">
            <ml-tag :model-value="row[column.property]" type="primary" size="mini"></ml-tag>
        </block>
        <block v-else-if="column.property === 'age'">
            <ml-count-to
                         :to="row[column.property]"
                         animation
                         :value-style="{ fontSize: '14px', color: 'var(--info-color-8)' }"
                         ></ml-count-to>
        </block>
        <text v-else>{{ column.property && row[column.property] }}</text>
    </template>
    <!-- 。。。这操作有点多余，后面改改 -->
    <ml-table-column type="index" fixed="left"></ml-table-column>
    <ml-table-column prop="name" label="姓名" fixed></ml-table-column>
    <ml-table-column prop="age" label="年龄"></ml-table-column>
    <ml-table-column prop="gender" label="性别"></ml-table-column>
</ml-table>
```

#### 时间轴 TimeLine

###### 基本使用

```html
<ml-timeline :reverse="reverseCheckedList[0] === 'reverse'">
    <ml-timeline-item>
        <template #label>
        	<text>2023-09-08</text>
        </template>
        <view>The first milestone content</view>
    </ml-timeline-item>
    <ml-timeline-item>
        <template #label>
        	<text>2023-09-09</text>
        </template>
        <view>
            <view>The second milestone</view>
            <view>The second milestone</view>
            <view>The second milestone</view>
        </view>
    </ml-timeline-item>
    <ml-timeline-item>
        <template #label>
        	<text> 2023-09-25 </text>
        </template>
        <view>The third milestone </view>
    </ml-timeline-item>
</ml-timeline>
```

#### 消息提示 Message

###### 基本使用

```html
<ml-message ref="messageRef" />
```

```ts
import type { MessageInstance, MessageOptions } from '@meleon/uni-ui'

const messageRef = ref<MessageInstance>()

const showMessage = (type: MessageOptions['type']) => {
    if (!messageRef.value || !type) return
    messageRef.value[type]({
      content: type + idx.value++,
      duration: 2000
    })
}
```

#### 进度条 Progress

###### 基本使用

```html
<ml-progress :percent="percent" status="success" />

<ml-progress :percent="templateMap[0].percent">
	<template #text="{ percent, decimal }">
		<text>进度 {{ (percent * 100).toFixed(decimal) }}%</text>
	</template>
</ml-progress>

<ml-progress :percent="percent" type="circle" :size="curSize" status="primary" />
```

#### 标签页 Tabs

###### 基本使用

```html
<ml-tabs active="a">
    <ml-tab value="a" title="标签1" closable>内容1</ml-tab>
    <ml-tab value="b" title="标签2" disabled>内容2</ml-tab>
    <ml-tab value="c" title="标签3" disabled closable>内容3</ml-tab>
    <ml-tab value="d" title="标签4">内容4</ml-tab>
    <ml-tab value="e" title="标签5">内容5</ml-tab>
</ml-tabs>
```

#### 标签 Tag

###### 基本使用

```html
<ml-tag model-value="标签2" type="primary" plain />

<ml-tag model-value="标签3" size="medium" />

<view>closeable: 添加 ml-close 图标，点击可触发 close 事件</view>
<ml-tag model-value="标签1" closable @close="hanldeTagClose" />

<view>editable: 点击后标签会切换成 input 输入框，可修改标签内容 </view>
<ml-tag model-value="标签2" checkable @click="hanldeTagClick" />

<view>checkable: 添加点击样式，触发 click 事件</view>
<ml-tag v-model:model-value="tagValue" editable />
```


### 开发指南

#### 一、快速上手

##### 演示
使用微信扫描下方的小程序码，在线查看组件的渲染效果。

[注：如果因为网络等原因，小程序码图片无法加载，也可以直接输入 `Meleon Uni-ui` 关键字查询]



![image-20231007221035897](https://github.com/floruitShow2/MeleonUI/raw/90bee9322594d979af8749c6c626bcbada93ffda/src/assets/app/mpweixin-code.jpg)

##### 安装

```shell
# npm
npm install @meleon/uni-ui
```

##### 引入

H5 端

```ts
import MeleonUI from "@meleon/uni-ui"

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
import MeleonUI from "@meleon/uni-ui";
import MlButton from '@meleon/uni-ui/lib/ml-button/index.vue'
import App from './App.vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(MeleonUI)

  app.component('MlButtonGlobal', MlButton)

  return {
    app
  }
}
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
    app.component('MlButton', _Button)
}

export default { install }
```

虽然本质上都是使用 `app.component` 实现注册组件，但 uniapp 编译的结果却并不完全相同

在 `main.ts` 中注册 `MlButtonGroup` 组件被编译成函数

而 `meleon-ui.ts` 里的组件被编译成对象

在使用时也是前者可以被正常渲染成组件展示到页面上

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
    background="#7A98B3"
  ></ml-navigator>
  <ml-button
    type="primary"
    @click="onNavigate('/pages/componentList/index')"
  >
    {{ $t('home.actions.start') }}
    <ml-icon icon="ml-arrow-right--line" color="#FFFFFF" />
  </ml-button>
</ml-config-provider>
// script
import type { ConfigProviderProps } from '@meleon/uni-ui'

const themes: ConfigProviderProps['themes'] = {
    primary: '#D74B4B',
}
```

themes 支持以下属性，可根据项目的设计风格批量修改，当然，直接通过 CSS 修改样式也是可以的。

```ts
export type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'danger'
```

#### 三、类型声明

在使用组件时，为了得到更好的类型提示，可以在 `tsconfig.json` 中注入 `MeleonUI` 的类型声明文件，如下所示。
如果你的编辑器中安装了 `Volar` 插件，注入成功后应该可以看到组件标签的颜色发生了变化，且当尝试传入组件 props 时，编辑器也会给出可选值的提示信息。

```json
{
  "types": ["@dcloudio/types", "@meleon/uni-ui"]
}
```

#### 四、更新日志

- 1.2.0
  - refactor: 打包结果调整
    - 去除初始的 .ts 文件
    - 去除用于 **重新导出** 的 `index.js` 和 `index.d.ts` 文件
    - 使用 terser 压缩代码，大幅降低组件库构建到小程序后的体积
    - `@meleon/uni-ui`小程序主包的构建体积从优化前的 **2.2MB** 降低到现在的 **958KB**
    - **注：**如果准备将 `1.1` 版本升级到 `1.2`版本，最好检查下之前对组件库内部方法、类型的引用路径是否存在问题，避免出现 bug
  - feat: 调整 `ml-form` 组件，添加下拉选框、多选、日期选择器、开关等表单项
- 1.1.13
  - feat: 新增 `ml-form` 组件【暂时仅支持 input 组件作为表单项】
  - feat: 新增 `ml-transition` 组件


- 1.1.12
  - style: `ml-drawer` 组件添加动效
  - fix: `ml-list` 组件修改虚拟列表插槽名称错误
  - feat: 新增 `ml-datetime-picker`、`ml-time-picker` 两个时间选择组件
- 1.1.11
  - feat: 调整 `ml-navigator` 组件的结构，完善功能
  - feat: 添加 `ml-switch` 组件
  - feat: `ml-cell` 组件添加 `SWITCH` 类型
  - fix: `ml-cell` 组件传入的 value 发生变化时未触发页面更新
  - feat: 新增 `ml-list` 组件，初步支持基础列表和虚拟列表功能
- 1.1.10
  - fix: `ml-checkbox` 设置 direction 失效的问题
  - fix: `ml-image` 预览层层级过低的问题
  - fix: `ml-select` 无激活样式的问题
  - fix: `ml-input-tag` 确认后未触发新增标签
  - docs: `@meleon/uni-ui`上线微信小程序，可体验各个组件的使用效果【微信扫描“演示”小程序码】
- 1.1.9
  - fix: `ml-loading` 图标缺失，`ml-button` 组件设置 loading 不生效
  - feat: 新增 `ml-image` 组件
  - feat: `ml-tree` 组件模块拆分，支持自定义 title 节点
  - feat: 新增 `ml-icon-switcher` 小组件
  - fix: `ml-button` 单图标按钮图标偏移的问题
  - feat: `ml-tree` 组件基本功能完善，支持文本选中、复选框选择、自定义标题节点等
  - fix: 去除 `ml-checkbox` 组件无文本时样式的偏移
  - feat: `ml-tree` 组件新增对外暴露的 expand、check 及 select 等方法
- 1.1.8
  - feat: 新增 `ml-cell`、`ml-cell-group` 组件
  - feat: 新增 `ml-uploader` 组件
- 1.1.7
  - feat: 新增 `ml-config-provider` 组件
  - docs: 调整项目接口，补全TS类型，新增 README 文档


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

#### 时间选择器 DatetimePicker

###### 基本使用

```html
<ml-datetime-picker
    v-model="value"
    mode="date"
    :disabled-date="isDateDisabled"
    style="width: 100%"
    @change="handleValueChange"
>
    <template #trigger>
        <ml-cell
            label="日期选择器"
            :value="formatToDateTime(value)"
            style="width: 100%"
        ></ml-cell>
    </template>
</ml-datetime-picker>
const value = ref(new Date())

const isDateDisabled = (current: Date) => {
    return current.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000
}

const handleValueChange = (value: DatetimePickerProps['modelValue']) => {
    console.log('change', value)
}
```

###### APIs

| prop               | type                       | default      | desc                   |
| ------------------ | -------------------------- | ------------ | ---------------------- |
| modelValue         | Date, string, number       | ''           | 选择的日期时间         |
| defaultModelValue  | Date, string, number       | ''           | 默认展示的日期时间     |
| pickerValue        | Date, string, number       | ''           | 面板头部展示的时间     |
| defaultPickerValue | Date, string, number       | ''           | 面板头部默认展示的时间 |
|                    |                            |              |                        |
| locale             | Record<string, any>        | {}           | 自定义面板中展示的文本 |
| mode               | 'date', 'year', 'month'    | 'date'       | 选择器模式             |
| format             | string                     | 'YYYY-MM-DD' | 时间转换格式           |
|                    |                            |              |                        |
| disabledDate       | (current: Date) => boolean | undefined    | 判断日期是否禁用       |

###### Emits

| name              | type                  | desc                 |
| ----------------- | --------------------- | -------------------- |
| change            | (value: Date) => void | 选中值发生变化时触发 |
| update:modelValue | (value: Date) => void | 双向绑定选中日期     |

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

#### 图片 Image

###### 基本使用

| prop        | type          | default                     | desc                                                         |
| ----------- | ------------- | --------------------------- | ------------------------------------------------------------ |
| hasNav      | boolean       | true                        | 当前页面是否有导航栏，会计算系统导航栏高度，预览区域下移一段距离 |
| src         | string        | 必填项                      | 图片的资源路径                                               |
| mode        | ImageModeEnum | ImageModeEnum.ASPECT_FIT    | 图片的填充模式，可参照uniapp官方提供的 Image 组件的 mode 值  |
| width       | number        | 100                         | 图片宽度                                                     |
| height      | number        | 100                         | 图片高度                                                     |
| tools       | string        | zoomIn,zoomOut,rotate,reset | 由这四种工具随意组合，【,】拼接而成的字符串                  |
| showPreview | boolean       | true                        | 是否允许点击图片后展示预览                                   |
| showLoading | boolean       | false                       | 是否展示加载中标识                                           |
| showError   | boolean       | false                       | 是否展示加载失败提示                                         |

###### Slots

| name    | desc             |
| ------- | ---------------- |
| loading | 调整加载中提示   |
| error   | 覆盖加载失败提示 |

###### Emits

| name   | desc         |
| ------ | ------------ |
| loaded | 加载成功触发 |
| error  | 加载失败触发 |
| click  | 点击图片     |

#### 输入框 Input

###### 基本使用

```html
<ml-input v-model:model-value="modelValue" placeholder="提示文字可自定义" />

<ml-input v-model:model-value="modelValue" :size="inputSize" />

<ml-input v-model:model-value="modelValue" type="password" />

<ml-input v-model:model-value="modelValue" disabled :size="inputSize" />
```

#### 列表 List

###### 基本使用

基础列表使用示例

```html
<ml-list
    ref="listRef"
    v-model:error="error"
    :data="mockData"
    :loading="loading"
    :loading-text="'自定义的加载中文本...'"
    :finished="finished"
    :height="400"
    style="width: 100%"
    @load="handleLoad"
>
    <template #item="{ item }">
        <ml-cell
            :label="item.label"
            :description="item.description"
            :value="item.value"
            allow-edit
        />
    </template>
</ml-list>
import type { ListInstance, MessageInstance } from '@meleon/uni-ui'

const mockData = ref(
    new Array(20).fill(0).map((_, index) => {
        return {
            id: `id-${index}`,
            label: `标题${index}`,
            description: `描述${index}`,
            value: `值${index}`
        }
    })
)

const listRef = ref<ListInstance>()
const messageRef = ref<MessageInstance>()
const finished = ref(false)
const loading = ref(false)
const error = ref(true)
const handleLoad = () => {
    if (!messageRef.value) return
    if (mockData.value.length >= 60) {
        finished.value = true
    }

    if (finished.value) {
        messageRef.value.success({
            content: '所有数据加载完成',
            duration: 2000
        })
    } else {
        messageRef.value.primary({
            content: '触发 load 事件',
            duration: 2000
        })

        mockData.value = [
            ...mockData.value,
            ...new Array(20).fill(0).map((_, index) => {
                const idx = mockData.value.length + index
                return {
                    id: `id-${idx}`,
                    label: `标题${idx}`,
                    description: `描述${idx}`,
                    value: `值${idx}`
                }
            })
        ]
    }
}

onMounted(() => {
  if (listRef.value) listRef.value.scrollIntoView('id-10')
})
```

虚拟列表使用示例

区别于基础列表，虚拟列表不支持调用 load 加载新数据，使用时需要准备好完整的初始数据

默认情况下，页面上仅展示15条数据节点，可以通过传入 pageSize 自定义每页展示的数量

```html
<ml-list :data="mockData" :height="400" virtual-list style="width: 100%">
    <template #virtual="{ data }">
        <ml-cell
            v-for="item in data"
            :key="item.id"
            :label="item.label"
            :description="item.description"
            :value="item.value"
            allow-edit
        ></ml-cell>
    </template>
</ml-list>
const mockVirtualData = ref(
    new Array(100).fill(0).map((_, index) => {
        return {
            id: `id-${index}`,
            label: `标题${index}`,
            description: `描述${index}`,
            value: `值${index}`
        }
    })
)
```

###### APIs

| prop         | type     | default            | desc                                                     |
| ------------ | -------- | ------------------ | -------------------------------------------------------- |
| data         | WithId[] | []                 | 列表数据，需要提供 id 字段用以定位等操作                 |
| height       | number   | 必填               | 列表容器的高度                                           |
| itemHeight   | number   | 58                 | 列表项的高度，可控制提示文本的高度及滚动阈值             |
| loading      | boolean  | false              | 是否处于加载状态                                         |
| loadingText  | string   | 加载中...          | 加载状态底部的提示文本                                   |
| finished     | boolean  | false              | 是否加载完成                                             |
| finishedText | string   | 没有更多了         | 加载完成时，底部的提示文本                               |
| error        | boolean  | false              | 是否加载失败                                             |
| errorText    | string   | 加载失败，点击重试 | 加载失败时，底部的提示文本【可点击，重新触发 load 事件】 |
|              |          |                    |                                                          |
| virtualList  | boolean  | false              | 是否开启虚拟列表                                         |
| pageSize     | number   | 15                 | 虚拟列表中展示的数量                                     |

###### Slots

| name     | desc             |
| -------- | ---------------- |
| loading  | 加载中           |
| error    | 加载异常         |
| finished | 加载完成         |
| virtual  | 虚拟列表         |
| item     | 普通列表的列表项 |

###### Methods

| name           | type                                     | desc                             |
| -------------- | ---------------------------------------- | -------------------------------- |
| scrollToTop    | () => void                               | 滚动到顶部                       |
| scrollIntoView | (id: string \| number \| symbol) => void | 滚动到指定节点【仅支持普通列表】 |

###### Events

| name         | desc               |
| ------------ | ------------------ |
| update:error | 更新 error 属性    |
| load         | 列表滚动到底部触发 |

#### 选择器 Select

###### 基本使用

```html
<ml-select v-model:modelValue="modelValue" multiple :max-tag-count="1">
    <ml-option value="1" label="选项1" />
    <ml-option value="2" label="选项2" />
    <ml-option value="3" label="选项3" />
</ml-select>
```

#### 开关 Switch

###### 基本使用

```html
<ml-switch v-model="isActive"></ml-switch>

<ml-switch v-model="isActive" type="circle"></ml-switch>

<ml-switch v-model="isActive" type="line"></ml-switch>
```

###### APIs

| prop           | type                                             | default                | desc           |
| -------------- | ------------------------------------------------ | ---------------------- | -------------- |
| modelValue     | boolean                                          | false                  | 是否开启       |
| type           | circle \| square \|line                          | square                 | 开关类型       |
| checkedColor   | string                                           | var(--info-color-7)    | 激活状态颜色   |
| uncheckedColor | string                                           | var(--primary-color-6) | 未激活状态颜色 |
| disabled       | boolean                                          | false                  | 是否禁用       |
| beforeSwitch   | (newVal: boolean) => boolean \| Promise<boolean> | () => true             | 切换前触发     |

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

#### 消息提示 Message

###### 基本使用

```html
<ml-message ref="messageRef" />
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

#### 头部导航栏 Navigator

###### 基本使用

```html
<ml-navigator
  title="ml-navigator"
  title-color="#FFFFFF"
  has-back
  icon-color="#FFFFFF"
  background="#7A98B3"
/>
```

###### APIs

| prop       | type                       | default                | desc                             |
| ---------- | -------------------------- | ---------------------- | -------------------------------- |
| background | string                     | var(--primary-color-6) | 导航栏背景，支持纯色、渐变或图片 |
| title      | string                     | ''                     | 导航栏标题                       |
| titleColor | string                     | #FFFFFF                | 标题颜色                         |
| titleStyle | Object                     | {}                     | 标题样式                         |
| hasBack    | boolean                    | true                   | 是否有回退图标                   |
| iconColor  | string                     | #FFFFFF                | 图标颜色                         |
| iconStyle  | Object                     | {}                     | 图标样式                         |
| tools      | Array<NavigatorToolEntity> | []                     | 图标列表                         |

```
NavigatorToolEntity
```

| prop  | type                | desc                                         |
| ----- | ------------------- | -------------------------------------------- |
| icon  | string              | 图标名                                       |
| color | string              | 图标颜色                                     |
| type  | return \| navigator | 点击图标的事件的类型                         |
| delta | number[可选]        | type = return 时，delta 表示回退的页面数     |
| path  | string[可选]        | type = navigator 时，path 表示跳转的页面地址 |

###### Slots

| name    | desc         |
| ------- | ------------ |
| icon    | 图标插槽     |
| default | 主体内容插槽 |

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

#### 时间选择器 TimePicker

###### 基本使用

```html
<ml-time-picker v-model="value" style="width: 100%">
    <template #trigger>
        <ml-cell
            label="时间选择器"
            :value="value"
            style="width: 100%"
        ></ml-cell>
    </template>
</ml-time-picker>
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

#### 树 Tree

###### 基本使用

```html
<ml-tree
  class="tree-wrapper"
  ref="treeRef"
  v-model:expanded-keys="expandedKeys"
  v-model:checked-keys="checkedKeys"
  v-model:selected-keys="selectedKeys"
  v-model:indeterminate-keys="indeterminateKeys"
  :data="treeData"
  checkable
  selectable
  multiple
  :auto-expand-parent="false"
  @check="handleCheck"
  @select="handleSelect"
  @expand="handleExpand"
></ml-tree>

<view class="btn-list">
    <ml-button type="primary" @click="handleExpandAll">
        {{ isExpandAll ? 'Close All' : 'Expand All' }}
    </ml-button>

    <ml-button type="primary" @click="handleCheckAll">
        {{ isCheckAll ? 'Unheck All' : 'Check All' }}
    </ml-button>

    <ml-button type="primary" @click="handleSelectAll">
        {{ isSelectAll ? 'Unselect All' : 'Select All' }}
    </ml-button>

    <ml-button type="primary" @click="handleExpandNode"> Expand Root </ml-button>

    <ml-button type="primary" @click="handleCheckNode"> Check Root </ml-button>

    <ml-button type="primary" @click="handleSelectNode"> Select Root </ml-button>
</view>
  import type {
    TreeDataEntity,
    TreeCheckPayload,
    TreeExpandPayload,
    TreeSelectPayload,
    TreeInstance
  } from '@meleon/uni-ui/index'

  const treeRef = ref<TreeInstance>()
  const rootKey = ref('0-0')
  const expandedKeys = ref<string[]>(['0-0-0'])
  const checkedKeys = ref<string[]>([])
  const selectedKeys = ref<string[]>([])
  const indeterminateKeys = ref<string[]>([])
  
  // 监听 tree 触发的事件
  const handleCheck = (val: string[], payload: TreeCheckPayload) => {
    console.log('onCheck', val, payload)
  }
  const handleExpand = (val: string[], payload: TreeExpandPayload) => {
    console.log('onExpand', val, payload)
  }
  const handleSelect = (val: string[], payload: TreeSelectPayload) => {
    console.log('onSelect', val, payload)
  }

  // 手动调用组件暴露的方法
  
  // 展开节点
  const isExpandAll = ref(false)
  const handleExpandAll = () => {
    if (!treeRef.value) return
    isExpandAll.value = !isExpandAll.value
    treeRef.value.expandAll(isExpandAll.value)
  }
  const handleExpandNode = () => {
    if (!treeRef.value) return
    treeRef.value.expandNode(rootKey.value, true)
  }

  // 选中节点复选框
  const isCheckAll = ref(false)
  const handleCheckAll = () => {
    if (!treeRef.value) return
    isCheckAll.value = !isCheckAll.value
    treeRef.value.checkAll(isCheckAll.value)
  }
  const handleCheckNode = () => {
    if (!treeRef.value) return
    treeRef.value.checkNode(rootKey.value, true)
  }

  // 选中节点
  const isSelectAll = ref(false)
  const handleSelectAll = () => {
    if (!treeRef.value) return
    isSelectAll.value = !isSelectAll.value
    treeRef.value.selectAll(isSelectAll.value)
  }
  const handleSelectNode = () => {
    if (!treeRef.value) return
    treeRef.value.selectNode(rootKey.value, true)
  }

  // 节点数据
  const treeData: TreeDataEntity[] = [
    {
      title: 'Trunk 0-0',
      key: '0-0',
      children: [
        {
          title: 'Branch 0-0-0',
          key: '0-0-0',
          disabled: false,
          children: [
            {
              title: 'Leaf',
              key: '0-0-0-0'
            },
            {
              title: 'Leaf',
              key: '0-0-0-1'
            }
          ]
        },
        {
          title: 'Branch 0-0-1',
          key: '0-0-1',
          children: [
            {
              title: 'Leaf',
              key: '0-0-1-0'
            }
          ]
        }
      ]
    }
  ]
```

###### APIs

| prop                | type             | default   | desc                           |
| ------------------- | ---------------- | --------- | ------------------------------ |
| data                | TreeDataEntity[] | 必填      | 树形数据                       |
| checkable           | boolean          | false     | 是否显示复选框                 |
| checkedKeys         | string[]         | undefined | 选中复选框的节点键值列表       |
| defaultCheckedKeys  | string[]         | []        | 默认选中复选框的节点键值列表   |
| indeterminateKeys   | string[]         | []        | 半选状态的节点键值列表         |
| expandedKeys        | string[]         | 必填      | 展开的节点键值列表             |
| defaultExpandedKeys | string[]         | []        | 默认展开的节点键值列表         |
| autoExpandParent    | boolean          | true      | 是否自动展开父级节点           |
| selectable          | boolean          | false     | 是否支持点击文本选中           |
| selectedKeys        | string[]         | undefined | 选中的文本节点键值列表         |
| defaultSelectedKeys | string[]         | []        | 默认选中的文本节点键值列表     |
| multiple            | boolean          | true      | 点击文本节点的选择是否支持多选 |

###### Slots

| name  | desc               | prop  |
| ----- | ------------------ | ----- |
| title | 自定义文本节点内容 | title |

###### Emits

| name                     | desc                              | params                                                       |
| ------------------------ | --------------------------------- | ------------------------------------------------------------ |
| update:expandedKeys      | 更新 expandedKeys【v-model】      | expandedKeys: string[]                                       |
| expand                   | 展开时触发                        | 1. expandedKeys: string[]<br />2. {<br />    expanded: boolean<br />    node: TreeNodeEntity<br />    nodeData: TreeDataEntity<br />} |
| update:selectedKeys      | 更新 selectedKeys【v-model】      | selectedKeys: string[]                                       |
| select                   | 点击文本节点时触发                | 1. selectedKeys: string[]<br />2. {<br />    selected: boolean<br />    node: TreeNodeEntity<br />    nodeData: TreeDataEntity<br />} |
| update:checkedKeys       | 更新 checkedKeys【v-model】       | checkedKeys: string[]                                        |
| check                    | 点击节点复选框时触发              | 1. checkedKeys: string[]<br />2. {<br />    checked: boolean<br />    checkedKeys: string[]<br />    indeterminateKeys: string[]<br />    node: TreeNodeEntity<br />    nodeData: TreeDataEntity<br />} |
| update:indeterminateKeys | 更新 indeterminateKeys【v-model】 | indeterminateKeys: string[]                                  |

###### Events

| name                  | desc                 | params                                               |
| --------------------- | -------------------- | ---------------------------------------------------- |
| getExpandedNodes      | 获取展开的节点       | () => TreeNodeEntity[]                               |
| expandNode            | 展开指定的节点       | (key: string \| string[], expand: boolean) => void   |
| expandAll             | 展开所有节点         | (expandAll: boolean = true) => void                  |
|                       |                      |                                                      |
| getSelectedNodes      | 获取选中的节点       | () => TreeNodeEntity[]                               |
| selectNode            | 选择指定的节点       | (key: string \| string[], selected: boolean) => void |
| selectAll             | 选择所有节点         | (selectAll: boolean = true) => void                  |
|                       |                      |                                                      |
| getCheckedNodes       | 获取选中复选框的节点 | () => TreeNodeEntity[]                               |
| getIndeterminateNodes | 获取半选状态的节点   | () => TreeNodeEntity[]                               |
| checkNode             | 选中指定节点的复选框 | (key: string \| string[], checked: boolean) => void  |
| checkAll              | 选中所有节点的复选框 | (checkAll: boolean = true) => void                   |



#### 上传组件 Uploader

###### 基本使用

```vue
<template>
    <ml-uploader
        ref="uploadRef"
        v-model:file-list="fileList"
        action="http://localhost:3000/api/file/upload"
        multiple
        show-file-list
        :disabled="false"
        :auto-upload="false"
        :on-change="handleOnChange"
        @delete="handleDelete"
    >
        <template #trigger>
          <ml-button type="primary">选择文件</ml-button>
        </template>
    </ml-uploader>

  <ml-button
    type="primary"
    status="success"
    @click="handleSubmit"
  >
        上传
  </ml-button>
</template>

<script lang="ts" setup>
    import type { FileItem, UploaderInstance } from '@meleon/uni-ui/ml-uploader'
    
    const fileList = ref<FileItem[]>([])
    const handleDelete = () => {
    console.log('a', fileList.value)
  }

  const handleOnChange = (files: FileItem[]) => {
    console.log('a', files)
  }

  const uploadRef = ref<UploaderInstance>()
  const handleSubmit = () => {
    if (!uploadRef.value) return
    uploadRef.value.submit()
  }
</script>
```

###### APIs

| props        | type                                               | default    | desc                         |
| ------------ | -------------------------------------------------- | ---------- | ---------------------------- |
| action       | string \| () => string                             | ''         | 文件上传的地址               |
| autoUpload   | boolean                                            | false      | 是否自动上传                 |
| fieldName    | string                                             | file       | 上传时文件对应的字段名       |
| headers      | Record<string, string>                             | {}         | 上传时携带的请求头           |
| data         | Record<string, any>                                | {}         | 上传时 FromData 里其他的数据 |
| fileList     | FileItem                                           | 必填项     | 展示的文件列表               |
| multiple     | boolean                                            | false      | 是否支持同时选择多个文件     |
| limit        | number                                             | 9          | 最多缓存的文件数量           |
| previewSize  | number                                             | 100        | 预览区域尺寸                 |
| disabled     | boolean                                            | false      | 是否禁用                     |
| showFileList | boolean                                            | false      | 是否展示文件列表             |
| sourceType   | UploaderSourceTypeEnum                             | ''         | 支持相机或相册，默认都支持   |
| beforeUpload | (files: FileItem[]) => boolean \| Promise<boolean> | () => true | 上传前的钩子函数             |
| beforeDelete | (file: FileItem) => boolean \| Promise<boolean>    | () => true | 删除前的钩子函数             |

###### Types

```
FileItem
```

| prop      | desc           |
| --------- | -------------- |
| path      | 图片路径       |
| id        | 图片id         |
| deletable | 是否可以被删除 |

```
UploaderSourceTypeEnum
```

| enum   | desc   |
| ------ | ------ |
| ALBUM  | album  |
| CAMERA | camera |

###### Emits

| name            | desc               |
| --------------- | ------------------ |
| delete          | 文件在缓存中被删除 |
| uploaded        | 文件上传成功       |
| update:fileList | 文件列表更新       |

###### Methods

| name       | type                                 | desc                       |
| ---------- | ------------------------------------ | -------------------------- |
| submit     | () => void                           | 手动上传当前展示的所有文件 |
| updateFile | (id: string, file: FileItem) => void | 指定id，更新文件对象       |

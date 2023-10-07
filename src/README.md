

## 组件说明（暂不支持vue3）

基于Uniapp中  **movable-area** 和 **movable-view** 开发，可支持多个平台,传入list参数即可实现拖拽排序，而且是双向绑定的，无需其他操作，内置一些常用的参数，可开箱即用。


## 参数说明
| 参数              | 说明                                 | 类型     | 可选值 | 默认值  |
|-----------------|------------------------------------|--------|-----|------|
| value / v-model | 绑定值                                | array  | -   | []   |
| column          | 每行展示数量                             | number | -   | 3    |
| width           | 拖拽容器的宽度                            | string | -   | 100% |
| height          | 拖拽容器的高度，若不传则默认根据column和每个盒子的高度自动生成 | string |     | auto |
| itemKey         | 唯一key,必传 | string |   -  | -
| itemHeight      | 每个拖拽盒子的高度 | string |   -  | 100px
| direction       | 可拖拽方向,具体看movable-view | string |   all/vertical/horizontal/none  | all
| damping| 阻尼系数，用于控制x或y改变时的动画和过界回弹的动画，值越大移动越快 | number|   -  | 20


# 使用实例


```
index.vue

<template>
	<view class="drag-container">
		<basic-drag v-model="list" itemKey="title" :column="1" itemHeight="40px">
		    <template #item="{element}">
                         //注：小程序不能使用插槽这样进行使用，需在BasicDrag里面写入需要展示的item
			<view class="drag-item">{{ element.title }}</view>
		    </template>
		</basic-drag>
	</view>
</template>

<script>
import BasicDrag from './basic-drag/basic-drag.vue';
export default {
	components: { BasicDrag },
	data() {
		return {
			list: [{ title: '学习' }, { title: '游戏' }, { title: '自驾' }, { title: '旅游' }, { title: '考公' }],
		};
	},
};
</script>
```

## 打赏

如果你觉得本插件，解决了你的问题，可以请作者喝杯咖啡
<img src="https://i.328888.xyz/2023/02/28/zV27Q.jpeg" alt="alipay" width="100"><img src="https://i.328888.xyz/2023/02/28/zVw2H.jpeg" alt="wechat" width="100">



# useVirtualHooks

### 一、需求及功能介绍

##### 	需求：

​	避免长列表渲染节点过多导致性能上的损耗。

##### 	功能：

1. 每次仅截取原始数据的其中一部分渲染对应节点；

2. 用户向下滚动鼠标滚轮的过程中，如果最后一个节点与视口容器产生交叉区域，触发回调将截取的范围【向后】移动；

3. 同理，如果向上滚动鼠标滚轮期间，第一个节点与视口容器产生交叉区域，触发回调将截取的范围【向前】移动。

##### 	核心API：

​	intersectionObserver

### 二、hook 功能说明

##### 	（一）参数说明

​	@param -- list 完整的数据源列表

​	@param -- rootRef 虚拟列表的容器节点

​	@param -- options hook 的配置选项

##### 	（二）返回值说明

​	@returns -- {

​			renderList  当前渲染的数据片段

​			itemsRef 	数据片段渲染出来的节点信息，需要通过 ref 绑定到虚拟列表的节点上

​	}

##### 	（三）类型说明

```ts
// 渲染节点的类型，可能是 DOM节点 | 组件节点 | 未渲染 的情况存在，后续操作需要针对性处理
type ListItem = Element | ComponentPublicInstance | undefined
```

### 三、基本流程

##### （一）声明基础变量

```ts
// 起始索引
const startIdx = ref(0)
// 渲染节点列表
const itemsRef = ref<Array<ListItem>>([])
// 渲染节点的第一个元素
const firstItem = ref<ListItem>()
// 渲染节点的第二个元素
const lastItem = ref<ListItem>()
```

##### （二）声明功能函数

```ts
// 获取目标元素的 DOM 实例，如果是组件则获取它在 $el 里存储的内容
const getItemInstance = (target: ListItem): HTMLElement | undefined => {
	if (!target) return undefined
	return '$el' in target ? target.$el : target
}
// 获取节点的宽高数据，用来计算最终展示在页面的节点数量
const getBoundingRect = (target: ListItem) => {
	const el = getItemInstance(target)
	if (!el) return []
	const { width, height } = el.getBoundingClientRect()
	return [width, height]
}
```

##### （三）计算每次渲染的列数、行数以及总数

```ts
const computedNums = computed(() => {
	const firstEl = getItemInstance(firstItem.value)
	const [w, h] = getBoundingRect(firstEl)
	const [wrapperW, wrapperH] = getBoundingRect(rootRef.value)
	const rows = Number.isNaN(Math.floor(wrapperH / h) + 2) ? 4 : Math.floor(wrapperH / h) + 2
	const columns = Number.isNaN(Math.floor(wrapperW / w)) ? 5 : Math.floor(wrapperW / w)
	return {
		rows,
        columns,
        total: rows * columns
	}
})
```

##### （四）计算最终渲染的数据片段

```ts
const renderList = computed(() => {
	return list.value.slice(
        startIdx.value,
        startIdx.value + computedNums.value.total
    )
})
```

##### （五）添加 intersection observer 操作逻辑

```ts
// intersection 监听节点与视口交互的回调
const cb: IntersectionObserverCallback = (entries) => {
	entries.forEach((entry) => {
		const first = firstItem.value && getItemInstance(firstItem.value)
      	const last = lastItem.value && getItemInstance(lastItem.value)
      	if (entry.target === first) {
        	if (entry.isIntersecting && startIdx.value >= computedNums.value.columns) {
          		startIdx.value -= computedNums.value.columns
          		startIdx.value = startIdx.value < 0 ? 0 : startIdx.value
        	}
      	} else if (entry.target === last) {
        	if (
          		entry.isIntersecting &&
          		startIdx.value <= list.value.length - computedNums.value.total - computedNums.value.columns
        	) {
          		startIdx.value += computedNums.value.columns
        	}
      	}
	})
}

// intersectionObserver 的 options 配置
const intersectionOptions: IntersectionObserverInit = {
    root: rootRef.value,
    threshold: 0.75
}

// 初始化 intersectionObserver 实例
const observer = new IntersectionObserver(cb, intersectionOptions)

// 监听 itemsRef 的变化，更新 observer 监听的对象
watch(
    itemsRef,
    (newVal) => {
      	if (!newVal) return
      	const first = newVal[0]
      	const firstEl = getItemInstance(first)
      	const last = newVal[renderList.value.length - 1]
      	const lastEl = getItemInstance(last)
      	lastItem.value = last
      	firstItem.value = first
      	if (first && firstEl) observer.observe(firstEl)
      	if (last && lastEl) observer.observe(lastEl)
    },
    { deep: true }
 )
```

##### （六）补充：computedNums 在节点未渲染的情况下设置的默认值与最终要渲染的节点数量可能不一致，需要单独处理

```ts
// 保证 itemsRef 和 renderList 的长度始终保持一致
watch(renderList, (newVal) => {
    itemsRef.value = itemsRef.value.splice(0, newVal.length)
})
```

##### （七）使用

```tsx
const { renderList, itemsRef } = useVirtualScroll(categoryArticles, wrapperRef)

<div class="art-category-panel" ref={wrapperRef}>
	{
		renderList.value.map((item, idx) => (
			<WsArtCard
				ref={(el) => {
					if (itemsRef.value && el) itemsRef.value[idx] = el
				}}
				key={item.title}
				class="ws-art-card"
				details={item}
				v-slots={{
					image: () => <img src={item.image} />
				}}
			/>
		))
	}
</div>
```
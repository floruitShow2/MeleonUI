<template>
  <scroll-view scroll-y :style="[getScrollStyle]" :scroll-top="scrollTop" @scroll="handleScroll">
    <movable-area :style="[getAreaStyle]">
      <movable-view
        v-for="(item, index) in list"
        :key="item.key"
        :animation="animation"
        :direction="direction"
        :damping="damping"
        :x="item.x"
        :y="item.y"
        :disabled="longpress ? disabled : false"
        :style="[getViewStyle]"
        class="base-drag-wrapper"
        :class="{ active: activeIndex === index }"
        @longpress="handleLongpress"
        @touchstart="handleDragStart(index)"
        @change="handleMoving"
        @touchend="handleDragEnd"
      >
        <slot name="item" :element="item" :width="getItemWidth" :index="index"></slot>
      </movable-view>
    </movable-area>
  </scroll-view>
</template>

<script>
  export default {
    props: {
      column: {
        type: Number,
        default: 3
      },
      value: {
        type: Array,
        default: () => []
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: 'auto'
      },
      itemKey: {
        type: String,
        required: true
      },
      itemHeight: {
        type: String,
        default: '100px'
      },
      direction: {
        type: String,
        default: 'all',
        validator: (value) => {
          return ['all', 'vertical', 'horizontal', 'none'].includes(value)
        }
      },
      animation: {
        type: Boolean,
        default: true
      },
      damping: {
        type: Number,
        default: 20
      },
      longpress: {
        type: Boolean,
        default: true
      },
      disableDrag: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        list: [],
        disabled: true,
        activeIndex: -1,
        moveToIndex: -1,
        oldIndex: -1,
        tempDragInfo: {
          x: '',
          y: ''
        },
        cloneList: [],
        scrollTop: 0
      }
    },
    computed: {
      getScrollStyle() {
        const width = this.getRealWidth(this.width)
        return { width: width + 'px', height: this.height }
      },
      getAreaStyle() {
        const width = this.getRealWidth(this.width)
        return {
          width: width + 'px',
          height: Math.ceil(this.list.length / this.column) * this.getItemHeight + 'px'
        }
      },
      getViewStyle() {
        const { itemHeight, getItemWidth } = this
        return { width: getItemWidth + 'px', height: itemHeight }
      },
      getItemHeight() {
        return parseFloat(this.itemHeight)
      },
      getItemWidth() {
        if (this.column === 0) return
        const width = this.getRealWidth(this.width)
        return (parseFloat(width) / this.column).toFixed(2)
      }
    },
    watch: {
      value: {
        handler(newVal) {
          this.initList(newVal)
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      //获取实际的宽度
      getRealWidth(width) {
        if (width.includes('%')) {
          const windowWidth = uni.getSystemInfoSync().windowWidth - 10
          width = windowWidth * (parseFloat(width) / 100)
        }
        return width
      },

      initList(list = []) {
        const newList = this.deepCopy(list)
        this.list = newList.map((item, index) => {
          const [x, y] = this.getPosition(index)
          return {
            ...item,
            x,
            y,
            key: Math.random() + index
          }
        })
        console.log(this.list)
        this.cloneList = this.deepCopy(this.list)
      },

      //长按
      handleLongpress() {
        if (this.disableDrag) return
        this.disabled = false
      },

      //拖拽开始
      handleDragStart(index) {
        this.activeIndex = index
        this.oldIndex = index
      },

      //拖拽中
      handleMoving(e) {
        if (e.detail.source !== 'touch' || this.disabled) return
        const { x, y } = e.detail
        Object.assign(this.tempDragInfo, { x, y })
        const currentX = Math.floor((x + this.getItemWidth / 2) / this.getItemWidth)
        const currentY = Math.floor((y + this.getItemHeight / 2) / this.getItemHeight)

        this.moveToIndex = Math.min(currentY * this.column + currentX, this.list.length - 1)

        if (this.oldIndex !== this.moveToIndex && this.oldIndex !== -1 && this.moveToIndex !== -1) {
          const newList = this.deepCopy(this.cloneList)
          newList.splice(this.moveToIndex, 0, ...newList.splice(this.activeIndex, 1))

          this.list.forEach((item, index) => {
            if (index !== this.activeIndex) {
              const itemIndex = newList.findIndex((val) => val[this.itemKey] === item[this.itemKey])
              ;[item.x, item.y] = this.getPosition(itemIndex)
            }
          })
          this.oldIndex = this.moveToIndex
          this.scrollIntoView()
        }
      },

      //获取当前的位置
      getPosition(index) {
        const x = (index % this.column) * this.getItemWidth
        const y = Math.floor(index / this.column) * this.getItemHeight
        return [x, y]
      },

      //拖拽结束
      handleDragEnd(e) {
        if (this.disabled) return
        if (
          this.moveToIndex !== -1 &&
          this.activeIndex !== -1 &&
          this.moveToIndex !== this.activeIndex
        ) {
          this.cloneList.splice(this.moveToIndex, 0, ...this.cloneList.splice(this.activeIndex, 1))
        } else {
          this.$set(this.list[this.activeIndex], 'x', this.tempDragInfo.x)
          this.$set(this.list[this.activeIndex], 'y', this.tempDragInfo.y)
        }
        this.initList(this.cloneList)
        const endList = this.list.map((item) => this.omit(item, ['x', 'y', 'key']))
        this.$emit('input', endList)
        this.$emit('end', endList)
        this.$emit('update:value', endList)

        this.activeIndex = -1
        this.oldIndex = -1
        this.moveToIndex = -1
        this.disabled = true
      },

      scrollIntoView() {
        if (this.height === 'auto') return
        const { height, moveToIndex, getItemHeight, scrollTop } = this

        if ((moveToIndex + 1) * this.getItemHeight >= scrollTop + parseFloat(height)) {
          this.scrollTop = Math.min(
            parseFloat(this.getAreaStyle.height),
            scrollTop + Math.ceil(moveToIndex / 2) * this.getItemHeight
          )
        } else if ((moveToIndex - 1) * this.getItemHeight <= scrollTop) {
          this.scrollTop = Math.max(0, scrollTop - Math.ceil(moveToIndex / 2) * this.getItemHeight)
        }
      },

      setScrollTop(index) {
        this.scrollTop = index * this.getItemHeight
      },

      handleScroll(e) {
        this.scrollTop = e.detail.scrollTop
      },

      deepCopy(source) {
        return JSON.parse(JSON.stringify(source))
      },

      /**
       * 排除掉obj里面的key值
       * @param {object} obj
       * @param {Array|string} args
       * @returns {object}
       */
      omit(obj, args) {
        if (!args) return obj
        const newObj = {}
        const isString = typeof args === 'string'
        const keys = Object.keys(obj).filter((item) => {
          if (isString) {
            return item !== args
          }
          return !args.includes(item)
        })

        keys.forEach((key) => {
          if (obj[key] !== undefined) newObj[key] = obj[key]
        })
        return newObj
      }
    }
  }
</script>

<style lang="less" scoped>
  .base-drag-wrapper {
    opacity: 1;
    z-index: 1;
    box-sizing: border-box;
    padding: 0 5px;
    &.active {
      opacity: 0.7;
      transform: scale(1.3);
      z-index: 99;
    }
  }
</style>

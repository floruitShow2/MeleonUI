<!-- uniapp vue3 markdown解析 -->
<template>
  <view class="ua__markdown">
    <rich-text space="nbsp" :nodes="parseNodes(source)" @itemclick="handleItemClick"></rich-text>
  </view>
</template>

<script setup>
  import { ref, computed } from 'vue'
  import MarkdownIt from './lib/markdown-it.min.js'
  import hljs from './lib/highlight/uni-highlight.min.js'
  import './lib/highlight/atom-one-dark.css'
  import parseHtml from './lib/html-parser.js'
  const props = defineProps({
    // 解析内容
    source: String,
    showLine: { type: [Boolean, String], default: true }
  })

  let copyCodeData = []
  const markdown = MarkdownIt({
    html: true,
    highlight: function (str, lang) {
      let preCode = ''
      try {
        preCode = hljs.highlightAuto(str).value
      } catch (err) {
        preCode = markdown.utils.escapeHtml(str)
      }
      const lines = preCode.split(/\n/).slice(0, -1)
      // 添加自定义行号
      let html = lines
        .map((item, index) => {
          if (item == '') {
            return ''
          }
          return (
            '<li><span class="line-num" data-line="' + (index + 1) + '"></span>' + item + '</li>'
          )
        })
        .join('')
      if (props.showLine) {
        html = '<ol style="padding: 0px 30px;">' + html + '</ol>'
      } else {
        html = '<ol style="padding: 0px 7px;list-style:none;">' + html + '</ol>'
      }
      copyCodeData.push(str)
      let htmlCode = `<div class="markdown-wrap">`
      // #ifndef MP-WEIXIN
      htmlCode += `<div style="color: #aaa;text-align: right;font-size: 12px;padding:8px;">`
      htmlCode += `${lang}<a class="copy-btn" code-data-index="${
        copyCodeData.length - 1
      }" style="margin-left: 8px;">复制代码</a>`
      htmlCode += `</div>`
      // #endif
      htmlCode += `<pre class="hljs" style="padding:10px 8px 0;margin-bottom:5px;overflow: auto;display: block;border-radius: 5px;"><code>${html}</code></pre>`
      htmlCode += '</div>'
      return htmlCode
    }
  })
  const parseNodes = (value) => {
    if (!value) return
    // 解析<br />到\n
    value = value.replace(/<br>|<br\/>|<br \/>/g, '\n')
    value = value.replace(/&nbsp;/g, ' ')
    let htmlString = ''
    if (value.split('```').length % 2) {
      let mdtext = value
      if (mdtext[mdtext.length - 1] != '\n') {
        mdtext += '\n'
      }
      htmlString = markdown.render(mdtext)
    } else {
      htmlString = markdown.render(value)
    }

    // 调整 h1 - h6 的标签
    htmlString = htmlString.replace(/<h1/g, `<h1 class="h1"`)
    htmlString = htmlString.replace(/<h2/g, `<h2 class="h2"`)
    htmlString = htmlString.replace(/<h3/g, `<h3 class="h3"`)
    htmlString = htmlString.replace(/<h4/g, `<h4 class="h4"`)
    htmlString = htmlString.replace(/<h5/g, `<h5 class="h5"`)
    htmlString = htmlString.replace(/<h6/g, `<h6 class="h6"`)

    // 调整文本块标签
    htmlString = htmlString.replace(/<a>/g, `<a class="a">`)
    htmlString = htmlString.replace(/<p>/g, `<p class="p">`)
    htmlString = htmlString.replace(/<strong>/g, `<strong class="strong">`)
    htmlString = htmlString.replace(/<blockquote>/g, `<blockquote class="blockquote">`)
    htmlString = htmlString.replace(/<details>/g, `<details class="details">`)
    htmlString = htmlString.replace(/<pre>/g, `<pre class="pre">`)

    // 调整列表标签
    htmlString = htmlString.replace(/<dl>/g, `<dl class="dl">`)
    htmlString = htmlString.replace(/<ol>/g, `<ol class="ol">`)
    htmlString = htmlString.replace(/<ul>/g, `<ul class="ul">`)

    // 调整图片
    htmlString = htmlString.replace(/<img/g, `<img class="img"`)

    // 解决小程序表格边框型失效问题
    htmlString = htmlString.replace(/<table/g, `<table class="table"`)
    htmlString = htmlString.replace(/<tr/g, `<tr class="tr"`)
    htmlString = htmlString.replace(/<th>/g, `<th class="th">`)
    htmlString = htmlString.replace(/<td/g, `<td class="td"`)
    htmlString = htmlString.replace(/<hr>|<hr\/>|<hr \/>/g, `<hr class="hr">`)

    // #ifndef APP-NVUE
    return htmlString
    // #endif

    // 将htmlString转成htmlArray，反之使用rich-text解析
    // #ifdef APP-NVUE
    return parseHtml(htmlString)
    // #endif
  }

  // 复制代码
  const handleItemClick = (e) => {
    let { attrs } = e.detail.node
    let { 'code-data-index': codeDataIndex, class: className } = attrs
    if (className == 'copy-btn') {
      uni.setClipboardData({
        data: copyCodeData[codeDataIndex],
        showToast: false,
        success() {
          uni.showToast({
            title: '复制成功',
            icon: 'none'
          })
        }
      })
    }
  }
</script>

<style lang="less">
  @import '@/styles/layout.less';
  @import '@/styles/theme.less';
  @text-color: #916c0f;
  .ua__markdown {
    font-size: 14px;
    line-height: 1.5;
    word-break: break-all;
    .h1,
    .h2,
    .h3 {
      position: relative;
      display: flex;
      margin-bottom: 10px;
      padding-bottom: 5px;
      padding-left: 25px;
      border-radius: 2px;
      letter-spacing: 1px;
      color: @text-color;
      text-shadow: 1px 1px 1px #af8d35;
      &:before {
        content: '';
        display: flex;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-60%);
        margin: auto;
        width: 20px;
        height: 20px;
        background-size: 20px 20px;
        background-image: url('@/assets/articles/article-mark.png');
      }
    }
    .h4,
    .h5,
    .h6 {
      position: relative;
      display: flex;
      margin: 8px 0;
      border-radius: 2px;
      letter-spacing: 1px;
      color: @text-color;
    }
    .h1 {
      font-size: 20px;
      border-bottom: 5px solid @text-color;
    }
    .h2 {
      font-size: 18px;
      border-bottom: 3px solid @text-color;
    }
    .h3 {
      font-size: 16px;
      border-bottom: 1px solid @text-color;
    }
    .h4 {
      font-size: 14px;
    }
    .h5 {
      font-size: 12px;
    }
    .h6 {
      font-size: 12px;
    }

    // 列表
    .blockquote,
    .details,
    .dl,
    .ol,
    .p,
    .pre,
    .table,
    .ul {
      margin-bottom: 4px;
    }
    .blockquote {
      position: relative;
      box-sizing: inherit;
      border-left: none;
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ffd87a;
      line-height: 25px;
      font-weight: 400;
      border-radius: 10px;
      font-style: normal;
      text-align: left;
      text-size-adjust: 100%;
      background-color: rgba(189, 134, 0, 0.5);
      &:before,
      &:after {
        position: absolute;
        font-size: 34px;
        font-weight: 700;
        color: #cc9100;
      }
      &:before {
        content: '❝';
        top: 8px;
        left: 5px;
      }
      &:after {
        content: '❞';
        right: 5px;
        bottom: -5px;
      }
    }
    .strong {
      color: #c28a00;
      font-weight: bolder;
      &:before {
        content: '「';
      }
      &:after {
        content: '」';
      }
    }
    .p {
      text-indent: 2em;
    }
    .ol {
      list-style: decimal;
    }

    .ul {
      list-style: disc;
    }

    .ol,
    .ul {
      padding-left: 2em;
    }

    .img {
      margin: 0;
      width: 100%;
    }

    .a {
      background-color: transparent;
      color: #2196f3;
      text-decoration: none;
    }
    hr,
    ::v-deep .hr {
      margin-top: 20px;
      margin-bottom: 20px;
      border: 0;
      border-top: 1px solid #e5e5e5;
    }

    .code-block-header__copy {
      font-size: 16px;
      margin-left: 5px;
    }

    .footnotes {
      -moz-column-count: 2;
      -webkit-column-count: 2;
      column-count: 2;
    }
    .footnotes-list {
      padding-left: 2em;
    }
    table,
    ::v-deep .table {
      border-spacing: 0;
      border-collapse: collapse;
      width: 100%;
      max-width: 65em;
      overflow: auto;
      margin-top: 0;
      margin-bottom: 16px;
    }
    table tr,
    ::v-deep .table .tr {
      border-top: 1px solid #e5e5e5;
    }
    table th,
    table td,
    ::v-deep .table .th,
    ::v-deep .table .td {
      padding: 6px 13px;
      border: 1px solid #e5e5e5;
    }
    table th,
    ::v-deep .table .th {
      font-weight: 600;
      background-color: #eee;
    }
    .hljs[class*='language-']:before {
      position: absolute;
      z-index: 3;
      top: 0.8em;
      right: 1em;
      font-size: 0.8em;
      color: #999;
    }
    .hljs[class~='language-js']:before {
      content: 'js';
    }
    .hljs[class~='language-ts']:before {
      content: 'ts';
    }
    .hljs[class~='language-html']:before {
      content: 'html';
    }
    .hljs[class~='language-md']:before {
      content: 'md';
    }
    .hljs[class~='language-vue']:before {
      content: 'vue';
    }
    .hljs[class~='language-css']:before {
      content: 'css';
    }
    .hljs[class~='language-sass']:before {
      content: 'sass';
    }
    .hljs[class~='language-scss']:before {
      content: 'scss';
    }
    .hljs[class~='language-less']:before {
      content: 'less';
    }
    .hljs[class~='language-stylus']:before {
      content: 'stylus';
    }
    .hljs[class~='language-go']:before {
      content: 'go';
    }
    .hljs[class~='language-java']:before {
      content: 'java';
    }
    .hljs[class~='language-c']:before {
      content: 'c';
    }
    .hljs[class~='language-sh']:before {
      content: 'sh';
    }
    .hljs[class~='language-yaml']:before {
      content: 'yaml';
    }
    .hljs[class~='language-py']:before {
      content: 'py';
    }
    .hljs[class~='language-docker']:before {
      content: 'docker';
    }
    .hljs[class~='language-dockerfile']:before {
      content: 'dockerfile';
    }
    .hljs[class~='language-makefile']:before {
      content: 'makefile';
    }
    .hljs[class~='language-javascript']:before {
      content: 'js';
    }
    .hljs[class~='language-typescript']:before {
      content: 'ts';
    }
    .hljs[class~='language-markup']:before {
      content: 'html';
    }
    .hljs[class~='language-markdown']:before {
      content: 'md';
    }
    .hljs[class~='language-json']:before {
      content: 'json';
    }
    .hljs[class~='language-ruby']:before {
      content: 'rb';
    }
    .hljs[class~='language-python']:before {
      content: 'py';
    }
    .hljs[class~='language-bash']:before {
      content: 'sh';
    }
    .hljs[class~='language-php']:before {
      content: 'php';
    }
  }
</style>

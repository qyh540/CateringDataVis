<template>
<!--4. 左下模块，词云图模块-->
  <div id="word_cloud_view">
    <img src="/wordcloud" id="wc_img" />
    <div @click="mealsOnly">菜品相关</div>
  </div>
</template>

<script>
export default {
  name: "WordCloudView",
  methods: {
    mealsOnly() {
      // 在这里实现“菜品相关”按钮的逻辑
    },
  },
};
</script>

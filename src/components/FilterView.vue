<template>
<!--2. 左中模块，实现商家条件过滤的模块-->

  <el-card class="box-card2">
    <div class="slider-select-block">
      <el-row>
        <el-text tag="b">评分</el-text>
        <el-slider v-model="formData.score_value" range show-stops :min="1" :max="5" step="0.5" />
      </el-row>
      <el-row>
        <el-text tag="b">价格</el-text>
        <el-slider v-model="formData.price_value" range show-stops :min="5" :max="100" />
      </el-row>
      <el-row>
        <el-text tag="b">营业时间</el-text>
        <el-slider v-model="formData.time_value" range show-stops :min="1" :max="24" />
      </el-row>
      <el-row>
        <el-text tag="b">评论数量</el-text>
        <el-slider v-model="formData.comment_value" range show-stops :min="1" :max="100" />
      </el-row>
    </div>
    <div style="margin-top: 5px">
      <el-text tag="b">类别</el-text>
      <el-radio-group v-model="formData.food_value" style="margin-top: 10px">
        <el-radio-button label="火锅" />
        <el-radio-button label="烧烤" />
        <el-radio-button label="酒店" />
        <el-radio-button label="蛋糕" />
        <el-radio-button label="川菜" />
        <el-radio-button label="面类" />
        <el-radio-button label="粉类" />
        <el-radio-button label="鱼类" />
        <el-radio-button label="干锅" />
        <el-radio-button label="烤肉" />
        <el-radio-button label="自助" />
      </el-radio-group>
    </div>
    <div style="margin-top: 25px" class="card-content">
      <el-button class="right-aligned-button" @click="submitFormData">提交筛选</el-button>
    </div>
  </el-card>

</template>

<script>
import axios from "axios";

export default {
  name: "FilterView",
  data() {
    return {
      formData: {
        score_value: [1, 5],
        price_value: [5,100],
        time_value: [1, 24],
        comment_value: [50, 100],
        food_value: ""
      },
      //筛选出来的很多shops，此数组中的每一条数组代表一个shop的详细信息，[458967, 'shop1', 4.8, [107.123,146.589]],对应该商店的id，名称，评分、经纬度
      shopsDataFromBack: []
    };
  },
  methods: {
    submitFormData(){
      axios.get('/query?type=all_shops&sff=' + this.formData.score_value[0] + '&sft=' +
          this.formData.score_value[1] + '&pff=' + this.formData.price_value[0] + '&pft=' +
          this.formData.price_value[1] + '&cf=' + this.formData.time_value[0] + '&ct=' +
          this.formData.time_value[1] + '&tr=' + this.formData.comment_value[0] + '&kw=' +
          this.formData.food_value + '&uid=' + "")
          .then(response =>{
            console.log(response.data);
            this.shopsDataFromBack = response.data;
            //实习后端返回筛选后的shops后，在地图中就标点
            this.$emit('updateMap', this.shopsDataFromBack)
          });
    }
  },
};
</script>

<style>
.box-card2{
  width: 300px;
  margin-top: 15px;
}

.slider-select-block .el-slider {
  margin-bottom: 10px;
}

.card-content {
  display: flex;
  justify-content: flex-end; /* 右对齐 */
}

.right-aligned-button {
  margin-left: auto; /* 将按钮推到最右边 */
}
</style>
<template>
  <!--1. 左上角模块-->
<!--  <div>-->
<!--    <div id="map_view_border">-->
<!--      <div id="map_view"></div>-->
<!--    </div>-->
<!--    <div id="left_cover"></div>-->
<!--    <div id="title">绵阳餐饮数据可视化</div>-->

<!--    <div class="select" id="select_shops_analysis" @click="switchToScatter">餐馆</div>-->
<!--    <div class="select" id="select_shops_heat" @click="switchToHeat">热</div>-->
<!--    <div class="select" id="select_users_analysis" @click="switchToUser">用户</div>-->
<!--  </div>-->
  <el-card class="box-card1">
    <template #header>
      <div class="card-header">
        <span style="font-size:20px">绵阳餐饮数据可视化</span>
        <el-button round>热</el-button>
      </div>
    </template>
    <el-row :gutter="24">
      <el-col :span="12">
        <!--这里的@click="chooseView(1)"函数是为了实现，子组件点击用户，父组件中可以监听到此操作，从而在父组件中实现切换视图的操作-->
        <el-button size="large" @click="chooseView(1)">餐馆</el-button>
      </el-col>
      <el-col :span="12">
        <el-button size="large" @click="chooseView(0)">用户</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "map_view_left",
  data(){
    return{
      // flag: 1,
    }
  },
  methods: {
    chooseView(flag){
      this.$emit('custom-event', flag);
    }
  }
};

</script>

<style>
  .box-card1{
    margin-top: 20px;
    width: 300px;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
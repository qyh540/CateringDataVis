<script setup>
import {Delete} from '@element-plus/icons-vue';
</script>
<template>
  <div class="right-side-card-user-container">
    <el-card class="right-side-user-card">
<!--      userDetailtest + {{userid}}-->
      <div style="margin-bottom: 5px">
        <span style="font-size: medium">UID: {{userid}}</span>
        <span style="font-size: small" >&nbsp&nbsp位于cluster{{this.Cid}} &nbsp共{{this.Comments.length}}条评论</span>
      </div>
<!--      <br/>-->
<!--      echarts可视化区域-->
      <div>
        <el-text tag="b">该用户消费价格区间分布</el-text>
        <div class="echart" id="pricechart" :style="ChartStyle"></div>
      </div>
      <div>
        <el-text tag="b">该用户消费时间区间分布</el-text>
        <div class="echart" id="timechart" :style="ChartStyle"></div>
      </div>
      <el-text tag="b">该用户评论展示</el-text>
<!--      评论展示区域，使用无限滚动实现-->
      <el-card class="card-user-detail" :body-style="{ padding: '5px' }" style="margin: 5px;">
        <el-scrollbar height="100px" style="padding: 0">
          <!--        test1-->
          <p v-for="comment in this.Comments" class="scrollbar-demo-item">{{ comment[0] }}</p>
        </el-scrollbar>
      </el-card>
<!--加一个关闭按钮，点击后关闭此页面-->
      <div class="card-footer">
        <el-button type="danger" :icon="Delete"  @click="closeCard" circle></el-button>
<!--        <el-button @click="closeCard" type="text">关闭</el-button>-->
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from "echarts";
// import Delete from '@element-plus/icons-vue'

export default {
  mounted() {
    // 在组件挂载到页面后执行的函数
    this.getUserData();
  },
  data() {
    return {
      // 选中用户的 所属簇、评论、画图的价格分布、画图用的时间分布
      Cid: 0,
      Comments: [], //里面是一条条列表，["","",""]
      Price_dist: [],
      Time_dist: [],
      ChartStyle: { float: "left", width: "100%", height: "220px"} //图表样式
    };
  },
  methods: {
    async getUserData(){
      axios.get('/query?type=user_detail&uid=' + this.userid)
          .then(response =>{
            console.log(response.data);
            // this.user_id_show = response.data;
            this.Cid = response.data.cid;
            this.Comments = response.data.comments;
            this.Price_dist = response.data.price_dist;
            this.Time_dist = response.data.time_dist;
            // 现在问题是，点击另一个用户后，重新执行了getUserData，但是echarts不更新？？
            this.initPriceEchart();
            this.initTimeEchart();
          });

    },
    initPriceEchart(){
      // alert(this.Price_dist);
      const xData = ["0-15","15-30", "30-45", "45-60", "60+"];
      // 基本柱状图
      const option = {
        xAxis: {
          data: xData
        },
        yAxis: {},
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.Price_dist,
            // 设置柱子的颜色为蓝色
            itemStyle: {
              color: '#409eff'
            }
          }
        ],
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          containLabel: true // 防止标签溢出
        },
      };
      const pricechart = echarts.init(document.getElementById("pricechart"));
      pricechart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        pricechart.resize();
      });
    },
    initTimeEchart(){
      // alert(this.Time_dist);
      const xData = ["0-2","2-4", "4-6", "6-8", "8-10","10-12","12-14","14-18","18-20","20-22","22-24"];
      // 基本柱状图
      const option = {
        xAxis: {
          data: xData
        },
        yAxis: {},
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.Time_dist,
            itemStyle: {
              color: '#409eff'
            }
          }
        ],
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '5%',
          containLabel: true // 防止标签溢出
        },
      };
      const timechart = echarts.init(document.getElementById("timechart"));
      timechart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        timechart.resize();
      });
    },
    closeCard(){
      this.$emit('close-usercard');
    }
  },
  props:{
    // 实现从父组件app.vue中取到选择的用户id，而父组件中的userid是UserFilterView中传过去的，由此实现了兄弟组件之间的传值！！！ClusterDetail组件同理
    userid: Number,
  },
  watch:{
    userid(newValue, oldValue){
      this.getUserData();
    }
  },
};
</script>

<style scoped>
.right-side-card-user-container {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 350px; /* 设置卡片的宽度 */
  display: flex;
  align-items: center;
}
.right-side-user-card{
  width: 335px;
}
.scrollbar-demo-item{
  display: flex;
  align-items: center;
  justify-content: center;
  /*height: 50px;*/
  /*margin: 10px;*/
  text-align: center;
  /*border-radius: 4px;*/
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  font-size: 14px; /* 调整字体大小 */
  line-height: 1.2; /* 调整行高 */
}
.card-user-detail{
  margin-top: 5px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 设置阴影，可以根据需要调整参数 */
  padding: 0px; /* 调整内边距 */
  margin: 0; /* 去除外边距 */
}
.card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
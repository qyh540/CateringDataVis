<script setup xmlns="http://www.w3.org/1999/html">
import {Delete} from '@element-plus/icons-vue';
</script>
<template>
  <div class="right-side-card-cluster-container">
    <el-card class="right-side-card">
       <div style="margin-bottom: 5px">
         <span style="font-size: medium">Cluster: {{clusterid}}</span>
       </div>
      <!--      <br/>-->
      <!--      echarts可视化区域-->
      <div>
        <el-text tag="b">该簇消费价格区间分布</el-text>
        <div class="echart" id="pricechart" :style="ChartStyle"></div>
      </div>
      <div>
        <el-text tag="b">该簇消费时间区间分布</el-text>
        <div class="echart" id="timechart" :style="ChartStyle"></div>
      </div>
      <el-text>&nbsp</el-text>
      <!--加一个关闭按钮，点击后关闭此页面-->
      <div class="cluster-card-cluster-footer">
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
    this.getClusterData();
  },
  data() {
    return {
      // 选中用户的 所属簇、评论、画图的价格分布、画图用的时间分布
      Cid: 0,
      Comments: [], //里面是一条条列表，["","",""]
      Price_dist: [],
      Time_dist: [],
      ChartStyle: {float: "left", width: "100%", height: "220px"} //图表样式
    };
  },

  methods: {
    async getClusterData() {
      axios.get('/query?type=user_detail&uid=typical_' + this.clusterid)
          .then(response => {
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
    initPriceEchart() {
      // alert(this.Price_dist);
      const xData = ["0-15", "15-30", "30-45", "45-60", "60+"];
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
    initTimeEchart() {
      // alert(this.Time_dist);
      const xData = ["0-2", "2-4", "4-6", "6-8", "8-10", "10-12", "12-14", "14-18", "18-20", "20-22", "22-24"];
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
    closeCard() {
      this.$emit('close-clustercard');
    }
  },
  watch: {
    userid(newValue, oldValue) {
      this.getClusterData();
    }
  },
  props: {
    // 声明一个clusterid，从父组件取回已经选择的簇id，从而在clusterdetail卡片中显示
    clusterid: Number
  },
};
</script>

<style>
.right-side-card-cluster-container {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 350px; /* 设置卡片的宽度 */
  display: flex;
  align-items: center;
}
.right-side-card{
  width: 335px;
}
.cluster-card-cluster-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
</style>
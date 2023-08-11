<!--<script setup>-->
<!--  import {Delete} from '@element-plus/icons-vue';-->
<!--</script>-->
<template>
    <div class="right-side-card-shop-container">
      <el-card class="right-side-shop-card">
        <div style="margin-bottom: 5px">
          <span style="font-size: 20px">{{this.name}}</span>
<!--          <span style="font-size: small; float: right;" >sid: {{this.shopId}}</span>-->
        </div>
        <el-row>
          <el-col :span="14">
            <el-rate
                v-model="avgScore"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}分"
            />
          </el-col>
          <el-col :span="10" class="align-right">
            <el-text>均价{{this.avgPrice}}元</el-text>
          </el-col>
        </el-row>
        <el-card :body-style="{ padding: '5px' }" style="margin-bottom: 5px;margin-top: 8px">
        <span style="font-size: medium" class="text-in-card">地址：</span>
        <span style="font-size: small" class="text-in-card">{{ this.address }}</span>
        </el-card>
        <el-card :body-style="{ padding: '5px' }" style="margin-bottom: 13px">
          <span style="font-size: medium" class="text-in-card">电话：</span>
          <span style="font-size: small" class="text-in-card">{{ this.phone }}</span>
        </el-card>
        <!--      echarts可视化区域-->
        <div >
          <el-text tag="b" >商店评分分布</el-text>
          <div class="echarts-container"></div>
        </div>
        <el-text tag="b">商店评论展示 </el-text>
        <el-text style="font-size: 10px"> &nbsp共{{this.comments.length}}条评论 </el-text>
        <!--      评论展示区域，使用无限滚动实现-->
        <el-card class="card-shop-detail" :body-style="{ padding: '5px' }" style="margin-top: 10px">
          <el-scrollbar height="200px" style="padding: 0">
            <!--        test1-->
            <p v-for="comm in this.comments" class="scrollbar-demo-item">{{ comm[0] }}</p>
          </el-scrollbar>
        </el-card>
        <!--加一个关闭按钮，点击后关闭此页面-->
        <div class="card-footer">
          <el-button type="danger"  @click="closeShopCard" circle>
            <el-icon><Delete/></el-icon>
          </el-button>
          <!--        <el-button @click="closeCard" type="text">关闭</el-button>-->
        </div>
      </el-card>
    </div>
</template>

<script>
import axios from "axios";
import * as echarts from 'echarts';
import {Delete} from '@element-plus/icons-vue';
export default {
  name: "ShopDetail",
  components:{
    Delete
  },
  data() {
    return {
      //根据shopid查到的shop数据，用来可视化在card上
      shopId: 0,
      address: "",
      avgPrice: 0,
      avgScore: 0,
      comments: [],
      name: "",
      phone: 0,
      starts_pie: [],
    };
  },
  mounted() {
    // this.getShopData();
  },
  methods:{
    // x渲染饼状图
    getShopData(shop_id){
      axios.get("/query?type=shop_detail&poiid=" + shop_id)
          .then(response =>{
            console.log(response.data);
            this.shopId = shop_id;
            this.address = response.data.address;
            this.avgPrice = response.data.avgPrice;
            this.avgScore = response.data.avgScore;
            this.comments = response.data.comments;
            this.name = response.data.name;
            this.phone = response.data.phone;
            this.starts_pie = response.data.stars;

            // 拿到数据后调用可视化的初始化函数，将数据渲染成可视化图表
            this.initPie();
          });
    },
    initPie(){
      // 初始化图表实例
      const chartContainer = document.querySelector('.echarts-container');
      const chart = echarts.init(chartContainer);

      // 设置图表选项
      const options = {
        title: {
          // text: '饼状图示例'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          top: '2%',
          left: 'center',
          itemWidth: 12, // 设置示例块的宽度
          itemHeight: 10, // 设置示例块的高度
        },
        grid: {
          top: 5, // 设置上边距，减少饼状图上方的留白
          bottom: 0 // 设置下边距，减少饼状图下方的留白
        },
        series: [
          {
            name: '数据',
            type: 'pie',
            radius: ['40%', '60%'], // 内外半径，形成环状图
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: this.starts_pie[0], name: '1星' },
              { value: this.starts_pie[1], name: '2星' },
              { value: this.starts_pie[2], name: '3星' },
              { value: this.starts_pie[3], name: '4星' },
              { value: this.starts_pie[4], name: '5星' }
            ],
          }
        ]
      };

      // 使用设置好的选项绘制图表
      chart.setOption(options);
    },
    closeShopCard(){
      this.$emit('close-shopcard');
    }
    },
}
</script>

<style scoped>
.right-side-card-shop-container {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 350px; /* 设置卡片的宽度 */
  display: flex;
  align-items: center;
}
.right-side-shop-card{
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
.card-shop-detail{
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
.align-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.text-in-card{
  line-height: 1.2; /* 调整行高 */
  margin: 0; /* 去除外边距 */
}
.echarts-container {
  width: 100%; /* 设置容器宽度 */
  height: 200px; /* 设置容器高度 */
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
.card-shop-detail{
  height: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 设置阴影，可以根据需要调整参数 */
  padding: 0px; /* 调整内边距 */
  margin: 0; /* 去除外边距 */
}
</style>
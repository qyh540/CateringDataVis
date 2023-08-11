<template>
<!--全屏显示地图的组件-->
  <div class="map-container">
<!--    <div id="map" style="width: 100%; height: 100%;"></div>-->
    <div class="bmap" id="bmap" ref="bmap" style="width: 100%;height: 100%;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
// import 'echarts/map/js/world' // 引入中国地图文件
import 'echarts/extension/bmap/bmap'
export default {
  name: "GeoFullScreen",
  mounted() {
    this.initMap([])
  },
  methods: {
    initMap(shopsDataToGeo) {

      console.log(shopsDataToGeo);
      // alert(shopsDataToGeo);
      const chart = echarts.init(document.getElementById('bmap'))

      const option = {
        bmap: {
          center: [104.770248, 31.476403], // 百度地图的中心点坐标
          zoom: 11, // 初始缩放级别
          roam: true, // 开启鼠标缩放和平移
          mapStyle: {
            // 自定义地图样式
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#e6f3ff' // 设置水体颜色为蓝色
                }
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#e6f3ff' // 设置陆地颜色为蓝色
                }
              },
              {
                featureType: 'boundary',
                elementType: 'geometry',
                stylers: {
                  color: '#3966b0', // 设置边界线颜色为蓝色
                  weight: 0.5, //界线粗细
                }
              },
              {
                featureType: 'highway',
                elementType: 'geometry',
                stylers: {
                  color: '#2793ff' // 高速公路颜色为#2793ff
                }
              },
              // 添加更多自定义样式配置
            ]
          },
        },
        tooltip: {
          trigger: 'item', // 触发类型设置为 'item'
          formatter: function (params) {
            if (params.componentType === 'series') {
              return params.data.name; // 返回标记点的名称作为提示内容
            }
            return ''; // 其他情况下返回空字符串，避免显示无关信息
          }
        },
        series: [
          {
            type: 'scatter', // 可以根据需要选择其他类型
            coordinateSystem: 'bmap', // 使用百度地图坐标系
            // data: [
            //   { name: '商店1', value: [104.770248,31.476403] },
            //   { name: '商店2', value: [104.743917,31.776154] },
            //   // 添加更多商店的经纬度数据
            // ],
            data: shopsDataToGeo,
            symbolSize: 12,
            label: {
              normal: {
                show: false,
                formatter: '{b}',
                position: 'right'
              }
            }
          }
        ]
      }
      chart.setOption(option);
      // 点击标点事件
      chart.on("click", (params) => {
        if (params.seriesType === "scatter") {
          const pointId = params.data.shop_id;
          this.handlePointClick(pointId);
        }
      });

    },
    // 用来处理点击地图中标点后，执行此函数，用来显示商店可视化信息，需要新建一个子组件shopdetail，用此函数使用emit，在app.vue中控制此组件是否展示
    handlePointClick(pointId){
      // alert("点击了标点：" + pointId);
      // 在这里实现进一步的操作，例如弹出信息框、显示详情等
      this.$emit('showShopDetail',pointId);
    },
  }
};
</script>

<style scoped>
  .map-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*position: relative;*/
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
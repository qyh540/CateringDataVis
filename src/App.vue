<script setup>

import FilterView from "./components/FilterView.vue";
import UserFilterView from "./components/UserFilterView.vue";
import ShopDetail from "./components/ShopDetail.vue";
import Map_view_left from "./components/map_view_left.vue";
import ClusterDetail from "./components/ClusterDetail.vue";
import UserDetail from "./components/UserDetail.vue";
import GeoFullScreen from "./components/GeoFullScreen.vue";
</script>

<template>
  <div class="left-card">
    <Map_view_left @custom-event="handleCustomEvent"></Map_view_left>
    <FilterView v-if="shopShow" class="overlay-commp" @updateMap="updateMap"></FilterView>
    <UserFilterView v-if="userShow" @cluster-event="handleClusterEvent" @user-event="handleUserEvent"></UserFilterView>
  </div>
  <div class="right-card">
    <ClusterDetail v-if="clusterDetailShow" :clusterid="clusterid_selected" @close-clustercard="handleCloseClusterCard"></ClusterDetail>
    <UserDetail v-if="userDetailShow" :userid="userid_selected" @close-usercard="handleCloseUserCard"></UserDetail>
    <ShopDetail v-if="shopDetailShow" ref="shopDetailCard" @close-shopcard="handleCloseShopCard"></ShopDetail>
  </div>
  <div class="map-fullscreen">
    <GeoFullScreen ref="geoFullScreen" @showShopDetail="handleShowShopDetail"></GeoFullScreen>
  </div>


</template>

<script>
export default {
  data(){
    return{
      shopShow: true,
      userShow: false,
      clusterDetailShow: false,
      userDetailShow: false,
      shopDetailShow: false,
      clusterid_selected: 0,
      userid_selected: 100,
    }
  },
  methods: {
    handleCustomEvent(flag){
      if(flag==1){
        this.shopShow=true;
        this.userShow=false;
      }else {
        this.shopShow=false;
        this.userShow=true;
      }
    },
    handleClusterEvent(clusterid){
      // 点击typical按钮后显示clusterDetailCard，在此card中做一个关闭按钮用来隐藏此card
      this.clusterDetailShow=true;
      this.userDetailShow=false;
      this.shopDetailShow = false;
      this.clusterid_selected = clusterid;
    },
    handleUserEvent(userid){
      this.userDetailShow = true;
      this.clusterDetailShow = false;
      this.shopDetailShow = false;
      this.userid_selected=userid;
    },
    handleCloseUserCard(){
      this.userDetailShow = false;
    },
    handleCloseClusterCard(){
      this.clusterDetailShow = false;
    },
    handleCloseShopCard(){
      this.shopDetailShow = false;
    },
    updateMap(shopsDataFromBack){
      let shopsDataToGeo = shopsDataFromBack.map(item =>{
        return {name: item.shop_name, value: item.shop_loc, shop_id: item.shop_id};
      })
      // console.log(shopsDataToGeo);
      // alert(shopsDataToGeo);
      this.$refs.geoFullScreen.initMap(shopsDataToGeo);
    },
    // 当在geo组件中点击地图中标点，就会执行此函数
    // 此函数需要实现：1.使得shopdeetail组件显示处理。2.调用用shopdetail中的函数，传shopid过去查询渲染可视化结果
    handleShowShopDetail(shopId){
      this.shopDetailShow = true;
      this.userDetailShow = false;
      this.clusterDetailShow = false;
      // 调用shopdetail中函数，使其根据shopid查到shop数据，再渲染可视化图表
      // alert("app.vue" + shopId)
      if(this.$refs.shopDetailCard){
        // alert("此时shopdetail已确保被渲染")
        this.$refs.shopDetailCard.getShopData(shopId);
      }
      // this.$refs.shopDetailCard.getShopData(shopId);
    }
  }
};


</script>
<style scoped>
  .map-fullscreen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /*z-index: 1;*/
  }
  .left-card{
    position: absolute;
    z-index: 100;
  }
  .right-card{
    position: absolute;
    z-index: 100;
  }
</style>

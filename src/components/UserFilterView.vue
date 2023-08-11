<template>
<!--3. 左中，切换到用户视角，选择用户簇-->
  <el-card class="box-card3">
    <span style="margin-bottom: 10px">Clusters</span>
    <el-card class="card-cluster">
      <el-radio-group v-model="user_cluster" size="small" @change="ClusterChange">
        <el-radio-button v-for="n in 16" :label="n-1" class="custom-radio">{{n}}</el-radio-button>
      </el-radio-group>
    </el-card>

    <el-row style="margin-bottom: 5px">
      <el-col :span="19">
        <span>用户</span>
      </el-col>
      <el-col :span="5">
        <el-button size="small" @click="typicalFunc">typical</el-button>
      </el-col>
    </el-row>

    <el-card class="card-cluster">
      <!--这里下拉选择组件选中一个用户id，存在userid_selected中，后续实现点击该用户显示其相关信息功能时将会用到，到时候再取-->
      <el-select v-model="userid_selected" clearable placeholder="Select" @change="userFunc">
        <el-option
            v-for="userid in user_id_show"
            :key="userid"
            :label="userid"
            :value="userid"
        />
      </el-select>
    </el-card>

  </el-card>
</template>

<script>
import axios from 'axios'
export default {
  name: "UserFilterView",
  data() {
    return {
      // clusterCount: 16,
      user_cluster: 0,
      // 选择对应cluster后，后端返回该簇中的用户id，存在此数组中，在前端显示
      user_id_show: [],
      userid_selected: 0,
    };
  },
  methods: {
    ClusterChange(){
      // window.alert(this.user_cluster)
      axios.get('/query?type=clusters&cid=' + this.user_cluster)
          .then(response =>{
            console.log(response.data);
            this.user_id_show = response.data;
          })
    },
    // 选择一个cluster后，右侧弹出窗口显示此cluster中的可视化情况
    typicalFunc(){
      // 调用子组件中的方法来切换卡片的显示状态
      // this.$refs.slideInOut.toggleCard();
      this.$emit('cluster-event', this.user_cluster);
    },
    userFunc(){
      this.$emit('user-event', this.userid_selected);
    }

  },
};
</script>

<style>
  .box-card3{
    width: 300px;
    margin-top: 20px;
  }
  .custom-radio{
    border-radius: 50%; /* 设置圆形边框 */
    padding: 5px; /* 调整内边距，使圆形更显著 */
  }
  .card-cluster{
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); /* 设置阴影，可以根据需要调整参数 */
    margin-bottom: 10px;
  }
</style>
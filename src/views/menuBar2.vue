<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#2d2f33"
      text-color="#ccc"
      :default-active="activeIndex2"
      @select="handleSelect"
      active-text-color="#409EFF">
    <el-menu-item class="menuItemCla" index="1" @click="goToIndex">首页</el-menu-item>
    <el-submenu class="menuItemCla" index="2" style="color: white">
      <template slot="title">学术资源</template>
      <el-menu-item index="2-1" @click="goToPaper">学位论文</el-menu-item>
      <el-menu-item index="2-2" @click="goToJournal">专业期刊</el-menu-item>
      <el-menu-item index="2-3" @click="goToLecture">讲座信息</el-menu-item>
    </el-submenu>
    <el-menu-item class="menuItemCla" index="3" @click="goToSpaceData">空间数据</el-menu-item>
    <el-menu-item class="menuItemCla" index="4" @click="goToWebTool">常用工具</el-menu-item>
    <el-menu-item class="menuItemCla" index="5" @click="goToMapMarket">地图集市</el-menu-item>
    <el-menu-item class="menuItemCla" index="6" @click="goToOnlineAnalysis">在线分析</el-menu-item>
    <el-submenu class="menuItemCla" index="7" style="color: white">
      <template slot="title">教学案例</template>
      <el-menu-item class="menuItemCla" index="7-1" @click="goToMarket">案例仓库</el-menu-item>
      <el-menu-item class="menuItemCla" index="7-2" @click="goToMarkdown">标记语言</el-menu-item>
      <el-menu-item class="menuItemCla" index="7-3" @click="goToCodeOnline">在线编译</el-menu-item>
      <el-menu-item class="menuItemCla" index="7-4" @click="goToJupyter">交互式笔记本</el-menu-item>
    </el-submenu>
    <el-menu-item class="menuItemCla" index="8" @click="goToPlatform">分析平台</el-menu-item>
    <el-menu-item class="menuItemCla" index="9" @click="goToTeamInfo">关于</el-menu-item>
  </el-menu>
</template>

<script>
export default {
name: "menuBar2",
  data() {
    return {
      activeIndex2: '1'
    };
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    goToIndex(){
      this.$router.push('/index')
    },
    goToPaper(){
      this.$router.push('/academia/paper')
    },
    goToJournal(){
      this.$router.push('/academia/journal')
    },
    goToLecture(){
      this.$router.push('/academia/lecture')
    },

    goToSpaceData(){
      this.$router.push('/spaceData')
    },
    goToWebTool(){
      this.$router.push('/webTool')
    },
    goToMapMarket(){
      this.$router.push('/mapMarket')
    },
    goToOnlineAnalysis(){
      this.$router.push('/onlineAnalysis')
    },
    goToMarket() {
      this.$router.push('/eduCase/market')
    },
    goToMarkdown(){
      this.$router.push('/eduCase/markdown')
    },
    goToCodeOnline(){
      this.$router.push('/eduCase/codeOnline')
    },
    goToJupyter(){
      this.$router.push('/eduCase/jupyter')
    },
    goToPlatform(){
      this.$router.push('/platform')
    },
    goToTeamInfo(){
      this.$router.push('/teamInfo')
    },



  }
}
</script>

<style scoped>
.el-menu-item:focus{
  outline: 0 !important;
  color: #409EFF !important;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #409EFF !important;
}

.el-submenu__title:focus, .el-submenu__title:focus{
  outline: 0 !important;
  color: #fff !important;
  background: #409EFF !important;
}



</style>

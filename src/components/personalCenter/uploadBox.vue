<template>
  <el-dialog title="上传数据" :visible.sync="dialoguploadVisible">
    <el-tabs :tab-position="tabPosition" style="height:280px;">
      <el-tab-pane label="学位论文">
        学位论文
      </el-tab-pane>
      <el-tab-pane label="专业期刊">专业期刊</el-tab-pane>
      <el-tab-pane label="讲座信息">讲座信息</el-tab-pane>
      <el-tab-pane label="空间数据">空间数据</el-tab-pane>
      <el-tab-pane label="常用工具">常用工具</el-tab-pane>
      <el-tab-pane label="教学案例">教学案例</el-tab-pane>
      <el-tab-pane label="地图底图">地图底图</el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
export default {
name: "uploadBox"
}
</script>

<style scoped>

</style>

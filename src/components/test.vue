<template>
  <el-table-column>
    <template slot-scope="scope">
      <el-button
          v-if="scope.row.Type !=='Directory'"
          :disabled="scope.row.Name.indexOf('.shp')==-1 &&scope.row.Name.indexOf('.csv')==-1 && scope.row.Name.indexOf('.')!==-1 && scope.row.Name.indexOf('.txt')==-1 || scope.row.Name.indexOf('_S')!==-1"
          title="预览"
          icon="fa fa-table"
          @click="previewFile(scope.$index,scope.row)"
          type="text">
        <!--<i class="el-icon-delete-solid"></i>-->
      </el-button>
      <el-button
          v-if="scope.row.Type !=='Directory'"
          :disabled="!(scope.row.Name.indexOf('.')===-1||scope.row.Name.indexOf('.csv')!==-1)"
          title="空间化"
          icon="fa fa-connectdevelop"
          @click="spatialFile(scope.$index,scope.row)"
          type="text">
        <!--<i class="el-icon-delete-solid"></i>-->
      </el-button>
      <!--                        <el-button-->
      <!--                                title="下载"-->
      <!--                                icon="el-icon-download"-->
      <!--                                @click="downloadFile(scope.$index,scope.row)"-->
      <!--                                type="text">-->
      <!--                        </el-button>-->
      <el-button
          title="删除"
          icon="fa fa-trash"
          @click="deleteFile(scope.$index,scope.row)"
          type="text">
        <!--<i class="el-icon-delete-solid"></i>-->
      </el-button>
      <!--<el-button-->
      <!--tit
</template>

<script>
export default {
name: "test"
previewFile(index, row) {
    let that = this;
    this.$Bus.$emit('dataDialogParams', {
        title: row.Name,
        visible: true,
        queryUrl: that.$URL.userSpaceDataUrl + that.currentPath + "/" + row.Name,
        queryParams: null
    })
}
</script>

<style scoped>

</style>
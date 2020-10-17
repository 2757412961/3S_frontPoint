<template>
  <el-main>
<!--    条件选择器-->
    <div>
    <div class="managerSearchMenu">
      <el-date-picker
          v-model="datevalue"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
      </el-date-picker>
    </div>
    <div class="managerSearchMenu">
      <el-input v-model="inputvalue" placeholder="请输入数据名称"></el-input>
    </div>
    <div class="managerSearchMenu">
      <el-select v-model="typevalue" placeholder="请选择数据类型">
        <el-option
            v-for="item in typeoptions"
            :key="item.typevalue"
            :label="item.label"
            :value="item.typevalue">
        </el-option>
      </el-select>
    </div>
    <div class="managerSearchMenu" style="float: right">
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </div>
    </div>
<!--数据记录表格-->
    <div style="padding-top: 10px">
      <el-table
          :data="tableData"
          stripe
          style="width: 100%">
        <el-table-column
            prop="checkbox"
            type="selection"
            label="选择"
            width="50"
            align="center">
        </el-table-column>
        <el-table-column
            prop="dataID"
            label="资源编号"
            width="120"
            align="center">
        </el-table-column>
        <el-table-column
            prop="dataName"
            label="资源名称"
            width="200"
            align="center">
        </el-table-column>
        <el-table-column
            prop="dataUploadDate"
            label="资源上传日期"
            width="140"
            align="center">
        </el-table-column>
        <el-table-column
            prop="allowDownload"
            label="开放下载"
            width="140"
            align="center">
        </el-table-column>
        <el-table-column
            prop="dataType"
            label="资源类型"
            width="140"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operate"
            label="操作"
            align="center">
        </el-table-column>
      </el-table>
    </div>
<!--上传按钮和批量删除按钮-->
    <div style="position:absolute;bottom: 45px">
      <el-button type="primary" icon="el-icon-upload2" circle @click="dialoguploadVisible = true"></el-button>
      <el-button type="danger" icon="el-icon-delete" circle></el-button>
      <el-button type="success" icon="el-icon-info" circle @click="dialogInfoVisible = true"></el-button>
    </div>
<!-- 页码选择器-->
    <div class="block" style="position: absolute;right: 0%;bottom: 6%">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage1"
          :page-size="12"
          layout="total, prev, pager, next"
          :total="120">
      </el-pagination>
    </div>
<!--资源详情弹窗-->
    <div style="text-align:center;">
      <el-dialog
          title="资源信息"
          :visible.sync="dialogInfoVisible"
          width="50%">
        <img src="../../assets/资源示意图.png" height="200" />
        <div><span class="dataInfo">DataInfo</span><span class="dataInfo">DataInfo</span></div>
        <div><span class="dataInfo">DataInfo</span><span class="dataInfo">DataInfo</span></div>
        <div><span class="dataInfo">DataInfo</span><span class="dataInfo">DataInfo</span></div>
      </el-dialog>
    </div>

<!--    数据上传弹窗-->
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
  </el-main>
</template>

<script>
export default {
  name: "Data",
  data() {
    return {
      dialogInfoVisible:false,
      dialoguploadVisible:false,
      typeoptions: [{
        value: '选项1',
        label: '学位论文'
      }, {
        value: '选项2',
        label: '专业期刊'
      }, {
        value: '选项3',
        label: '讲座信息'
      }, {
        value: '选项4',
        label: '空间数据'
      }, {
        value: '选项5',
        label: '常用工具'
      }, {
        value: '选项6',
        label: '地图集市'
      }, {
        value: '选项7',
        label: '教学案例'
      }],
      datevalue:'',
      typevalue:'',
      inputvalue:'',
      tabPosition:'left',
    };
  },
  tableData:[
    {},
    {}
  ],

  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }

}
</script>

<style scoped>
.managerSearchMenu{
  float: left;
  padding-left: 40px;
}
.dataInfo{
  padding-right: 20%;
}

</style>

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
        <el-select v-model="typevalue" placeholder="请选择操作类型">
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
            prop="operateID"
            label="ID"
            width="120"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operateType"
            label="操作类型"
            width="120"
            align="center">
        </el-table-column>
        <el-table-column
            prop="dataName"
            label="资源名称"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operateName"
            label="操作人ID"
            width="200"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operateDate"
            label="操作时间"
            width="200"
            align="center">
        </el-table-column>
      </el-table>
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


  </el-main>
</template>

<script>
export default {
name: "Log",
  data() {
    return {
      typeoptions: [{
        value: '选项1',
        label: '添加'
      }, {
        value: '选项2',
        label: '修改'
      }, {
        value: '选项3',
        label: '删除'
      }, ],
      datevalue: '',
      typevalue:'',
      inputvalue:'',
    };
  },
  tableData:[
    {},
    {}
  ]
}
</script>

<style scoped>
.managerSearchMenu{
  float: left;
  padding-left: 40px;
}

</style>


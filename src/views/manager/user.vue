<template>
  <el-main>
    <!--    条件选择器-->
    <div>
      <div class="managerSearchMenu" style="float: right">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="managerSearchMenu">
        <el-input v-model="inputvalue" placeholder="请输入用户名称"></el-input>
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
            prop="userName"
            label="用户名"
            width="200"
            align="center">
        </el-table-column>
        <el-table-column
            prop="userInfo"
            label="用户信息"
            align="center">
        </el-table-column>
        <el-table-column
            prop="userPrivileges"
            label="用户权限"
            width="120"
            align="center">
        </el-table-column>
        <el-table-column
            prop="operate"
            label="操作"
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
<!--    用户信息按钮-->
    <div style="position:absolute;bottom: 45px">
      <el-button type="success" icon="el-icon-info" circle @click="dialoguserVisible = true"></el-button>
    </div>
<!--    用户信息弹窗-->
    <div>
      <el-dialog
          title="用户信息"
          :visible.sync="dialoguserVisible"
          width="30%">
        <img src="../../assets/timg.jpg" height="101" width="96"/>
        <div style="float: left;padding-left: 150px">
          <p class="dataInfo">123</p>
          <p class="dataInfo">123</p>
          <p class="dataInfo">123</p>
        </div>


      </el-dialog>
    </div>


  </el-main>
</template>

<script>
export default {
  name: "managerUser",
  data() {
    return {
      dialoguserVisible:false,
      inputvalue:'',
      tableData:[
        {
          operateID: '123456',
          userName: '张三',
          userInfo: 'ASDFGHJKL',
          userPrivileges:'普通用户',
          operate:'shanchu',
        },
        {
          operateID: '123456',
          userName: '张三',
          userInfo: 'ASDFGHJKL',
          userPrivileges:'普通用户',
          operate:'shanchu',
        },
      ]
    };
  },
  methods: {
    searchAllUsers() {
      this.$axios.get(this.$URL.searchAllUsers).then(

      );
    }
  },
}
</script>

<style scoped>
.managerSearchMenu{
  float: right;
  padding-left: 40px;
}
.dataInfo{

}

</style>


<template>
  <el-main>
    <!--    条件选择器-->
    <div>
      <div class="managerSearchMenu" style="float: right">
        <el-button type="primary" icon="el-icon-search" @click="searchUsers">搜索</el-button>
      </div>
      <el-form :model="userForm">
        <div class="managerSearchMenu">
          <el-input id="userSearchCriteria" v-model="userForm.userName" placeholder="请输入用户名称"></el-input>
        </div>
      </el-form>

    </div>
    <!--数据记录表格-->
    <div style="padding-top: 10px">
      <el-table
              :data="tableData"
              stripe
              style="width: 100%">
        <el-table-column
                prop="id"
                label="ID"
                width="350"
                align="center">
        </el-table-column>
        <el-table-column
                prop="name"
                label="用户名"
                width="100"
                align="center">
        </el-table-column>
        <el-table-column
                prop="phone"
                label="电话"
                align="center">
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱"
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
          <el-button type="warning" size="mini" @click="resetPassword">重置密码</el-button>
          <el-button type="danger" size="mini" @click="deleteByUser">删除用户</el-button>
        </el-table-column>
      </el-table>
      <!-- 页码选择器-->
      <el-pagination
              :current-page.sync="currentPage1"
              :page-size="12"
              layout="total, prev, pager, next"
              :total="this.totalCount"
              @current-change="ChangePage"
              style="float: right">
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
  export default {
    name: "managerUser",
    data() {
      return {
        inputusers:'',
        inputvalue:'',
        totalCount:'',
        activeName:'',
        goodlist:{},
        currentPage:{},
        userForm:{
          userName:''
        },
        tableData:[

        ]
      };
    },
    mounted() {
      let that=this;
      that.searchAll()
    },
    methods: {
      ChangePage(currentPage)
      {
        let that=this;
        //每次调整页码的时候获取到对应的页码,存入currentPage对象中
        this.currentPage[this.activeName]=currentPage;
        //调用后端接口，传入pagesize，当前页，当前类别，通过refresh函数实现
        that.searchAll(currentPage)
      },

      searchAll(currentPage=1){
        let that=this;
        let pageNo=currentPage
        let needURL=that.$URL.searchAllUsers+"?pageNo="+pageNo+"&pageSize=12"
        that.$axios.get(needURL,"").then(
                res => {
                  if (res.code == 1002){
                    that.$message({
                      message: "查询用户失败",
                      type: 'warning'
                    });
                  }
                  else if(res.code == 200){
                    that.$message({
                      message: "查询用户成功",
                      type: 'success'
                    });

                    this.totalCount=res.body.totalCount

                    let getlist=res.body.result
                    console.log(getlist)
                    that.tableData.length=0
                    for (let i = 0; i < getlist.length; i++) {
                      let userInfoJson=getlist[i]
                      let userInfo={
                        id: userInfoJson.id,
                        name: userInfoJson.name,
                        phone: userInfoJson.phone,
                        email:userInfoJson.email,
                        userPrivileges:userInfoJson.role,
                      }
                      that.tableData.push(userInfo)
                    }
                  }
                }
        )
      },

      searchUsers()
      {
        let that=this;
        let userName=document.getElementById('userSearchCriteria').value
        if (userName==''){
          that.tableData.length=0
          that.searchAll()
        }else{
          let userSearchURL=that.$URL.searchUsersByName+userName
          that.$axios.get(userSearchURL,"").then(
                  res => {
                    if (res.code == 1002){
                      that.$message({
                        message: "查询失败：用户不存在",
                        type: 'warning'
                      });
                    }
                    else if(res.code == 200){
                      that.$message({
                        message: "查询成功",
                        type: 'success'
                      });
                      let userInfo={
                        id: res.body.id,
                        name: res.body.name,
                        phone: res.body.phone,
                        email:res.body.email,
                        userPrivileges:res.body.role,
                      }
                      that.tableData.length=0
                      that.tableData.push(userInfo)
                    }
                  }
          )
        }
      },
      deleteByUser(){
        let that=this;
        let userId=event.target.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.innerText
        console.log(userId)
        that.$axios.remove(that.$URL.deleteUserById+userId,"").then(
                res => {
                  if (res.code == 1002){
                    that.$message({
                      message: "删除失败",
                      type: 'warning'
                    });
                  }
                  else if(res.code == 200){
                    that.$message({
                      message: "删除成功",
                      type: 'success'
                    })
                    that.tableData.length=0
                    that.searchAll()
                  }
                }
        )
      },
      resetPassword(){
        let that=this;
        let userId=event.target.parentNode.parentNode.parentNode.parentNode.firstChild.firstChild.innerText
        let resetParams={id: userId, password:123456}
        that.$axios.post(that.$URL.updateUserInfo,resetParams).then(
                res => {
                  if (res.code == 9002){
                    that.$message({
                      message: "重置失败",
                      type: 'warning'
                    });
                  }
                  else if(res.code == 200){
                    that.$message({
                      message: "重置成功",
                      type: 'success'
                    })
                  }
                }
        )

        let timestamp = (new Date()).getTime();
        let logParams = {actid:this.$store.getters.username , role:this.$store.getters.role,time:timestamp,tablename:'user',objectid:userId,type:'修改'};
        console.log(logParams)
        that.$axios.put(that.$URL.addLog,logParams).then(
                res => {
                  if (res.code == 9002){
                    that.$message({
                      message: "写入失败",
                      type: 'warning'
                    });
                  }
                  else if(res.code == 200){
                    that.$message({
                      message: "写入成功",
                      type: 'success'
                    })
                  }
                }
        )



      },

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


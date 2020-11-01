<template>
  <el-container style="height: 100%">
    <el-header style="height:80px;background: #0b5fa5;padding: 0px">
      <div style="float: left;padding-left: 5px">
        <img src="../../../static/img/logo_white.png" width="80%" height="80"/>
      </div>
      <div style="float: right; padding-top: 20px;padding-right: 5px">
        <el-button style="right: 0px" type="primary" icon="el-icon-s-home" @click="goBackIndex">回到首页</el-button>
        <!--        <el-button  style="right: 0px" type="primary" icon="el-icon-switch-button" @click="logout">退出登录</el-button>-->
      </div>
    </el-header>

    <el-container>
      <el-aside style="width: 15%;background: #0b5fa4;">
        <div class="asideButton">
          <el-button type="primary" icon="el-icon-folder" @click="goTomanager">用户数据管理</el-button>
        </div>
        <div id='logbutton' class="asideButton">
          <el-button type="primary" icon="el-icon-s-order" @click="goTolog" v-if="isManager">平台数据日志</el-button>
        </div>
        <div id='userbutton' class="asideButton">
          <el-button type="primary" icon="el-icon-s-custom" @click="goTouser" v-if="isManager">平台用户管理</el-button>
        </div>


        <div style="padding-top: 80%">
          <div style="text-align:center;padding-bottom: 20px" >
            <img id="userAvatar" src="../../assets/timg.jpg" height="100" width="100" />
          </div>
          <div style="left: 15%;padding-left: 10%;">
             <table border="0" class="manager-font" cellspacing="20">
                <tr>
                   <td>ID:</td>
                   <td id="userid">{{name}}</td>
                </tr>
                <tr>
                   <td>权限:</td>
                   <td id="userrole">{{role}}</td>
                </tr>
               <el-button type="success" icon="el-icon-info" @click="getUsersInfo">个人资料</el-button>
             </table>
          </div>
        </div>

      </el-aside>
      <el-main style="padding: 0px">
        <router-view></router-view>
      </el-main>


    </el-container>

    <el-footer style="height:40px;background: #0b5fa5">
      <div style="height: 10%; margin-bottom: 0;text-align: center">
        <p style="color: #ffffff;margin-bottom: 0;display: inline-block">版权所有Copyright © 浙江大学地球科学学院</p>
      </div>
    </el-footer>
    <!--    用户信息详情弹窗-->

    <el-dialog
            title="用户详情"
            :visible.sync="dialogUserInfoVisible"
            width="60%">
      <div style="text-align:center;">
        <table border="0" class="dialog-font" cellspacing="30" :data="userTableData">
          <tr>
            <td>姓名:</td>
            <td id="name"></td>
            <td>电话:</td>
            <td id="phone"></td>
          </tr>
          <tr>
            <td>邮箱:</td>
            <td id="email"></td>
            <td>国家:</td>
            <td id="COUNTRY"></td>
          </tr>
          <tr>
            <td>所属组织:</td>
            <td id="NSTITUTE" ></td>
            <td>组织类型:</td>
            <td id="INSTITUTETYPE"></td>
          </tr>
          <tr>
            <td>领域:</td>
            <td id="FIELD"></td>
            <td>用途</td>
            <td id="PURPOSE"></td>
          </tr>
        </table>
      </div>
    </el-dialog>


    </el-container>

</template>

<script>


    export default {
        name: "manager",
        components: {

        },
        data() {
            return {
              name: JSON.parse(sessionStorage.user).name,
              role: JSON.parse(sessionStorage.user).role,
              isManager: false
            }
        },
      mounted() {
        this.avatarURL=JSON.parse(sessionStorage.user).icon;
        this.$store.commit('setUsername',JSON.parse(sessionStorage.user).name)
        this.$store.commit('setRole',JSON.parse(sessionStorage.user).role)
        if(JSON.parse(sessionStorage.getItem('user')).role=="manager"){
          this.isManager=true;
        }
        //内存中的模板已经挂载到页面中，页面渲染完成。
      },
        methods:{
          goBackIndex(){
            this.$router.push('/index')
          },
          logout(){
            this.$store.commit('setRole','visitor')
            this.$router.push('/index')
          },
          goTomanager(){
            this.$router.push('/manager/data')
          },
          goTolog(){
            this.$router.push('/manager/log')
          },
          goTouser(){
            this.$router.push('/manager/user')
          },
        }
    }
</script>

<style>
  .asideButton{
    text-align:left;
    width: 70%;
    padding-left: 15%;
    padding-top: 10%;
  }
  .asideButton-manager{
    text-align:left;
    width: 70%;
    padding-left: 15%;
    padding-top: 10%;
  }
  .manager-font{
    color: white;
    font-size: 20px;
  }
  .dialog-font{
    color: #000000;
    font-size: 20px;
  }
  td{
    width:400px
  }

</style>

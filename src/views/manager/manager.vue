<template>
  <el-container style="height: 100%">
    <el-header style="height:80px;background: #0b5fa5;padding: 0px">
      <div style="float: left;padding-left: 5px">
        <img src="../../../static/img/logo_white.png" width="80%" height="80"/>
      </div>
      <div style="float: right; padding-top: 20px;padding-right: 5px">
        <el-button  style="right: 0px" type="primary" icon="el-icon-s-home" @click="goBackIndex">回到首页</el-button>
<!--        <el-button  style="right: 0px" type="primary" icon="el-icon-switch-button" @click="logout">退出登录</el-button>-->
        <el-button type="primary" icon="el-icon-s-custom" @click="testfuc">测试按钮</el-button>
      </div>
    </el-header>

    <el-container>
      <el-aside style="width: 15%;background: #0b5fa4;" >
        <div class="asideButton" >
          <el-button type="primary" icon="el-icon-folder" @click="goTomanager">用户数据管理</el-button>
        </div>
        <div id='logbutton' class="asideButton">
          <el-button type="primary" icon="el-icon-s-order" @click="goTolog">平台数据日志</el-button>
        </div>
        <div id='userbutton' class="asideButton">
          <el-button type="primary" icon="el-icon-s-custom" @click="goTouser">平台用户管理</el-button>
        </div>


        <div style="padding-top: 80%">
          <div style="text-align:center;padding-bottom: 20px" >
            <img src="../../assets/timg.jpg" height="100" width="100"/>
          </div>
          <div style="left: 15%;padding-left: 10%;">
            <table border="0" class="manager-font" cellspacing="20">
              <tr>
                <td>ID:</td>
                <td id="userid">200</td>
              </tr>
              <tr>
                <td>权限:</td>
                <td id="userrole">500</td>
              </tr>
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

    </el-container>

</template>

<script>


    export default {
        name: "manager",
        components: {

        },
        data() {
            return {

            }
        },
      mounted() {
        console.log("mounted")
        document.getElementById("userid").innerText=this.$store.getters.username
        document.getElementById("userrole").innerText=this.$store.getters.role
        if(this.$store.getters.role=='manager'){
          document.getElementById("logbutton").style.display='block'
          document.getElementById("userbutton").style.display='block'
        }
        else {
          document.getElementById("logbutton").style.display='none'
          document.getElementById("userbutton").style.display='none'
        }

        //内存中的模板已经挂载到页面中，页面渲染完成。
      },
        methods:{
          goBackIndex(){
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
          testfuc(){
            document.getElementById("logbutton").style.display='none'
            document.getElementById("userbutton").style.display='none'
          }
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

</style>

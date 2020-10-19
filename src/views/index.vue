<template>
    <el-container class="user-container" style="">
        <el-header class="user-header" style="min-width: 1380px; height: 60px;">
            <!-- 左侧系统图标 -->
            <el-col :span="4" class="title">
                <el-image src="../../static/img/logo_white.png" alt="" fit="contain" style="height: 40px; margin-top: 10px;"></el-image>
            </el-col>
            <!-- 中间导航栏 -->
            <el-col :span="16">
                <menuBar2></menuBar2>
            </el-col>
            <!-- 右侧按钮 -->
            <el-col :span="4" class="title">
                <!-- 个人中心按钮 -->
                <el-button id="personalcenter" v-if="isLogin" @click="toUserCenter" style="height: 40px; width: 40px; margin-top: 10px; float: right" type="primary" icon="el-icon-user" circle></el-button>
<!--                <el-button v-if="" style="height: 40px; width: 40px; margin-top: 10px;" type="primary" icon="el-icon-user" circle></el-button>-->
                <!-- 登录按钮 -->
                <el-button id="login" v-if="!isLogin" size="mini" type="primary" plain @click="showLoginDialog"
                           style="margin-top: 16px; margin-left: 12px; float: right">登录
                </el-button>
                <loginDialog></loginDialog>
                <verifyDialog></verifyDialog>
                <!-- 注册按钮 -->
                <el-button id="signin" v-if="!isLogin" size="mini" type="primary" plain @click="showRegisterDialog"
                           style="margin-top: 16px; margin-left: 12px; float: right">注册
                </el-button>
                <registerDialog></registerDialog>
                <!-- 登出按钮 -->
                <el-button v-if="isLogin" size="mini" type="primary" plain @click="logout"
                           style="margin-top: 16px; margin-left: 12px; margin-right: 12px; float: right">登出
                </el-button>
                <!-- 切换语言按钮 -->
                <el-button v-if="!ifInEnglish" size="mini" type="text" @click="handleSetLanguage"
                           style="margin-top: 16px; margin-left: 12px;">EN
                </el-button>
                <el-button v-if="ifInEnglish" size="mini" type="text" plain @click="handleSetLanguage"
                           style="margin-top: 16px;margin-left: 12px;">CH
                </el-button>
            </el-col>
        </el-header>

        <el-main style="width: 100%; height: 100%; padding: 0px">
            <!-- 页面主要内容部分 -->
            <div id="mainContent" style="width: 100%;">
                <router-view></router-view>
            </div>
            <!-- 页脚 -->
            <pageFooter v-if="this.$globalConstant.page==''"></pageFooter>
        </el-main>
    </el-container>
</template>
<script>

    import menuBar2 from './menuBar2'
    import pageFooter from './pageFooter'
    import loginDialog from "../components/Dialog/loginDialog"
    import verifyDialog from "../components/Dialog/verifyDialog";
    import registerDialog from "../components/Dialog/registerDialog"

    export default {
        components: {
            menuBar2,
            pageFooter,
            loginDialog,
            verifyDialog,
            registerDialog
        },
        data() {
            return {
                ifInEnglish: false,
                searchParam: '',
                value: '',
                isLogin: false,
            }
        },
        methods: {
            isLogin() {
                this.$axios.get(this.$URL.userLoginStatus).then(
                    function(res) {
                        //如果当前是登录状态，则显示用户/管理员中心
                        if (res.code == 200) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                );
                return false;
            },
            toUserCenter() {
              this.$router.push('/manager/manager');
            },
            showLoginDialog() {
                this.$Bus.$emit('showLogin');
            },
            showRegisterDialog() {
                this.$Bus.$emit('showRegister');
            },
            logout() {
                let that=this;
                that.$axios.post(that.$URL.userLogout).then(
                    res => {
                      if (res.code == 200) {
                        that.$message({
                          message: "用户登出成功",
                          type: 'success'
                        });
                        this.$store.commit('setRole','visitor');
                        console.log(this.$store.getters.role)
                        sessionStorage.clear();
                        this.$router.go('/index');
                      }
                    }
                ).catch(err => {
                  that.$message({
                    message: "用户登出失败",
                    type: 'error'
                  });
                });
            },
            handleSetLanguage() {
                if (this.ifInEnglish) {//中文
                    localStorage.setItem('locale', 'zh');
                    this.$i18n.locale = localStorage.getItem('locale');
                    this.ifInEnglish=false;
                } else {//英文
                    localStorage.setItem('locale', 'en');
                    this.$i18n.locale = localStorage.getItem('locale');
                    this.ifInEnglish=true;
                }
                this.$Bus.$emit('changeLan');
            }
        },
        computed: {
        },
        mounted() {
          debugger;
          this.$store.dispatch('initial', {})
          // if(this.$store.getters.role=='visitor'){
          //   console.log(this.$store.getters.role)
          //   document.getElementById("personalcenter").style.display='none'
          //   document.getElementById("login").style.display='block'
          //   document.getElementById("signin").style.display='block'
          // }
          // else {
          //   console.log(this.$store.getters.role)
          //   document.getElementById("personalcenter").style.display='block'
          //   document.getElementById("login").style.display='none'
          //   document.getElementById("signin").style.display='none'
          // }
          if (sessionStorage.getItem('user') == null) {
            debugger;
            this.isLogin = false;
          } else {
            debugger;
            this.isLogin = true;
          }
        }
    }
</script>

<style>
    /*.international-icon {*/
    /*font-size: 22px;*/
    /*cursor: pointer;*/
    /*vertical-align: -5px!important;*/
    /*}*/
    /*.el-dropdown{*/
    /*color:#5a5e66;*/
    /*}*/
    html, body {
        /*修改整体页面的overflow*/
        /*overflow: auto;*/
        overflow: hidden;
        height: 100%;
    }

    .user-container {
        height: 100%;
    }
    .user-header {
        background-color: #303133;
        display: flex;
        justify-content: center;
    /*    position: absolute;*/
    /*    z-index: 100*/
    }

    .title {
        text-align: center;
        line-height: 100%;
        color: #2d2f33;
    }
</style>

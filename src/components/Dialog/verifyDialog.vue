<template>
    <el-dialog :visible.sync="verifyDialogVisible" @close="closeDialog"
               style="width:800px; margin: 20px auto;">
        <h2 class="title">找回密码</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top"
                 style="width: 90%; margin: 0px auto;">
            <el-form-item prop="username" label="请输入要重置密码的账户用户名">
                <el-input type="text" v-model="ruleForm.username" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item prop="vericode" label="点击获取验证码，邮件将发送至绑定邮箱">
                <el-input type="text" v-model="ruleForm.vericode" placeholder="请在此处输入验证码" style="width: 55%;"></el-input>
                <el-button type="primary" plain style="width: 40%; margin-left: 5%; float: right" @click="sendVeriCode">{{content}}</el-button>
            </el-form-item>
            <el-form-item>
            	<el-button type="text" @click="verifyCode">下一步</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
	import resetDialog from "./resetDialog"



    export default {
        name: "verifyDialog",
        components: {
        	resetDialog,
        },
        data() {




          return {
              content: '获取验证码',
              totalTime: 60,
              canClick: true, //添加canClick
              isAble:false,
              verifyDialogVisible: false,
              ruleForm: {
                  username: '',
                  vericode: ''
              },
              rules: {
                  username: [
                      {required: true, message: '用户名不能为空', trigger: 'blur'},
                  ],
              },
              correctCode: '',
            }
        },
        methods: {

          openDialog(){
            this.isAble = true;
          },
            closeDialog() {
                this.verifyDialogVisible = false;
                this.$refs.ruleForm.resetFields();
            },

            sendVeriCode() {
            	this.$refs.ruleForm.validate((valid) => {
            		if (valid) {
            			let that = this;
                        debugger;
            			that.$axios.get(that.$URL.checkByName+that.ruleForm.username).then( 
            				function(res) {
            					if (res.code === 200) {
            						that.$message({
            							message: "已向该账户绑定的邮箱发送验证邮件，请查收",
            							type: 'success'
            						},);

            						that.content = that.totalTime + 's后重新发送' //这里解决60秒不见了的问题
                                    let clock = window.setInterval(() => {
                                        that.totalTime--
                                        that.content = that.totalTime + 's后重新发送'
                                      that.isAble=true;
                                        if (that.totalTime < 0) {     //当倒计时小于0时清除定时器
                                            window.clearInterval(clock)
                                            that.content = '重新发送验证码'
                                            that.totalTime = 60
                                           that.isAble=false
                                        }
                                    },1000)

            						that.correctCode = res.body.code;

                       	} else{
            						that.$message({
            							message: "该账户未注册，请重新确认",
            							type: 'error'
            						});
            						that.$refs.ruleForm.resetFields();
            					}
            				}
            			);
            		}
            	})
            },
            verifyCode() {
            	if (this.ruleForm.vericode === this.correctCode) {
            		this.$Bus.$emit('showResetPW',{
            		    username: this.ruleForm.username,
                    });
            	} else {
            		this.$message({
            			message: "验证码错误，请重新确认",
            			type: 'error'
            		});
            		this.$refs.ruleForm.vericode = '';
            	}
            }
        },
        created() {
            this.$Bus.$on('showVerify', () => {
                this.verifyDialogVisible = true;
            })
            this.$Bus.$on('closeVerify', () => {
                this.verifyDialogVisible = false;
            })
        }
    }
</script>

<style>
    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
    }
    .el-form-item {
        margin-bottom: 30px;
    }
    .el-form--label-top .el-form-item__label {
    	float: left;
    	display: inline-block;
    	text-align: left;
    	padding: 0 0 10px;
	}
    .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0%;
    }
</style>
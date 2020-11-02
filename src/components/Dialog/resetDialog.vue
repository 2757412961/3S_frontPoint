<template>
    <el-dialog :visible.sync="resetDialogVisible" @close="closeDialog"
               style="width:800px; margin: 20px auto;">
        <h2 class="title">重置密码</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top"
                 style="width: 90%; margin: 0px auto;">
            <el-form-item prop="newPW" label="请输入重置的新密码">
                <el-input type="password" v-model="ruleForm.newPW" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item prop="repeatNewPW" label="请再次输入重置的新密码">
                <el-input type="password" v-model="ruleForm.repeatNewPW" style="width: 100%;"></el-input>
            </el-form-item>
            <el-form-item>
            	<el-button type="text" @click="resetPW">确认</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        name: "resetDialog",
        data() {
            let validatePW = (rule, value, callback) => {
                if (value !== this.ruleForm.newPW) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
            	resetDialogVisible: false,
                ruleForm: {
                    newPW: '',
                    repeatNewPW: ''
                },
                username: '',
                id:'',
                rules: {
                    newPW: [
                        {required: true, message: '重置密码不能为空', trigger: 'blur'},
                    ],
                    repeatNewPW: [
                        {required: true, message: '重置密码不能为空', trigger: 'blur'},
                        {required: true, validator: validatePW, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            closeDialog() {
                this.resetDialogVisible = false;
                this.$refs.ruleForm.resetFields();
            },
            resetPW() {
              this.$md5('holle') // bcecb35d0a12baad472fbe0392bcc043 密码加密
            	this.$refs.ruleForm.validate((valid) => {
            		if (valid) {
            		    let that = this;
                        that.$axios.get(that.$URL.searchUsersByName+that.username).then(
                            function(res){
                                if (res.code === 200) {
                                    debugger;
                                    that.id=res.body.id;
                                    let resetParams = {id: that.id, password: that.ruleForm.newPW};
                                    that.$axios.post(that.$URL.updateUserInfo, resetParams).then(
                                        function(res) {
                                            if (res.code === 200) {
                                                that.$message({
                                                    message: "重置密码成功",
                                                    type: 'success'
                                                });
                                                that.resetDialogVisible = false;
                                                that.$Bus.$emit('closeVerify');
                                            } else {
                                                that.$message({
                                                    message: "重置密码失败",
                                                    type: 'error'
                                                });
                                                that.$refs.ruleForm.resetFields();
                                            }
                                        }
                                    );
                                }
                            }
                        );
            		}
            	})
            }
        },
        created() {
            this.$Bus.$on('showResetPW', params => {
                this.username = params.username;
                this.resetDialogVisible = true;
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
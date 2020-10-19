<template>
    <el-dialog :visible.sync="registerDialogVisible" @close="closeDialog"
               style="width:840px; margin: 20px auto;">
        <h2 class="title">注册</h2>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
                 style="width: 90%; margin: 0px auto;">
            <el-form-item prop="username" label="用户名">
                <el-input type="text" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手机号">
                <el-input type="tel" v-model="ruleForm.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱">
                <el-input type="email" v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="country" label="国家(地区)">
                <el-select v-model="selectedCountry" placeholder="请选择国家(地区)">
                  <el-option
                      v-for="item in countryOptions"
                      :key="item.short"
                      :label="item.name"
                      :value="item.name">
                    <span style="float: left">{{ item.name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.short }}</span>
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="instituteType" label="机构类型">
              <el-select v-model="selectedType" placeholder="请选择机构类型">
                <el-option
                    v-for="item in instituteOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="institute" label="机构">
              <el-input type="text" v-model="ruleForm.institute" placeholder="请输入机构名称"></el-input>
            </el-form-item>
            <el-form-item prop="field" label="专业领域">
              <el-select v-model="selectedField" placeholder="请选择专业领域">
                <el-option
                    v-for="item in fieldOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="purpose" label="用途">
              <el-select v-model="selectedPurpose" placeholder="请选择用途">
                <el-option
                    v-for="item in purposeOptions"
                    :key="item.index"
                    :label="item.value"
                    :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
            <el-form-item>
                <el-button style="width:47%; float: left" @click="cancel">重置</el-button>
                <el-button type="primary" style="width:47%; float:right" @click.native.prevent="register"
                           :loading="registering">确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import countryOps from '../../../static/json/country.json'
    export default {
        name: "registerDialog",
        data() {
            return {
                registerDialogVisible: false,
                registering: false,
                countryOptions: [],
                selectedCountry: '',
                instituteOptions: [
                  {index: '1', value: '大学'},
                  {index: '2', value: '企业'},
                  {index: '3', value: '服务'}
                ],
                selectedType: '',
                fieldOptions: [
                  {index: '1', value: '地理学类'},
                  {index: '2', value: '信息学类'}
                ],
                selectedField: '',
                purposeOptions: [
                  {index: '1', value: '学习'},
                  {index: '2', value: '商业用途'}
                ],
                selectedPurpose: '',
                ruleForm: {
                    username: '',
                    password: '',
                    phone: '',
                    email: '',
                    institute: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                },
            };
        },
        methods: {
            cancel() {
                this.$refs.ruleForm.resetFields();
            },
            closeDialog() {
                this.registerDialogVisible = false;
                this.$refs.ruleForm.resetFields();
            },
            register() {
                debugger;
                this.registering = true;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        debugger;
                        let that=this;
                        let url=that.$URL.addUser;
                        let registerParams = {
                            name: that.ruleForm.username,
                            password: that.ruleForm.password,
                            phone: that.ruleForm.phone,
                            email: that.ruleForm.email,
                            country: that.selectedCountry,
                            institutetype: that.selectedType,
                            institute: that.ruleForm.institute,
                            field: that.selectedField,
                            purpose: that.selectedPurpose,
                            role: "user"
                        };
                        that.$axios.put(url, registerParams).then(
                            res => {
                                if (res.code == 200) {
                                    debugger;
                                    that.$message({
                                        message: "用户注册成功",
                                        type: 'success'
                                    });
                                    that.$refs.ruleForm.resetFields();
                                    that.registering = false;
                                    that.registerDialogVisible = false;
                                    sessionStorage.setItem('user', JSON.stringify(res.body));
                                } else {
                                    debugger;
                                    that.$message({
                                      message: "用户注册失败",
                                      type: 'error'
                                    });
                                    that.$refs.ruleForm.resetFields();
                                    that.registering = false;
                                }
                            }
                        );
                    }
                });
            }
        },
        created() {
            this.$Bus.$on('showRegister', () => {
                this.registerDialogVisible = true;
            })
            this.countryOptions = countryOps.country;
        }
    }
</script>

<style scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .title {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
    }

    .remember {
        margin: 0px 0px 35px 0px;
    }

    .dialogTitle {
        margin: 0px auto 30px auto;
        text-align: center;
        color: #505458;
    }

    .el-form-item {
        margin-bottom: 30px;
    }

    .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 240px;
        float: right;
    }

    .el-select {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 240px;
        float: right;
    }

    .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 31%;
    }
</style>
<template>
    <el-dialog title="个人信息" :visible.sync="dialogUserInfoVisible"
               style="width:800px; margin: 20px auto;">
        <div style="text-align:left;">
            <table border="0" class="dialog-font" cellspacing="10">
                <tr>
                    <td>姓名:</td>
                    <td>{{userTableData.name}}</td>
                    <td>电话:</td>
                    <td>{{userTableData.phone}}</td>
                </tr>
                <tr>
                    <td>邮箱:</td>
                    <td>{{userTableData.email}}</td>
                    <td>国家:</td>
                    <td>{{userTableData.country}}</td>
                </tr>
                <tr>
                    <td>所属组织:</td>
                    <td>{{userTableData.institute}}</td>
                    <td>组织类型:</td>
                    <td>{{userTableData.institutetype}}</td>
                </tr>
                <tr>
                    <td>领域:</td>
                    <td>{{userTableData.field}}</td>
                    <td>用途:</td>
                    <td>{{userTableData.purpose}}</td>
                </tr>
            </table>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "userInfoDialog",
        mounted() {

        },
        data() {
            return {
                dialogUserInfoVisible: false,
                userTableData:{
                    name: JSON.parse(sessionStorage.user).name,
                    phone: JSON.parse(sessionStorage.user).phone,
                    email: JSON.parse(sessionStorage.user).email,
                    country: JSON.parse(sessionStorage.user).country,
                    institute: JSON.parse(sessionStorage.user).institute,
                    institutetype: JSON.parse(sessionStorage.user).institutetype,
                    field: JSON.parse(sessionStorage.user).field,
                    purpose: JSON.parse(sessionStorage.user).purpose,
                }
            }
        },
        created() {
            debugger;
            this.$Bus.$on('showUserInfo', () => {
                this.dialogUserInfoVisible = true;
            })
        },
    }
</script>

<style scoped>

</style>
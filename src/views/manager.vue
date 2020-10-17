<template>
    <el-container class="manager-container">
        <el-header class="manager-header">
            <div>
                <img src="../../static/img/logo-white.png" height="100%">
            </div>
        </el-header>
        <el-container>
            <el-aside width="15%">
<!--                <ManaNavMenu></ManaNavMenu>-->
            </el-aside>
            <el-main>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    // import ManaNavMenu from "./ManaNavMenu";

    export default {
        name: "manager",
        components: {
            // ManaNavMenu,
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style rel="stylesheet/less" type="text/css" lang="less">
.manager-container {
    height: 100%;

}

.manager-header {
    height: 10%;
    background-color: #303133;
    display: inline-table;
    justify-content: center;
}

.el-aside {
    background-color: #545C64;
}
.el-main {
    background-color: #F2F6FC;
}
</style>
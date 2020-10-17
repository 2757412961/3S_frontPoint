<template>
    <div id="app" style="height: 100%">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style rel="stylesheet/less" type="text/css" lang="less">
    /*@import "./style/common.less";*/
    html,
    body,
    #app {
        height: 100%;
    }

    /* 定制滚动条 */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background: rgb(104, 115, 134);
        border-radius: 4px;
        scrollbar-highlight-color: #fff;
    }

    ::-webkit-scrollbar-track {
        background: rgba(210, 210, 210, 0.8);
    }

</style>
